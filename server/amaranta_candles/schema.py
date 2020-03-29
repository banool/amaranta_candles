import graphene

from graphene_django.types import DjangoObjectType

from amaranta_candles.models import Batch, Candle, Scent, ScentCombo


def get_query(class_name_dict):

    class Q:
        pass

    for klass, name in class_name_dict.items():

        class T(DjangoObjectType):
            class Meta:
                model = klass
                fields = "__all__"
                name = f"{klass.__name__}Type"
        
        # All
        setattr(Q, f"{name}s", graphene.List(T))
        # Single
        kwargs = {f"id": graphene.Int()}
        setattr(Q, f"{name}", graphene.Field(T, **kwargs))

        def f(self, info, **kwargs):
            return klass.objects.all()

        setattr(Q, f"resolve_{name}s", f)

        def f(self, info, id):
            return klass.objects.get(pk=id)

        setattr(Q, f"resolve_{name}", f)
     
    return Q


class_name_dict = {
    Batch: "batch",
}


Query = get_query(class_name_dict)
