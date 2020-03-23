#!/usr/bin/env python3

from jinja2 import Template


BASE = "amaranta_candles.service"
SECRETS = "secrets.env"


with open(f"{BASE}.j2", "r") as f:
    template = Template(f.read())

with open(SECRETS, "r") as f:
    lines = f.read().splitlines()

secrets = {}
for l in lines:
    k, v = l.split(" === ")
    secrets[k] = v

with open(f"{BASE}", "w") as f:
    f.write(template.render(secrets=secrets))
