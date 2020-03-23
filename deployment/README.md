# Deployment
This directory contains sample files for the following:
- systemd timer
- nginx file

You will want to run certbot against that nginx file once you've sit up your DNS stuff.

This directory also contains a script that consumes a secrets.env file that you should NOT check in that contains environment variables that should be set in the systemd service file.

You will want to create a MySQL user with the username and passwords in secrets.env. As well as a table with that name.

So the flow should be:
```
# Create / modify secrets.env
python generate_service.py
scp amaranta_candles.service hostname:/etc/systemd/system/
```
