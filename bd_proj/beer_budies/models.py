from django.db import models
from django.contrib.auth.models import User

class Classificacao(models.Model):
    designacao = models.CharField(max_length=20)

class Grupo(models.Model):
    nome = models.CharField(max_length=20, blank=False, null=False)
    descricao = models.CharField(max_length=820, blank=False, null=False)
    num_membros=models.IntegerField(default=0)

class Evento(models.Model):
    nome = models.CharField(max_length=20)
    uni = models.CharField(max_length=20, default="")
    data = models.DateField()
    hora = models.TimeField()
    preco_J = models.FloatField()


class UserInfo(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True) # 👈 Ligação direta ao User
    total_bebidas = models.IntegerField(default=0)
    total_festas = models.IntegerField(default=0)
    classificacao = models.ForeignKey('Classificacao', on_delete=models.SET_NULL, null=True)
    data_entrada = models.DateField(auto_now_add=True)






