from django.core.management.base import BaseCommand
from net_worth.models import Dye, Scent, Wax, Wick


class Command(BaseCommand):
    help = "Loads data from candle science order confirmation"

    def add_arguments(self, parser):
        parser.add_argument("--order-confirmation-file")
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
            if x and "dye" in l.lower():
                m = Dye(x[1])

            # Match Scent
            match = re.match(r'^(.*) \d+ oz Bottle.*$', l)
            if x and "dye" not in l.lower():
                m = Scent(x[1])

            # Match Wick
            match = re.match(r'^(.*) \d+ pc Bag$', l)
            if x:
                m = Wick(x[1])

            # Match Wax
            match = re.match(r'^(.*) \d+ lb .*$', l)
            if x:
                m = Wax(x[1])

            if m:
                models.append(m)

        for m in models:
            if options["real"]:
                print(f"Saving this model: {m}")
                m.save()
            else:
                print(f"Would save this model: {m}")

        print("Done!")
