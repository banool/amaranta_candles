#!/bin/sh

PORT=$1

if [ "$deployment_mode" = "dev" ]; then
    python manage.py collectstatic --no-input
fi

python manage.py migrate
python manage.py initadmin
python manage.py shell < add_candle.py
if [ "$deployment_mode" = "dev" ]; then
    python manage.py runserver 0.0.0.0:$PORT
else
    gunicorn --log-file=- --workers=2 --threads=4 --worker-class=gthread --worker-tmp-dir /dev/shm --bind 0.0.0.0:$PORT core.wsgi:application
fi
