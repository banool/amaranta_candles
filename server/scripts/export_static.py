"""Freeze the archive one step further: the whole site as plain files.

The archive never changes, so every response the server can give is known in
advance. This script writes each of them to disk, next to the UI bundle, in a
layout a static host can serve with no application behind it at all. Since
2026-10-26 that is how the site is published (Cloudflare Pages, see the README);
the Django app remains the way the files are *produced*.

    cd ui && npm ci --ignore-scripts && NODE_OPTIONS=--openssl-legacy-provider npm run build
    cd ../server && poetry run python scripts/export_static.py --ui-dist ../ui/dist --out ../site

(Without poetry: `uv run --python 3.13 --with django==5.2.16 --with
djangorestframework==3.17.1 --with whitenoise==6.12.0 python
scripts/export_static.py ...`, the versions in poetry.lock.)

What comes out, under --out:

    index.html, static/app.<hash>.js   the UI, exactly as webpack built it
    data/archive.json                  GET /api/archive
    data/<thing>.json                  GET /api/<thing>?recursive=true
    data/<thing>/<id>.json             GET /api/<thing>/<id>?recursive=true
    _redirects                         maps the API URLs the UI fetches onto those files
    _headers                           the security headers Django used to send
    404.html                           for everything else

The UI is untouched: it still fetches /api/<thing>?recursive=true, and the
host rewrites that to the matching file (a 200, not a redirect). The JSON is
taken from the real views through Django's test client, so each file is byte
for byte what the running server answered.

The UI's own pages need nothing: it uses hash routes (/#/candles/12), so the
only page a browser ever requests is "/".

One thing differs from the server, because a static host ignores query
strings: the UI only ever asked for the `recursive=true` form, so that is the
one form exported, and /api/<thing> without the parameter now returns it too.
(A request for an id that does not exist is still a 404, but the host's HTML
one rather than the API's JSON one.)
"""

import argparse
import json
import os
import shutil
import sqlite3
import sys
import tempfile
from pathlib import Path

SERVER_DIR = Path(__file__).resolve().parent.parent
DUMP = SERVER_DIR / "data" / "candles-archive.sql"

# The eight resources the router registers (amaranta_candles/urls.py).
THINGS = ["batch", "candle", "dye", "scent", "scent_combo", "vessel", "wax", "wick"]

# What SecurityMiddleware, XFrameOptionsMiddleware and the prod settings sent
# on every response (core/settings.py).
HEADERS = """/*
  X-Frame-Options: DENY
  X-Content-Type-Options: nosniff
  Referrer-Policy: same-origin
  Cross-Origin-Opener-Policy: same-origin
  Strict-Transport-Security: max-age=3600; includeSubDomains; preload
"""

NOT_FOUND = """<!doctype html>
<html lang="en">
<head>
  <title>Not Found</title>
</head>
<body>
  <h1>Not Found</h1><p>The requested resource was not found on this server.</p>
</body>
</html>
"""


def build_database(path: Path) -> None:
    conn = sqlite3.connect(path)
    conn.executescript(DUMP.read_text())
    conn.commit()
    assert conn.execute("PRAGMA integrity_check").fetchone()[0] == "ok"
    conn.close()


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__.split("\n\n")[0])
    parser.add_argument("--ui-dist", required=True, type=Path, help="webpack's output directory (ui/dist)")
    parser.add_argument("--out", required=True, type=Path, help="directory to write the static site into (replaced)")
    args = parser.parse_args()

    ui_dist = args.ui_dist.resolve()
    if not (ui_dist / "index.html").is_file():
        print(f"{ui_dist} has no index.html: build the UI first", file=sys.stderr)
        return 1

    workdir = Path(tempfile.mkdtemp())
    database = workdir / "candles.sqlite3"
    build_database(database)

    # The same environment the tests use (test.sh): dev mode, so the test
    # client's plain-http requests are not redirected, against a real copy of
    # the snapshot opened read-only.
    os.environ.update(
        deployment_mode="dev",
        allowed_hosts="testserver",
        sql_engine="django.db.backends.sqlite3",
        sql_database=str(database),
        DJANGO_SETTINGS_MODULE="core.settings",
    )
    sys.path.insert(0, str(SERVER_DIR))
    import django

    django.setup()
    from django.test import Client

    client = Client()

    def get(path: str) -> bytes:
        response = client.get(path)
        if response.status_code != 200:
            raise RuntimeError(f"GET {path} -> {response.status_code}")
        if not response["Content-Type"].startswith("application/json"):
            raise RuntimeError(f"GET {path} -> {response['Content-Type']}")
        return response.content

    out = args.out.resolve()
    if out.exists():
        shutil.rmtree(out)
    shutil.copytree(ui_dist, out)
    data = out / "data"
    data.mkdir()

    (data / "archive.json").write_bytes(get("/api/archive"))
    files = 1
    for thing in THINGS:
        listing = get(f"/api/{thing}?recursive=true")
        (data / f"{thing}.json").write_bytes(listing)
        (data / thing).mkdir()
        files += 1
        for row in json.loads(listing):
            (data / thing / f"{row['id']}.json").write_bytes(get(f"/api/{thing}/{row['id']}?recursive=true"))
            files += 1

    redirects = ["/api/archive /data/archive.json 200"]
    for thing in THINGS:
        redirects.append(f"/api/{thing} /data/{thing}.json 200")
        redirects.append(f"/api/{thing}/:id /data/{thing}/:id.json 200")
    (out / "_redirects").write_text("\n".join(redirects) + "\n")
    (out / "_headers").write_text(HEADERS)
    (out / "404.html").write_text(NOT_FOUND)

    shutil.rmtree(workdir)
    print(f"wrote {out}: the UI, {files} JSON files, _redirects ({len(redirects)} rules), _headers, 404.html")
    return 0


if __name__ == "__main__":
    sys.exit(main())
