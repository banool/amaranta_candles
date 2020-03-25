from rest_framework.serializers import ModelSerializer

from amaranta_candles.models import Scent


class ScentSerializer(ModelSerializer):
    class Meta:
        model = Scent
        fields = '__all__'

