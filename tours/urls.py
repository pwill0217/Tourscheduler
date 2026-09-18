from django.urls import path
from .views import tour_list
from .views import tour_create
from .views import apartment_list
urlpatterns = [
    path('', tour_list),
    path('create/', tour_create),
    path('apartments/', apartment_list, name='apartment-list'),
]