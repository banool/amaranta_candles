#!/bin/bash
# Run the archive test suite against a freshly-built copy of the snapshot.
#
# The tests deliberately run against a real archive database rather than a
# generated test one (see amaranta_candles/tests.py), so build one first from
# the committed dump.

set -euo pipefail

cd "$(dirname "$0")"

WORKDIR=$(mktemp -d)
trap 'rm -rf "$WORKDIR"' EXIT
ARCHIVE="$WORKDIR/candles.sqlite3"
sqlite3 "$ARCHIVE" < data/candles-archive.sql

deployment_mode=dev \
    allowed_hosts=testserver \
    sql_engine=django.db.backends.sqlite3 \
    sql_database="$ARCHIVE" \
    python manage.py test "$@"
