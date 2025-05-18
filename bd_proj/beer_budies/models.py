from django.db import models

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


class User(models.Model):
    total_bebidas = models.IntegerField(default=0)
    total_festas = models.IntegerField(default=0)
    classificacao = models.ForeignKey('Classificacao', on_delete=models.SET_NULL, null=True)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100)
    nome = models.CharField(max_length=100)
    username = models.CharField(max_length=100)
    data_entrada = models.DateField()
    grupos = models.ManyToManyField('Grupo', through='ParticipaGrupo')
    eventos = models.ManyToManyField('Evento', through='ParticipaEvento')

class ParticipaGrupo(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    grupo = models.ForeignKey('Grupo', on_delete=models.CASCADE)

class ParticipaEvento(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    evento = models.ForeignKey('Evento', on_delete=models.CASCADE)

class Bebida(models.Model):
    nome = models.CharField(max_length=20)
    teor_alcool = models.FloatField()

class UserBebida(models.Model):
    user = models.ForeignKey('User', on_delete=models.CASCADE)
    bebida = models.ForeignKey('Bebida', on_delete=models.CASCADE)
    data = models.DateTimeField()
    coordenadas = models.CharField(max_length=50)