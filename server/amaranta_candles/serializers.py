import logging

from amaranta_candles.models import Batch, Candle, Dye, Scent, ScentCombo, Vessel, Wax, DyeWithAmount, ScentWithAmount, WaxWithAmount, Wick
from rest_framework.serializers import ModelSerializer


LOG = logging.getLogger(__name__)


def get_serializer(klass):
    class S(ModelSerializer):
        recursive_serializer_class = None
        name = f"{klass.__name__}Serializer"

        class Meta:
            model = klass
            fields = "__all__"
            name = f"{klass.__name__}Serializer"

    return S


# These are all standard, non-recursive serializers.
# When you get them, they just show IDs.
# To post to them, you use IDs.

BatchSerializer = get_serializer(Batch)
DyeSerializer = get_serializer(Dye)
ScentSerializer = get_serializer(Scent)
VesselSerializer = get_serializer(Vessel)
WaxSerializer = get_serializer(Wax)
WickSerializer = get_serializer(Wick)

ScentComboSerializer = get_serializer(ScentCombo)

DyeWithAmountSerializer = get_serializer(DyeWithAmount)
ScentWithAmountSerializer = get_serializer(ScentWithAmount)
WaxWithAmountSerializer = get_serializer(WaxWithAmount)

CandleSerializer = get_serializer(Candle)


# These are recursive serializers.
# When you get them, the ids are resolved into objects.
# These are all set as read only.

class ScentComboSerializerRecursive(ModelSerializer):
    scents = ScentSerializer(many=True, read_only=True)

    class Meta:
        model = ScentCombo
        fields = "__all__"


class DyeWithAmountSerializerRecursive(ModelSerializer):
    dye = DyeSerializer(read_only=True)

    class Meta:
        model = DyeWithAmount
        fields = "__all__"


class ScentWithAmountSerializerRecursive(ModelSerializer):
    scent = ScentSerializer(read_only=True)

    class Meta:
        model = ScentWithAmount
        fields = "__all__"


class WaxWithAmountSerializerRecursive(ModelSerializer):
    wax = WaxSerializer(read_only=True)

    class Meta:
        model = WaxWithAmount
        fields = "__all__"


class CandleSerializerRecursive(ModelSerializer):
    dyes_with_amounts = DyeWithAmountSerializerRecursive(many=True, read_only=True)
    scents_with_amounts = ScentWithAmountSerializerRecursive(many=True, read_only=True)
    waxes_with_amounts = WaxWithAmountSerializerRecursive(many=True, read_only=True)
    intended_scent_combo = ScentComboSerializerRecursive(read_only=True)
    batch = BatchSerializer(read_only=True)
    vessel = VesselSerializer(read_only=True)
    wick = WickSerializer(read_only=True)

    class Meta:
        model = Candle
        fields = "__all__"


ScentComboSerializer.recursive_serializer_class = ScentComboSerializerRecursive
DyeWithAmountSerializer.recursive_serializer_class = DyeWithAmountSerializerRecursive
ScentWithAmountSerializer.recursive_serializer_class = ScentWithAmountSerializerRecursive
WaxWithAmountSerializer.recursive_serializer_class = WaxWithAmountSerializerRecursive
CandleSerializer.recursive_serializer_class = CandleSerializerRecursive
