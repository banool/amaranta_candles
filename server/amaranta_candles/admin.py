from django.contrib import admin

from django.db.models.base import ModelBase
from amaranta_candles import models

for model_name in dir(models):
    model = getattr(models, model_name)
    if isinstance(model, ModelBase):
        admin.site.register(model)

