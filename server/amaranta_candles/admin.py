from amaranta_candles import models
from django.contrib import admin
from django.db.models.base import ModelBase


for model_name in dir(models):
    model = getattr(models, model_name)
    if model in models.IGNORE:
        continue
    if isinstance(model, ModelBase):
        if model.__name__ == "Scent":
            print("Ordered Scent model")
            class ScentAdmin(admin.ModelAdmin):
                ordering = ('name',)
            admin.site.register(model, ScentAdmin)
        else:
            admin.site.register(model)
