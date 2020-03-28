from amaranta_candles.models import Dye, Scent, Wax
from rest_framework.serializers import ModelSerializer


def get_serializer(klass):
    class S(ModelSerializer):
        class Meta:
            model = klass
            fields = "__all__"

    return S


ScentSerializer = get_serializer(Scent)
WaxSerializer = get_serializer(Wax)
DyeSerializer = get_serializer(Dye)
