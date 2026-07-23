#!/bin/sh

# Starting the archive is just "start the web server". Every step that used to
# run here mutated the database on every single boot:
#
#   migrate                  schema changes
#   initadmin                created a superuser from env vars
#   load_from_confirmation   --real, i.e. write the parsed order to the DB
#   shell < add_candle.py    inserted a candle
#
# A frozen archive must not do any of that, and now cannot: the database is
# opened read-only and immutable (core/settings.py), the ORM router raises on
# writes (core/archive.py), and those management commands are deleted.
#
# collectstatic is gone too -- there is nothing to collect (no admin, no DRF
# browsable API) and WhiteNoise serves the prebuilt UI bundle directly. It also
# wrote to disk, which the read-only container filesystem no longer allows.

set -e

PORT=$1

if [ -z "$PORT" ]; then
    echo "ERROR: Please provide port"
    exit 1
fi

if [ "$deployment_mode" = "dev" ]; then
    exec python manage.py runserver 0.0.0.0:"$PORT"
fi

# --worker-tmp-dir /dev/shm keeps gunicorn's heartbeat file off the (read-only)
# root filesystem.
exec gunicorn \
    --log-file=- \
    --workers=2 \
    --threads=4 \
    --worker-class=gthread \
    --worker-tmp-dir /dev/shm \
    --bind 0.0.0.0:"$PORT" \
    core.wsgi:application
