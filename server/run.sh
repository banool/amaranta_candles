#!/bin/sh

PORT=$1

# python manage.py makemigrations amaranta_candles
python manage.py migrate --fake
python manage.py migrate --noinput --run-syncdb
python manage.py initadmin
gunicorn --log-file=- --workers=2 --threads=4 --worker-class=gthread --worker-tmp-dir /dev/shm --bind 0.0.0.0:$PORT core.wsgi:application
