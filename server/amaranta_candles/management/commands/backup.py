import csv
import datetime

from django.core.management.base import BaseCommand
from net_worth.models import Asset
from net_worth.views import get_all_external_assets


class Command(BaseCommand):
    TARGET = "history.csv"

    help = "Writes data to a backup csv"

    def add_arguments(self, parser):
        parser.add_argument("--force", action="store_true")

    def handle(self, *args, **options):
        def print(s):
            self.stdout.write(str(s))

        date = datetime.datetime.now().strftime("%Y-%m-%d")

        try:
            with open(self.TARGET, "r", newline="") as f:
                reader = csv.DictReader(f)
                rows = list(reader)
        except (FileNotFoundError, IndexError):
            rows = []

        dates = {r["Date"] for r in rows}
        if date in dates:
            if options["force"]:
                print("Data already written for today, overwriting bc force is set")
                rows = [r for r in rows if r["Date"] != date]
            else:
                print("Data already written for today, quitting bc force is not set")
                return

        assets = []
        assets += Asset.objects.all()
        assets += get_all_external_assets()

        d = {}
        for a in assets:
            d[a.name] = a.us_value

        net_worth = sum(d.values())

        new_row = {}
        new_row["Date"] = date
        new_row["Net Worth USD"] = "{0:.2f}".format(net_worth)
        new_row.update(d)
        rows.append(new_row)

        keys = {}  # We use a dict so we can keep the order.
        for row in rows:
            keys.update(row)
        keys = list(keys.keys())

        with open(self.TARGET, "w", newline="") as f:
            writer = csv.DictWriter(f, keys, restval=0)
            writer.writeheader()
            for row in rows:
                writer.writerow(row)

        print("Done!")
