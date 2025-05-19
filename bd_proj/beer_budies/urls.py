from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

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
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/apagar_bebida/<int:bebida_id>/', views.apagar_bebida),
]


#No login, faz um POST para /api/token/ com o username e password, e o backend devolve um token JWT.
#que guarda "acess" e "refresh" tokens.