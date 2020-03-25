import logging
import traceback

from django.db import models

from functools import lru_cache
import urllib.request

import os
import ssl


ssl._create_default_https_context = ssl._create_unverified_context


LOG = logging.getLogger(__name__)


class Scent(models.Model):
    name = models.CharField(max_length=128)
    url = models.CharField(max_length=256, null=True, blank=True)
    notes = models.CharField(max_length=8192, null=True, blank=True)
    photo_link = models.CharField(max_length=256, null=True, blank=True)

    def __str__(self):
        return self.name


