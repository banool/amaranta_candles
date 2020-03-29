from django.urls import path
from graphene_django.views import GraphQLView
from rest_framework import routers

from . import views

router = routers.SimpleRouter(trailing_slash=False)
router.register(r"batch", views.BatchModelViewSet)
router.register(r"candle", views.CandleModelViewSet)
router.register(r"dye", views.DyeModelViewSet)
router.register(r"scent", views.ScentModelViewSet)
router.register(r"scent_combo", views.ScentComboModelViewSet)
router.register(r"vessel", views.VesselModelViewSet)
router.register(r"wax", views.WaxModelViewSet)
urlpatterns = router.urls

