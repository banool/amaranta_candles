import logging

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from amaranta_candles.models import Scent
from amaranta_candles.serializers import (
    ScentSerializer,
)


LOG = logging.getLogger(__name__)


class Base(ModelViewSet):
    login_url = "/accounts/login/"
    filterset_fields = ['id']


class ScentListCreate(Base):
    queryset = Scent.objects.all()
    serializer_class = ScentSerializer

