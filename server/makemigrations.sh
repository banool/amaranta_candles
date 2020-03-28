#!/bin/bash

yes | deployment_mode=dev allowed_hosts=1 secret_key=1 sql_engine='django.db.backends.sqlite3' sql_database=fake.sqlite sql_host=1 sql_user=1 sql_password=1 sql_port=1 ui_username=1 ui_email=1 ui_password=1 pipenv run python manage.py makemigrations amaranta_candles
rm fake.sqlite
