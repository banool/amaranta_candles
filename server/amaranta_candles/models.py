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

    def __str__(self):
        return self.name


class Dye(Base):
    pass


class Scent(Base):
    url = models.CharField(max_length=256, null=True, blank=True)
    photo_link = models.CharField(max_length=256, null=True, blank=True)


class Vessel(Base):
    pass


class Wax(Base):
    pass


# TODO Add scent combos, batches, candles

IGNORE = [Base]
