import graphene

from graphene_django.types import DjangoObjectType

from amaranta_candles.models import Batch, Candle, Dye, DyeWithAmount, Scent, ScentCombo, ScentWithAmount, Vessel, Wax, WaxWithAmount


def get_type_class(klass):
    class T(DjangoObjectType):
        class Meta:
            model = klass
            fields = "__all__"
            name = f"{klass.__name__}Type"
    return T


BatchType = get_type_class(Batch)
CandleType = get_type_class(Candle)
DyeType = get_type_class(Dye)
DyeWithAmountType = get_type_class(DyeWithAmount)
ScentType = get_type_class(Scent)
ScentComboType = get_type_class(ScentCombo)
ScentWithAmountType = get_type_class(ScentWithAmount)
VesselType = get_type_class(Vessel)
WaxType = get_type_class(Wax)
WaxWithAmountType = get_type_class(WaxWithAmount)


class Query:
    batches = graphene.List(BatchType)
    batch = graphene.Field(BatchType, id=graphene.Int())

    candles = graphene.List(CandleType)
    candle = graphene.Field(CandleType, id=graphene.Int())

    dyes = graphene.List(DyeType)
    dye = graphene.Field(DyeType, id=graphene.Int())

    dyes_with_amounts = graphene.List(DyeWithAmountType)
    dye_with_amount = graphene.Field(DyeWithAmountType, id=graphene.Int())

    scents = graphene.List(ScentType)
    scent = graphene.Field(ScentType, id=graphene.Int())

    scent_combos = graphene.List(ScentComboType)
    scent_combo = graphene.Field(ScentComboType, id=graphene.Int())

    scents_with_amounts = graphene.List(ScentWithAmountType)
    scent_with_amount = graphene.Field(ScentWithAmountType, id=graphene.Int())

    vessels = graphene.List(VesselType)
    vessel = graphene.Field(VesselType, id=graphene.Int())

    waxes = graphene.List(WaxType)
    wax = graphene.Field(WaxType, id=graphene.Int())

    waxes_with_amounts = graphene.List(WaxWithAmountType)
    wax_with_amount = graphene.Field(WaxWithAmountType, id=graphene.Int())

    def resolve_batches(self, info, **kwargs):
        return Batch.objects.all()

    def resolve_batch(self, info, id=None):
        if id is None:
            return None
        return Batch.objects.get(pk=id)

    def resolve_candles(self, info, **kwargs):
        return Candle.objects.all()

    def resolve_candle(self, info, id=None):
        if id is None:
            return None
        return Candle.objects.get(pk=id)

    def resolve_dyes(self, info, **kwargs):
        return Dye.objects.all()

    def resolve_dye(self, info, id=None):
        if id is None:
            return None
        return Dye.objects.get(pk=id)

    def resolve_dyes_with_amounts(self, info, **kwargs):
        return DyeWithAmount.objects.all()

    def resolve_dye_with_amount(self, info, id=None):
        if id is None:
            return None
        return DyeWithAmount.objects.get(pk=id)

    def resolve_scents(self, info, **kwargs):
        return Scent.objects.all()

    def resolve_scent(self, info, id=None):
        if id is None:
            return None
        return Scent.objects.get(pk=id)

    def resolve_scent_combos(self, info, **kwargs):
        return ScentCombo.objects.all()

    def resolve_scent_combo(self, info, id=None):
        if id is None:
            return None
        return ScentCombo.objects.get(pk=id)

    def resolve_scents_with_amounts(self, info, **kwargs):
        return ScentWithAmount.objects.all()

    def resolve_scent_with_amount(self, info, id=None):
        if id is None:
            return None
        return ScentWithAmount.objects.get(pk=id)

    def resolve_vessels(self, info, **kwargs):
        return Vessel.objects.all()

    def resolve_vessel(self, info, id=None):
        if id is None:
            return None
        return Vessel.objects.get(pk=id)

    def resolve_waxes(self, info, **kwargs):
        return Wax.objects.all()

    def resolve_wax(self, info, id=None):
        if id is None:
            return None
        return Wax.objects.get(pk=id)

    def resolve_waxes_with_amounts(self, info, **kwargs):
        return WaxWithAmount.objects.all()

    def resolve_wax_with_amount(self, info, id=None):
        if id is None:
            return None
        return WaxWithAmount.objects.get(pk=id)
