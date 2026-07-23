#!/usr/bin/env python3
"""Freeze the live MySQL database into the SQLite archive the site ships.

Run once, by hand, against a mysqldump of the old server's `amaranta_candles`
database. The output -- data/candles-archive.sql -- is committed, and the
Dockerfile rebuilds candles.sqlite3 from it at image build time. Committing the
text dump rather than the binary keeps the data reviewable in git and the image
build hermetic.

    python scripts/build_archive.py ~/gdrive/backups/amaranta_candles_backup.sql

Two things this does that a plain `mysqldump | sqlite3` pipeline would not:

1. The schema comes from Django's own migrations, not from translating MySQL
   DDL. `manage.py migrate` builds an empty SQLite database, and only table
   *rows* are copied across. That guarantees the archive's schema is exactly
   what the models expect, instead of a hand-converted approximation of it.

2. Only the `amaranta_candles_*` tables are copied. The dump also contains
   auth_user (password hashes, email addresses), auth_permission, django_session
   and django_admin_log. None of that belongs in a public read-only archive --
   and this repo is public, so the dump would be published along with it. The
   auth tables do not exist in the output at all, which is also why a SQL
   injection against the archive has nothing of value to read.

Values are transferred through parameter binding rather than by rewriting SQL
text, so MySQL's backslash escapes (\\', \\\\, \\n, \\0) can't be misparsed into
either corrupted data or injected statements.
"""

import argparse
import os
import re
import sqlite3
import subprocess
import sys
import tempfile

# Tables whose rows are the archive. Everything else in the dump is Django
# plumbing or credentials, and is dropped on the floor.
KEEP_PREFIX = "amaranta_candles_"

INSERT_RE = re.compile(r"INSERT INTO `(?P<table>[^`]+)` VALUES\s", re.IGNORECASE)
CREATE_RE = re.compile(r"CREATE TABLE `(?P<table>[^`]+)` \((?P<body>.*?)\n\) ENGINE", re.S)
COLUMN_RE = re.compile(r"^\s+`(?P<column>[^`]+)`\s", re.M)


def parse_values(blob):
    """Parse a MySQL `VALUES (...),(...);` payload into lists of Python values.

    Written as an explicit scanner because MySQL string literals use backslash
    escapes, which neither Python's csv module nor a naive split on "," can be
    trusted with: a comma or a closing paren inside 'Rose, Oud\\' is data.
    """
    rows, row, buf = [], [], []
    in_string = escaped = in_row = False

    for ch in blob:
        if in_string:
            if escaped:
                # MySQL's escapes. Anything else is a literal character.
                buf.append({"n": "\n", "t": "\t", "r": "\r", "0": "\0"}.get(ch, ch))
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == "'":
                in_string = False
                row.append("".join(buf))
                buf = []
            else:
                buf.append(ch)
            continue

        if ch == "'":
            in_string, buf = True, []
        elif ch == "(" and not in_row:
            in_row, row = True, []
        elif ch == ")" and in_row:
            if buf:
                row.append(_scalar("".join(buf)))
                buf = []
            rows.append(row)
            in_row = False
        elif in_row and ch == ",":
            if buf:
                row.append(_scalar("".join(buf)))
                buf = []
        elif in_row:
            buf.append(ch)

    return rows


def _scalar(token):
    """Convert an unquoted MySQL token (NULL, 12, 1.5) to a Python value."""
    token = token.strip()
    if token.upper() == "NULL":
        return None
    try:
        return int(token)
    except ValueError:
        pass
    try:
        return float(token)
    except ValueError:
        return token


def statement_end(text, start):
    """Index just past the `;` terminating the statement beginning at `start`.

    mysqldump wraps rows across lines, so a statement is not a line. Scanning
    has to be string-aware or a `;` inside a scent name would end it early.
    """
    in_string = escaped = False
    for i in range(start, len(text)):
        ch = text[i]
        if in_string:
            if escaped:
                escaped = False
            elif ch == "\\":
                escaped = True
            elif ch == "'":
                in_string = False
        elif ch == "'":
            in_string = True
        elif ch == ";":
            return i
    return len(text)


def read_columns(text):
    """Map each dumped table to its column names, in the dump's own order.

    Needed because the rows must be inserted by name, not by position: Django's
    later migrations rebuilt several of these tables, and SQLite's resulting
    column order does not match MySQL's. A positional INSERT silently shifts
    every value one column left, which surfaces as a NOT NULL violation if
    you're lucky and as plausible-looking wrong data if you're not.
    """
    return {
        m.group("table"): COLUMN_RE.findall(m.group("body"))
        for m in CREATE_RE.finditer(text)
    }


def read_dump(path):
    """Yield (table, columns, rows) for each INSERT of a table we're keeping."""
    with open(path, "r", encoding="utf-8", errors="replace") as fh:
        text = fh.read()

    columns = read_columns(text)

    for m in INSERT_RE.finditer(text):
        table = m.group("table")
        if not table.startswith(KEEP_PREFIX):
            continue
        rows = parse_values(text[m.end() : statement_end(text, m.end())])
        yield table, columns[table], rows


def build_schema(sqlite_path):
    """Create an empty, correctly-shaped database using Django's migrations."""
    env = {
        **os.environ,
        # The build-only settings module: the one context where writes are
        # allowed. See core/settings_build.py.
        "DJANGO_SETTINGS_MODULE": "core.settings_build",
        "deployment_mode": "dev",
        "allowed_hosts": "localhost",
        "sql_engine": "django.db.backends.sqlite3",
        "sql_database": sqlite_path,
    }
    subprocess.run(
        [sys.executable, "manage.py", "migrate", "--no-input"],
        env=env,
        check=True,
        cwd=os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    )


def main():
    ap = argparse.ArgumentParser(description=__doc__)
    ap.add_argument("mysql_dump", help="mysqldump of the amaranta_candles database")
    ap.add_argument(
        "--out",
        default="data/candles-archive.sql",
        help="where to write the committed SQLite dump",
    )
    args = ap.parse_args()

    with tempfile.TemporaryDirectory() as tmp:
        sqlite_path = os.path.join(tmp, "candles.sqlite3")
        build_schema(sqlite_path)

        conn = sqlite3.connect(sqlite_path)
        # The dump orders tables alphabetically, not by dependency, so foreign
        # keys would trip on forward references mid-load. The data came out of
        # a database that already enforced them.
        conn.execute("PRAGMA foreign_keys = OFF")

        total = 0
        for table, columns, rows in read_dump(args.mysql_dump):
            if not rows:
                continue
            if len(columns) != len(rows[0]):
                sys.exit(
                    f"{table}: dump declares {len(columns)} columns but rows "
                    f"have {len(rows[0])} values"
                )
            cols = ",".join(f"`{c}`" for c in columns)
            placeholders = ",".join("?" * len(columns))
            conn.executemany(
                f"INSERT INTO `{table}` ({cols}) VALUES ({placeholders})",  # noqa: S608
                rows,
            )
            total += len(rows)
            print(f"  {table}: {len(rows)} rows")
        conn.commit()

        integrity = conn.execute("PRAGMA integrity_check").fetchone()[0]
        if integrity != "ok":
            sys.exit(f"integrity check failed: {integrity}")
        conn.close()

        os.makedirs(os.path.dirname(args.out), exist_ok=True)
        with open(args.out, "w", encoding="utf-8") as out:
            conn = sqlite3.connect(sqlite_path)
            for line in conn.iterdump():
                out.write(f"{line}\n")
            conn.close()

    print(f"\n{total} rows -> {args.out}")


if __name__ == "__main__":
    main()
