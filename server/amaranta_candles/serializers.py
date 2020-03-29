from amaranta_candles.models import Batch, Candle, Dye, Scent, ScentCombo, Vessel, Wax, DyeWithAmount, ScentWithAmount, WaxWithAmount
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
VesselSerializer = get_serializer(Vessel)
WaxSerializer = get_serializer(Wax)


class DyeWithAmountSerializer(ModelSerializer):
    dye = DyeSerializer()

    class Meta:
        model = DyeWithAmount
        fields = "__all__"


class ScentWithAmountSerializer(ModelSerializer):
    scent = ScentSerializer()

    class Meta:
        model = ScentWithAmount
        fields = "__all__"


class WaxWithAmountSerializer(ModelSerializer):
    wax = WaxSerializer()

    class Meta:
        model = WaxWithAmount
        fields = "__all__"


class ScentComboSerializer(ModelSerializer):
    scents = ScentSerializer(many=True, read_only=True)

    class Meta:
        model = ScentCombo
        fields = "__all__"
    

class CandleSerializer(ModelSerializer):
    dyes_with_amounts = DyeWithAmountSerializer(many=True, read_only=True)
    scents_with_amounts = ScentWithAmountSerializer(many=True, read_only=True)
    waxes_with_amounts = WaxWithAmountSerializer(many=True, read_only=True)
    intended_scent_combo = ScentComboSerializer()

    class Meta:
        model = Candle
        fields = "__all__"
    
