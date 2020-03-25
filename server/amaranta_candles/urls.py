from django.urls import path
from . import views

urlpatterns = [
    path('scent/', views.ScentListCreate.as_view()),
]
