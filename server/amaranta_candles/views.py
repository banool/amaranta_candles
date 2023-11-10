import json
import logging

from core.secrets import secrets
from amaranta_candles.models import Batch, Candle, Dye, Scent, ScentCombo, Vessel, Wax, Wick
from amaranta_candles.serializers import (
    BatchSerializer,
    CandleSerializer,
    DyeSerializer,
    ScentSerializer,
    ScentComboSerializer,
    VesselSerializer,
    WaxSerializer,
    WickSerializer,
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

        def set_recursive_serializer_class_if_needed(self, request):
            recursive = bool(json.loads(request.GET.get("recursive", "false")))
            if not recursive:
                return
            recursive_serializer_class = getattr(self.serializer_class, "recursive_serializer_class", None)
            if recursive_serializer_class:
                print(f"Using recursive serializer {recursive_serializer_class.__name__}")
                self.serializer_class = recursive_serializer_class

        def list(self, request):
            self.set_recursive_serializer_class_if_needed(request)
            return super().list(request)

        def retrieve(self, request, pk=None):
            self.set_recursive_serializer_class_if_needed(request)
            return super().retrieve(request, pk=pk)

        def create(self, request):
            if not secrets["allow_writes_from_ui"]:
                return Response({"error": "Writes from the UI are disabled"}, status=403)
            super().create(request)

    return MVS


BatchModelViewSet = get_view_set(Batch, BatchSerializer)
CandleModelViewSet = get_view_set(Candle, CandleSerializer)
DyeModelViewSet = get_view_set(Dye, DyeSerializer)
ScentModelViewSet = get_view_set(Scent, ScentSerializer)
ScentComboModelViewSet = get_view_set(ScentCombo, ScentComboSerializer)
VesselModelViewSet = get_view_set(Vessel, VesselSerializer)
WaxModelViewSet = get_view_set(Wax, WaxSerializer)
WickModelViewSet = get_view_set(Wick, WickSerializer)
