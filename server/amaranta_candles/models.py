import logging
import os
import ssl
import traceback
import urllib.request
from functools import lru_cache

from django.db import models

ssl._create_default_https_context = ssl._create_unverified_context


LOG = logging.getLogger(__name__)


class Base(models.Model):
    name = models.CharField(max_length=128)
    notes = models.CharField(max_length=8192, null=True, blank=True)
    # This is just when the model was made in the DB
    instance_created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Batch(Base):
    made_at = models.DateTimeField()


class Dye(Base):
    pass


class Scent(Base):
    url = models.CharField(max_length=256, null=True, blank=True)
    photo_link = models.CharField(max_length=256, null=True, blank=True)


class ScentCombo(Base):
    scent_ids = models.ManyToManyField(Scent)


class Vessel(Base):
    pass


class Wax(Base):
    pass


class ScentWithAmount(models.Model):
    scent_id = models.ForeignKey(Scent, on_delete=models.PROTECT)
    amount = models.FloatField()


class WaxWithAmount(models.Model):
    wax_id = models.ForeignKey(Wax, on_delete=models.PROTECT)
    amount = models.FloatField()


class DyeWithAmount(models.Model):
    dye_id = models.ForeignKey(Dye, on_delete=models.PROTECT)
    amount = models.FloatField()


class Candle(models.Model):
    # Name is optional. If not given, just use the intended_scent_combo's name.
    name = models.CharField(max_length=128, null=True, blank=True)

    notes = models.CharField(max_length=8192, null=True, blank=True)
    instance_created_at = models.DateTimeField(auto_now_add=True)

    batch_id = models.ForeignKey(Batch, on_delete=models.PROTECT)
    dye_with_amount_ids = models.ManyToManyField(DyeWithAmount)
    intended_scent_combo_id = models.ForeignKey(ScentCombo, on_delete=models.PROTECT)
    scent_with_amount_ids = models.ManyToManyField(ScentWithAmount)
    vessel_id = models.ForeignKey(Vessel, on_delete=models.PROTECT)
    wax_with_amount_ids = models.ManyToManyField(WaxWithAmount)

    def save(self, *args, **kwargs):
        if not self.name:
            isc = ScentCombo.objects.get(pk=self.intended_scent_combo_id)
            self.name = isc.name
        super().save(*args, **kwargs)


INTERMEDIATES = [ScentWithAmount, WaxWithAmount, DyeWithAmount]
IGNORE = [Base]
