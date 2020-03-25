import logging

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response

from amaranta_candles.models import Scent
from amaranta_candles.serializers import ScentSerializer


LOG = logging.getLogger(__name__)


class ScentListCreate(ListCreateAPIView):
    login_url = "/accounts/login/"
    queryset = Scent.objects.all()
    serializer_class = ScentSerializer
    filterset_fields = ['id']
