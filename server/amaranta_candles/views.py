import csv
import logging
import os
import pickle
import tempfile
import time

from contextlib import suppress
from datetime import datetime, timedelta
from functools import lru_cache, partial

import pytz
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import FileResponse, HttpResponse
from django.shortcuts import render
from django.views.generic import TemplateView
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from amaranta_candles.models import Scent
from amaranta_candles.serializers import ScentSerializer


LOG = logging.getLogger(__name__)


class ScentListCreate(ListCreateAPIView):
    login_url = "/accounts/login/"
    queryset = Scent.objects.all()
    serializer_class = ScentSerializer

