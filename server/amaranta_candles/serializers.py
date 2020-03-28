from rest_framework.serializers import ModelSerializer

from amaranta_candles.models import Scent, Wax


class ScentSerializer(ModelSerializer):
    class Meta:
        model = Scent
        fields = '__all__'


class WaxSerializer(ModelSerializer):
    class Meta:
        model = Wax
        fields = '__all__'

