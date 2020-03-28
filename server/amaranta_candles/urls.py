from django.urls import path
from rest_framework import routers
from . import views


router = routers.SimpleRouter(trailing_slash=False)
router.register(r'scent', views.ScentModelViewSet)
router.register(r'wax', views.WaxModelViewSet)
urlpatterns = router.urls
