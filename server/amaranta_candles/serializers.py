from amaranta_candles.models import Batch, Dye, Scent, ScentCombo, Vessel, Wax
from rest_framework.serializers import ModelSerializer


def get_serializer(klass):
    class S(ModelSerializer):
        class Meta:
            model = klass
            fields = "__all__"

    return S


BatchSerializer = get_serializer(Batch)
DyeSerializer = get_serializer(Dye)
ScentSerializer = get_serializer(Scent)
ScentComboSerializer = get_serializer(ScentCombo)
VesselSerializer = get_serializer(Vessel)
WaxSerializer = get_serializer(Wax)
