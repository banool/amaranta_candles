#!/usr/bin/env python3

import argparse

from jinja2 import Template

parser = argparse.ArgumentParser()
parser.add_argument("service_filename")
parser.add_argument("--secrets-filename")
args = parser.parse_args()

args.service_filename = args.service_filename.replace(".j2", "")


with open(f"{args.service_filename}.j2", "r") as f:
    template = Template(f.read())

if args.secrets_filename:
    with open(args.secrets_filename, "r") as f:
        lines = f.read().splitlines()

    secrets = {}
    for l in lines:
        k, v = l.split(" === ")
        secrets[k] = v
else:
    secrets = {}

with open(args.service_filename, "w") as f:
    f.write(template.render(secrets=secrets))
