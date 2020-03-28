from amaranta_candles.models import Dye, Scent, Vessel, Wax
from rest_framework.serializers import ModelSerializer


def get_serializer(klass):
    class S(ModelSerializer):
        class Meta:
            model = klass
            fields = "__all__"

    return S


DyeSerializer = get_serializer(Dye)
ScentSerializer = get_serializer(Scent)
VesselSerializer = get_serializer(Vessel)
WaxSerializer = get_serializer(Wax)
