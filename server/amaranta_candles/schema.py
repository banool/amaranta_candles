import graphene

from graphene_django.types import DjangoObjectType

from amaranta_candles.models import Batch, Candle, Scent, ScentCombo


class BatchType(DjangoObjectType):
    class Meta:
        model = Batch
        fields = "__all__"


class CandleType(DjangoObjectType):
    class Meta:
        model = Candle
        fields = "__all__"


class ScentType(DjangoObjectType):
    class Meta:
        model = Scent
        fields = "__all__"


class ScentComboType(DjangoObjectType):
    class Meta:
        model = ScentCombo
        fields = "__all__"


class Query(object):
    all_candles = graphene.List(CandleType)

    def resolve_all_candles(self, info, **kwargs):
        return Candle.objects.all()
