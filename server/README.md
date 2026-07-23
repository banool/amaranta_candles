# Amaranta Candles — server

Amaranta Candles is no longer updated, so this serves a **frozen archive** of
the data rather than a live site: the candle records as they stood on the
snapshot date in `core/archive.py`, and nothing writes to them again.

It is deliberately, structurally read-only, because it is served on the public
internet. `core/archive.py` documents the four independent layers that enforce
that; the short version is that the write code was deleted, the ORM raises on
writes, SQLite is opened `mode=ro&immutable=1`, and the container filesystem is
read-only. `amaranta_candles/tests.py` asserts all of it.

The whole thing — UI, API and data — is one container image, with no database
server, no volume and no secrets to supply.

## Local development

```
poetry install

# Build an archive to serve, from the committed dump.
sqlite3 /tmp/candles.sqlite3 < data/candles-archive.sql

deployment_mode=dev \
  allowed_hosts=127.0.0.1,localhost \
  sql_engine=django.db.backends.sqlite3 \
  sql_database=/tmp/candles.sqlite3 \
  poetry run ./run.sh 6969
```

Then http://localhost:6969/api/candle?recursive=true. To get the UI too, build
it first (`cd ../ui && npm ci && npm run build`) and add `ui_root=../ui/dist`.

## Tests

```
poetry run ./test.sh
```

They run against a real archive database rather than a generated test one — see
the module docstring in `amaranta_candles/tests.py` for why that is the only
honest way to test "this cannot be written to".

## Container

```
# From the repo root: the build needs ui/ as well as server/.
docker build -f server/Dockerfile -t amaranta_candles .
docker run --rm -p 6969:6969 -e allowed_hosts=localhost amaranta_candles
```

## Rebuilding the archive

Only needed if the source data ever has to be re-imported; the output is
committed, so a normal build does not do this.

```
poetry run python scripts/build_archive.py /path/to/mysqldump.sql
```

It builds the schema from Django's own migrations, copies across only the
`amaranta_candles_*` tables, and drops the Django auth tables — password hashes
and email addresses have no place in a public archive.
