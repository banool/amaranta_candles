import logging

from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

from amaranta_candles.models import Dye, Scent, Wax
from amaranta_candles.serializers import (
    DyeSerializer,
    ScentSerializer,
    WaxSerializer,
)


LOG = logging.getLogger(__name__)


def get_view_set(klass, serializer_klass):
    class MVS(ModelViewSet):
        login_url = "/accounts/login/"
        filterset_fields = ['id']
        queryset = klass.objects.all()
        serializer_class = serializer_klass
    return MVS


ScentModelViewSet = get_view_set(Scent, ScentSerializer)
WaxModelViewSet = get_view_set(Wax, WaxSerializer)
DyeModelViewSet = get_view_set(Dye, DyeSerializer)
