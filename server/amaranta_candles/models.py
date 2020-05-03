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
    scents = models.ManyToManyField(Scent)


class Vessel(Base):
    pass


class Wax(Base):
    pass


class ScentWithAmount(models.Model):
    scent = models.ForeignKey(Scent, on_delete=models.PROTECT)
    amount = models.FloatField()

    def __str__(self):
        return f"{self.scent.name} - {self.amount}"


class WaxWithAmount(models.Model):
    wax = models.ForeignKey(Wax, on_delete=models.PROTECT)
    amount = models.FloatField()

    def __str__(self):
        return f"{self.wax.name} - {self.amount}"


class DyeWithAmount(models.Model):
    dye = models.ForeignKey(Dye, on_delete=models.PROTECT)
    amount = models.FloatField()

    def __str__(self):
        return f"{self.dye.name} - {self.amount}"


class Candle(models.Model):
    # Name is optional. If not given, just use the intended_scent_combo's name.
    name = models.CharField(max_length=128, null=True, blank=True)

    notes = models.CharField(max_length=8192, null=True, blank=True)
    instance_created_at = models.DateTimeField(auto_now_add=True)

    batch = models.ForeignKey(Batch, on_delete=models.PROTECT)
    dyes_with_amounts = models.ManyToManyField(DyeWithAmount)
    intended_scent_combo = models.ForeignKey(ScentCombo, on_delete=models.PROTECT)
    scents_with_amounts = models.ManyToManyField(ScentWithAmount)
    vessel = models.ForeignKey(Vessel, on_delete=models.PROTECT)
    waxes_with_amounts = models.ManyToManyField(WaxWithAmount)

    def save(self, *args, **kwargs):
        if not self.name:
            isc = ScentCombo.objects.get(pk=self.intended_scent_combo)
            self.name = isc.name
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name or self.intended_scent_combo.name


INTERMEDIATES = [ScentWithAmount, WaxWithAmount, DyeWithAmount]
IGNORE = [Base]
