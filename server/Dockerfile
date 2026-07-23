# Build context is the REPO ROOT, not server/, because the image now contains
# the UI bundle as well as the backend:
#
#     docker build -f server/Dockerfile .
#
# The result is a completely self-contained archive: UI, API and data in one
# image, with no database server, no volume and no secret to supply.

# ---------------------------------------------------------------- UI bundle --
FROM node:22-slim AS ui-builder

WORKDIR /ui
COPY ui/package.json ui/package-lock.json ./
RUN npm ci --no-audit --no-fund

COPY ui/ ./
# webpack 4 uses an MD4 hash for its module IDs, which OpenSSL 3 removed from
# its default provider. Node has refused to run this build since v17 without
# the legacy provider re-enabled. Cheaper and lower-risk than a webpack 5
# migration for a UI that will never be developed again.
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm run build

# ----------------------------------------------------------- Python deps --
FROM python:3.13-slim AS py-builder

RUN pip install --no-cache-dir poetry==2.4.1

ENV POETRY_NO_INTERACTION=1 \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_VIRTUALENVS_CREATE=1 \
    POETRY_CACHE_DIR=/tmp/poetry_cache

WORKDIR /app
COPY server/pyproject.toml server/poetry.lock ./
# No mariadb-client or python3-dev any more: the archive is SQLite, which ships
# with Python, so there is nothing to compile and no database client to install.
# No `--without dev`: there is no dev group, and poetry 2 treats naming a
# missing group as an error rather than a no-op.
RUN poetry install --no-root && rm -rf $POETRY_CACHE_DIR

# ------------------------------------------------------------ archive data --
FROM python:3.13-slim AS archive-builder

WORKDIR /build
COPY server/data/candles-archive.sql ./
# Rebuilt from the committed text dump rather than shipping a binary .sqlite3
# in git, so the data stays reviewable in diffs. Python's bundled sqlite3 does
# this without adding a package to the image.
RUN python -c "\
import sqlite3; \
conn = sqlite3.connect('candles.sqlite3'); \
conn.executescript(open('candles-archive.sql').read()); \
conn.commit(); \
assert conn.execute('PRAGMA integrity_check').fetchone()[0] == 'ok'; \
conn.close()"

# ---------------------------------------------------------------- runtime --
FROM python:3.13-slim AS runtime

ENV VIRTUAL_ENV=/app/.venv PATH="/app/.venv/bin:$PATH" \
    PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

COPY --from=py-builder ${VIRTUAL_ENV} ${VIRTUAL_ENV}

WORKDIR /amaranta_candles
COPY server/ /amaranta_candles/
COPY --from=ui-builder /ui/dist /amaranta_candles/ui
COPY --from=archive-builder /build/candles.sqlite3 /amaranta_candles/db/candles.sqlite3

# The database is read-only to the process that serves it, at the filesystem
# level as well as through SQLite's own mode=ro (core/settings.py). Owned by
# root and readable-but-not-writable by the unprivileged user the container
# runs as, so even a root-in-container escape would need to defeat the
# read-only root filesystem the deployment also sets.
RUN chmod 444 /amaranta_candles/db/candles.sqlite3 \
    && useradd --system --uid 10001 --no-create-home candles
USER 10001

ENV INTERNAL_PORT=6969 \
    sql_engine=django.db.backends.sqlite3 \
    sql_database=/amaranta_candles/db/candles.sqlite3 \
    ui_root=/amaranta_candles/ui \
    deployment_mode=prod

EXPOSE 6969
ENTRYPOINT ["/bin/sh", "-c", "exec ./run.sh $INTERNAL_PORT"]
