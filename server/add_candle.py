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


b = Batch(name="horoscope", made_at=datetime.datetime.now())
b.save()
d = Dye(name="black")
d.save()
s1 = Scent(name="amber and driftwood")
s1.save()
s2 = Scent(name="citrus and mangosteen")
s2.save()
v = Vessel(name="16oz ball jar")
v.save()
w = Wax(name="464 soy wax")
w.save()
wi = Wick(name="CD 12 pretabbed")
wi.save()

sc = ScentCombo()
sc.save()
sc.scents.add(s1)
sc.scents.add(s2)
sc.save()

dwa = DyeWithAmount(dye=d, amount=2)
dwa.save()
swa1 = ScentWithAmount(scent=s1, amount=0.3)
swa1.save()
swa2 = ScentWithAmount(scent=s2, amount=0.6)
swa2.save()
wwa = WaxWithAmount(wax=w, amount=14)
wwa.save()

c = Candle(batch=b, intended_scent_combo=sc, vessel=v, wick=wi)
c.save()
c.dyes_with_amounts.add(dwa)
c.scents_with_amounts.add(swa1)
c.scents_with_amounts.add(swa2)
c.waxes_with_amounts.add(wwa)
c.save()

cs = CandleSerializer(instance=c)
print(cs.data)
