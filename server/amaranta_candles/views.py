import logging

from amaranta_candles.models import Batch, Candle, Dye, Scent, ScentCombo, Vessel, Wax
from amaranta_candles.serializers import (
    BatchSerializer,
    CandleSerializer,
    DyeSerializer,
    ScentSerializer,
    ScentComboSerializer,
    VesselSerializer,
    WaxSerializer,
)
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from rest_framework.generics import ListCreateAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet

LOG = logging.getLogger(__name__)


def get_view_set(klass, serializer_klass):
    class MVS(ModelViewSet):
        login_url = "/accounts/login/"
        filterset_fields = ["id"]
        queryset = klass.objects.all()
        serializer_class = serializer_klass

    return MVS


BatchModelViewSet = get_view_set(Batch, BatchSerializer)
CandleModelViewSet = get_view_set(Candle, CandleSerializer)
DyeModelViewSet = get_view_set(Dye, DyeSerializer)
ScentModelViewSet = get_view_set(Scent, ScentSerializer)
ScentComboModelViewSet = get_view_set(ScentCombo, ScentComboSerializer)
VesselModelViewSet = get_view_set(Vessel, VesselSerializer)
WaxModelViewSet = get_view_set(Wax, WaxSerializer)
