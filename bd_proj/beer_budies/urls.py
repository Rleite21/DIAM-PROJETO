from django.urls import path
from . import views

app_name = 'beer_budies'

urlpatterns = [
    path('api/grupos/', views.listar_grupos),
    path('api/eventos/', views.proximos_eventos),
    path('api/signup/', views.signup),
   
]