import re

from django.core.management.base import BaseCommand
from amaranta_candles.models import Dye, Scent, Wax, Wick


class Command(BaseCommand):
    help = (
        "Loads data from candle science order confirmation. "
        "The confirmation should just be the email copied into "
        "a text file"
    )

    def add_arguments(self, parser):
        parser.add_argument("--order-confirmation-file", required=True)
        parser.add_argument("--real", action="store_true")

    def handle(self, *args, **options):
        def print(s):
            self.stdout.write(str(s))

        with open(options["order_confirmation_file"], "r") as f:
            lines = f.read().splitlines()

        models = []

        for l in lines:
            m = None

            # Match Dye
            match = re.match(r'^(.*) \d+ oz Bottle.*$', l)
            if match and "dye" in l.lower():
                m = Dye(name=match[1])

            # Match Scent
            match = re.match(r'^(.*) \d+ oz Bottle.*$', l)
            if match and "dye" not in l.lower():
                m = Scent(name=match[1])

            # Match Wick
            match = re.match(r'^(.*) \d+ pc Bag$', l)
            if match:
                m = Wick(name=match[1])

            # Match Wax
            match = re.match(r'^(.*) \d+ lb .*$', l)
            if match:
                m = Wax(name=match[1])

            if m and "Free Sample" not in m.name:
                models.append(m)

        for m in models:
            existing = m.__class__.objects.filter(name=m.name)
            if existing:
                print(f"Not saving model because it already exists in DB: {m}")
                continue
            if options["real"]:
                print(f"Saving this model: {m}")
                m.save()
            else:
                print(f"Would save this model: {m}")

        print("Done!")
