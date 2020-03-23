#!/bin/bash

PORT=$1

python manage.py migrate --noinput
python manage.py initadmin
gunicorn --log-file=- --workers=2 --threads=4 --worker-class=gthread --worker-tmp-dir /dev/shm --bind 0.0.0.0:$PORT core.wsgi:application
