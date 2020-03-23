import csv
import logging
import os
import pickle
import tempfile
import time

from contextlib import suppress
from datetime import datetime, timedelta
from functools import lru_cache, partial

import pyotp
import pytz
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import FileResponse, HttpResponse
from django.views.generic import TemplateView


LOG = logging.getLogger(__name__)


def get_index(request):
    html = f"<html><body>It is now {int(time.time())}.</body></html>"
    return HttpResponse(html)
