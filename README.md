# Amaranta Candles

A frozen, read-only archive of the Amaranta Candles records: the candles, batches, scents, dyes, waxes, wicks and vessels as they stood on the snapshot date in `server/core/archive.py`. Nothing writes to it again.

It is published at https://candles.dport.me as plain files on Cloudflare Pages. Until 2026-10-26 the same content was served by the Django app in `server/` running in a container at home; because the data never changes, every response that app could give was written to disk once, and the app no longer runs anywhere. The files are in `site/`, committed, and are the site.

- `server/`: the Django app. It is now only the tool that produces the JSON in `site/data/` (and it is still what the tests check). See `server/README.md`.
- `ui/`: the React UI. Its webpack build is `site/index.html` and `site/static/`.
- `site/`: the published site. `_redirects` maps the API URLs the UI fetches (`/api/<thing>?recursive=true`) onto the JSON files, `_headers` carries the security headers the app used to send.

## Regenerating `site/`

Only needed if the UI or the snapshot ever changes, which neither is expected to.

```
cd ui && npm ci --ignore-scripts && NODE_OPTIONS=--openssl-legacy-provider npm run build
cd ../server && poetry run python scripts/export_static.py --ui-dist ../ui/dist --out ../site
```

Without poetry, `uv` does the second step with the versions from `poetry.lock`: `uv run --no-project --python 3.13 --with django==5.2.16 --with djangorestframework==3.17.1 --with whitenoise==6.12.0 python scripts/export_static.py --ui-dist ../ui/dist --out ../site`.

The script takes each response from the real views through Django's test client, so the files are byte for byte what the server answered. When the export was first made, all 270 API responses and fifteen rendered pages were compared with the running site and were identical.

## Publishing

The Pages project (`candles`), its hostname and its DNS record belong to the `server-platform` repo. From there, with this repo checked out beside it:

```
bun run pages:publish -- candles
```

That uploads `site/` as it is on disk. Nothing builds at Cloudflare and no repository is connected to the project.

## The container image

CI still tests the server and builds the image (`ghcr.io/banool/amaranta_candles`), which remains a complete, self-contained copy of the site. It is not deployed anywhere.
