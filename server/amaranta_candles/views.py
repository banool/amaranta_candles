import logging

from amaranta_candles.models import (
    Batch,
    Candle,
    Dye,
    Scent,
    ScentCombo,
    Vessel,
    Wax,
    Wick,
)
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
from core.archive import SNAPSHOT_DATE
from django.conf import settings
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ReadOnlyModelViewSet

LOG = logging.getLogger(__name__)


def get_view_set(klass, serializer_klass):
    # ReadOnlyModelViewSet, not ModelViewSet. This is the difference between an
    # archive and a public database: ModelViewSet routes six verbs, and the old
    # `allow_writes_from_ui` check only ever guarded create() -- so PUT, PATCH
    # and DELETE on /api/<thing>/<id> were unauthenticated and completely
    # ungated. ReadOnlyModelViewSet routes `list` and `retrieve` and nothing
    # else, so the writing verbs 405 because no handler for them exists.
    class MVS(ReadOnlyModelViewSet):
        queryset = klass.objects.all()
        serializer_class = serializer_klass

        def set_recursive_serializer_class_if_needed(self, request):
            # `recursive` arrives from the query string, so it must not go
            # through json.loads: that parses arbitrary JSON and raises an
            # unhandled ValueError on anything that isn't -- `?recursive=x` was
            # a 500.
            recursive = request.GET.get("recursive", "").lower() in ("true", "1", "yes")
            if not recursive:
                return
            recursive_serializer_class = getattr(
                self.serializer_class, "recursive_serializer_class", None
            )
            if recursive_serializer_class:
                self.serializer_class = recursive_serializer_class

        def list(self, request):
            self.set_recursive_serializer_class_if_needed(request)
            return super().list(request)

        def retrieve(self, request, pk=None):
            self.set_recursive_serializer_class_if_needed(request)
            return super().retrieve(request, pk=pk)

    return MVS


@api_view(["GET"])
def archive_info(request):
    """Says out loud that this is a frozen copy, so the UI can display it."""
    return Response(
        {
            "read_only": True,
            "snapshot_date": settings.ARCHIVE_SNAPSHOT_DATE,
            "description": (
                "Amaranta Candles is no longer updated. This site is a "
                f"read-only archive of the data as it stood on {SNAPSHOT_DATE}."
            ),
        }
    )


BatchModelViewSet = get_view_set(Batch, BatchSerializer)
CandleModelViewSet = get_view_set(Candle, CandleSerializer)
DyeModelViewSet = get_view_set(Dye, DyeSerializer)
ScentModelViewSet = get_view_set(Scent, ScentSerializer)
ScentComboModelViewSet = get_view_set(ScentCombo, ScentComboSerializer)
VesselModelViewSet = get_view_set(Vessel, VesselSerializer)
WaxModelViewSet = get_view_set(Wax, WaxSerializer)
WickModelViewSet = get_view_set(Wick, WickSerializer)
