from amaranta_candles.models import *
import datetime

b = Batch(name="horoscope", made_at=datetime.datetime.now())
b.save()
d = Dye(name="black")
d.save()
s = Scent(name="amber and driftwood")
s.save()
v = Vessel(name="16oz ball jar")
v.save()
w = Wax(name="464 soy wax")
w.save()

sc = ScentCombo()
sc.save()
sc.scent_ids.add(s)
sc.save()

dwa = DyeWithAmount(dye_id=d, amount=2)
dwa.save()
swa = ScentWithAmount(scent_id=s, amount=0.3)
swa.save()
wwa = WaxWithAmount(wax_id=w, amount=14)
wwa.save()

c = Candle(batch_id=b, intended_scent_combo_id=sc, vessel_id=v)
c.save()
c.dye_with_amount_ids.add(dwa)
c.scent_with_amount_ids.add(swa)
c.wax_with_amount_ids.add(wwa)
c.save()


