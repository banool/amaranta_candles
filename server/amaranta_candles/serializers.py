from rest_framework.serializers import ModelSerializer

from amaranta_candles.models import Scent, Wax


def get_serializer(klass):
    class S(ModelSerializer):
        class Meta:
            model = klass
            fields = "__all__"
    return S


ScentSerializer = get_serializer(Scent)
WaxSerializer = get_serializer(Wax)
