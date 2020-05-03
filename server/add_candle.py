"""
You must run load_from_confirmation before this.
"""

import datetime
import sys

from amaranta_candles.models import *
from amaranta_candles.serializers import CandleSerializer


num_candles = list(Candle.objects.all())
if len(num_candles) > 0:
    print("There is already a candle in the db")
    sys.exit(0)
else:
    print("No candle exists in the DB, adding one")


b = Batch(name="First", made_at=datetime.datetime.strptime("2020-02-05", "%Y-%m-%d"))
if not Batch.objects.filter(name=b.name):
    b.save()
    print(f"Saved Batch: {b}")
else:
    b = Batch.objects.filter(name=b.name)[0]
    print(f"Batch already exists: {b}")

s1 = Scent.objects.filter(name="Oakmoss and Amber")[0]
s2 = Scent.objects.filter(name="Blood Orange")[0]

v = Vessel(name="Large Mason Jar")
if not Vessel.objects.filter(name=v.name):
    v.save()
    print(f"Saved Vessel: {v}")
else:
    v = Vessel.objects.filter(name=v.name)[0]
    print(f"Vessel already exists: {v}")

w = Wax.objects.filter(name="Golden Brands 464 Soy Wax")[0]
wi = Wick.objects.filter(name='CD 12 6" Pretabbed Wick')[0]

sc = ScentCombo(name="For")
if not ScentCombo.objects.filter(name=sc.name):
    sc.save()
    sc.scents.add(s1)
    sc.scents.add(s2)
    sc.save()
    print(f"Saved ScentCombo: {sc}")
else:
    sc = ScentCombo.objects.filter(name=sc.name)[0]
    print(f"ScentCombo already exists: {sc}")

swa1 = ScentWithAmount(scent=s1, amount=0.6)
swa1.save()
swa2 = ScentWithAmount(scent=s2, amount=0.2)
swa2.save()
wwa = WaxWithAmount(wax=w, amount=12)
wwa.save()

c = Candle(batch=b, intended_scent_combo=sc, vessel=v, wick=wi)
c.save()
c.scents_with_amounts.add(swa1)
c.scents_with_amounts.add(swa2)
c.waxes_with_amounts.add(wwa)
c.save()
print(f"Saved Candle: {c}")

cs = CandleSerializer(instance=c)
print(cs.data)
