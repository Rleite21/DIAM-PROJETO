from django.urls import path
from . import views

app_name = 'beer_budies'

urlpatterns = [
    path('api/grupos/', views.listar_grupos),
    path('api/eventos/', views.proximos_eventos),
    path('api/signup/', views.signup),
    path("api/login/", views.login_view),
    path("api/logout/", views.logout_view),
    path("api/user/", views.user_view),
    path("api/user/id/", views.user_id_view),
    path("api/adicionar_bebida/", views.adicionar_bebida),
    path("api/minhas_bebidas/", views.listar_bebidas_user),
]