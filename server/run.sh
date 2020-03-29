#!/bin/sh

PORT=$1

if [ "$deployment_mode" = "dev" ]; then
    python manage.py collectstatic
fi

python manage.py migrate
python manage.py initadmin
python manage.py shell < add_candle.py
gunicorn --log-file=- --workers=2 --threads=4 --worker-class=gthread --worker-tmp-dir /dev/shm --bind 0.0.0.0:$PORT core.wsgi:application
