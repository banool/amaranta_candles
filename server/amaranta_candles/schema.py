import graphene

from graphene_django.types import DjangoObjectType
from graphene_django.rest_framework.mutation import SerializerMutation

from amaranta_candles.serializers import (
    BatchSerializer,
    CandleSerializer,
    DyeSerializer,
    DyeWithAmountSerializer,
    ScentSerializer,
    ScentComboSerializer,
    ScentWithAmountSerializer,
    VesselSerializer,
    WaxSerializer,
    WaxWithAmountSerializer,
)
from amaranta_candles.models import Batch, Candle, Dye, DyeWithAmount, Scent, ScentCombo, ScentWithAmount, Vessel, Wax, WaxWithAmount


def get_type_class(klass):
    class T(DjangoObjectType):
        class Meta:
            model = klass
            fields = "__all__"
            name = f"{klass.__name__}Type"
    return T


# Get types

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
            raise RuntimeError("Must give ID")
        return Batch.objects.get(pk=id)

    def resolve_candles(self, info, **kwargs):
        return Candle.objects.all()

    def resolve_candle(self, info, id=None):
        if id is None:
            raise RuntimeError("Must give ID")
        return Candle.objects.get(pk=id)

    def resolve_dyes(self, info, **kwargs):
        return Dye.objects.all()

    def resolve_dye(self, info, id=None):
        if id is None:
            raise RuntimeError("Must give ID")
        return Dye.objects.get(pk=id)

    def resolve_dyes_with_amounts(self, info, **kwargs):
        return DyeWithAmount.objects.all()

    def resolve_dye_with_amount(self, info, id=None):
        if id is None:
            raise RuntimeError("Must give ID")
        return DyeWithAmount.objects.get(pk=id)

    def resolve_scents(self, info, **kwargs):
        return Scent.objects.all()

    def resolve_scent(self, info, id=None):
        if id is None:
            raise RuntimeError("Must give ID")
        return Scent.objects.get(pk=id)

    def resolve_scent_combos(self, info, **kwargs):
        return ScentCombo.objects.all()

    def resolve_scent_combo(self, info, id=None):
        if id is None:
            raise RuntimeError("Must give ID")
        return ScentCombo.objects.get(pk=id)

    def resolve_scents_with_amounts(self, info, **kwargs):
        return ScentWithAmount.objects.all()

    def resolve_scent_with_amount(self, info, id=None):
        if id is None:
            raise RuntimeError("Must give ID")
        return ScentWithAmount.objects.get(pk=id)

    def resolve_vessels(self, info, **kwargs):
        return Vessel.objects.all()

    def resolve_vessel(self, info, id=None):
        if id is None:
            raise RuntimeError("Must give ID")
        return Vessel.objects.get(pk=id)

    def resolve_waxes(self, info, **kwargs):
        return Wax.objects.all()

    def resolve_wax(self, info, id=None):
        if id is None:
            raise RuntimeError("Must give ID")
        return Wax.objects.get(pk=id)

    def resolve_waxes_with_amounts(self, info, **kwargs):
        return WaxWithAmount.objects.all()

    def resolve_wax_with_amount(self, info, id=None):
        if id is None:
            raise RuntimeError("Must give ID")
        return WaxWithAmount.objects.get(pk=id)

# Set types.

class BatchMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        made_at = graphene.DateTime(required=True)

        id = graphene.ID()

    batch = graphene.Field(BatchType)

    def mutate(self, info, name, made_at, id=None):
        if id is not None:
            b = Batch.objects.get(pk=id)
            b.name = name
            b.made_at = made_at
        else:
            b = Batch.objects.create(name=name, made_at=made_at)
        b.save()
        return BatchMutation(batch=b)


class DyeMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        notes = graphene.String()

        id = graphene.ID()

    dye = graphene.Field(DyeType)

    def mutate(self, info, name, notes, id=None):
        if id is not None:
            d = Dye.objects.get(pk=id)
            d.name = name
            d.notes = notes
        else:
            d = Dye.objects.create(name=name, notes=notes)
        d.save()
        return DyeMutation(dye=d)


class ScentMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        notes = graphene.String()

        id = graphene.ID()

    scent = graphene.Field(ScentType)

    def mutate(self, info, name, notes, id=None):
        if id is not None:
            s = Scent.objects.get(pk=id)
            s.name = name
            s.notes = notes
        else:
            s = Scent.objects.create(name=name, notes=notes)
        s.save()
        return ScentMutation(scent=s)


class VesselMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        notes = graphene.String()

        id = graphene.ID()

    vessel = graphene.Field(VesselType)

    def mutate(self, info, name, notes, id=None):
        if id is not None:
            v = Vessel.objects.get(pk=id)
            v.name = name
            v.notes = notes
        else:
            v = Vessel.objects.create(name=name, notes=notes)
        v.save()
        return VesselMutation(vessel=v)


class WaxMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        notes = graphene.String()

        id = graphene.ID()

    wax = graphene.Field(WaxType)

    def mutate(self, info, name, notes, id=None):
        if id is not None:
            w = Wax.objects.get(pk=id)
            w.name = name
            w.notes = notes
        else:
            w = Wax.objects.create(name=name, notes=notes)
        w.save()
        return WaxMutation(wax=w)


class CandleMutation(graphene.Mutation):
    # The input arguments for this mutation
    class Arguments:
        name = graphene.String()

        notes = graphene.String()

        batch = graphene.ID(required=True)
        dyes_with_amounts = graphene.List(graphene.ID)
        intended_scent_combo = graphene.ID(required=True)
        scents_with_amounts = graphene.List(graphene.ID, required=True)
        vessel = graphene.ID(required=True)
        waxes_with_amounts = graphene.List(graphene.ID, required=True)

        id = graphene.ID()

    # The class attributes define the response of the mutation
    candle = graphene.Field(CandleType)

    def mutate(
        self,
        info,
        name,
        notes,
        batch,
        dyes_with_amounts,
        intended_scent_combo,
        scents_with_amounts,
        vessel,
        waxes_with_amounts,
    ):
        batch = Batch.objects.get(pk=batch)
        intended_scent_combo = ScentCombo.objects.get(pk=intended_scent_combo)
        vessel = Vessel.objects.get(pk=vessel)
        candle = Candle.objects.create(
            name=name,
            notes=notes,
            batch=batch,
            intended_scent_combo=intended_scent_combo,
            vessel=vessel,
        )
        candle.save()
        for dwa in dyes_with_amounts:
            candle.dyes_with_amounts.add(dwa)
        for swa in scents_with_amounts:
            candle.scents_with_amounts.add(swa)
        for wwa in waxes_with_amounts:
            candle.waxes_with_amounts.add(wwa)
        candle.save()
        return CandleMutation(candle=candle)


class ScentComboMutation(graphene.Mutation):
    # The input arguments for this mutation
    class Arguments:
        name = graphene.String(required=True)
        scents = graphene.List(graphene.ID, required=True)

        id = graphene.ID()

    # The class attributes define the response of the mutation
    scent_combo = graphene.Field(ScentComboType)

    def mutate(self, info, name, scents):
        scent_combo = ScentCombo.objects.create(name=name)
        scent_combo.save()
        for s in scents:
            scent_combo.scents.add(s)
        scent_combo.save()
        # Notice we return an instance of this mutation
        return ScentComboMutation(scent_combo=scent_combo)


class DyeWithAmountMutation(graphene.Mutation):
    class Arguments:
        dye = graphene.ID(required=True)
        amount = graphene.Float(required=True)

        id = graphene.ID()

    # The class attributes define the response of the mutation
    dye_with_amount = graphene.Field(DyeWithAmountType)

    def mutate(self, info, dye, amount):
        dwa = DyeWithAmount.objects.create(dye=dye, amount=amount)
        dwa.save()
        return DyeWithAmountMutation(dye_with_amount=dwa)


class ScentWithAmountMutation(graphene.Mutation):
    class Arguments:
        dye = graphene.ID(required=True)
        amount = graphene.Float(required=True)

        id = graphene.ID()

    # The class attributes define the response of the mutation
    scent_with_amount = graphene.Field(ScentWithAmountType)

    def mutate(self, info, scent, amount):
        swa = ScentWithAmount.objects.create(scent=scent, amount=amount)
        swa.save()
        return ScentWithAmountMutation(scent_with_amount=swa)


class WaxWithAmountMutation(graphene.Mutation):
    class Arguments:
        wax = graphene.ID(required=True)
        amount = graphene.Float(required=True)

        id = graphene.ID()

    # The class attributes define the response of the mutation
    wax_with_amount = graphene.Field(WaxWithAmountType)

    def mutate(self, info, wax, amount):
        wax = Wax.objects.get(pk=wax)
        wwa = WaxWithAmount.objects.create(wax=wax, amount=amount)
        wwa.save()
        return WaxWithAmountMutation(wax_with_amount=wwa)


class WaxMutation(graphene.Mutation):
    class Arguments:
        name = graphene.String(required=True)
        notes = graphene.String()

        id = graphene.ID()

    wax = graphene.Field(WaxType)

    def mutate(self, info, name, notes, id=None):
        if id is not None:
            w = Wax.objects.get(pk=id)
            w.name = name
            w.notes = notes
        else:
            w = Wax.objects.create(name=name, notes=notes)
        w.save()
        return WaxMutation(wax=w)



class Mutation(graphene.ObjectType):
    batch = BatchMutation.Field()
    candle = CandleMutation.Field()
    dye = DyeMutation.Field()
    dye_with_amount = DyeWithAmountMutation.Field()
    scent = ScentMutation.Field()
    scent_combo = ScentComboMutation.Field()
    scent_with_amount = ScentWithAmountMutation.Field()
    vessel = VesselMutation.Field()
    wax = WaxMutation.Field()
    wax_with_amount = WaxWithAmountMutation.Field()
