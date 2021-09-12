#!/bin/sh

PORT=$1

if [ -z "$PORT" ]; then
    echo "ERROR: Please provide port"
    exit 1
fi

if [ "$deployment_mode" = "dev" ]; then
    python manage.py collectstatic --no-input
fi

python manage.py collectstatic --no-input

python manage.py migrate
python manage.py initadmin
python manage.py load_from_confirmation --order-confirmation-file confirmation2.txt --real
python manage.py shell < add_candle.py
if [ "$deployment_mode" = "dev" ]; then
    python manage.py runserver 0.0.0.0:$PORT
else
    gunicorn --log-file=- --workers=2 --threads=4 --worker-class=gthread --worker-tmp-dir /dev/shm --bind 0.0.0.0:$PORT core.wsgi:application
fi
