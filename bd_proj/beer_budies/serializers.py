from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Classificacao, Grupo, Evento, UserInfo, UserBebida

class ClassificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classificacao
        fields = '__all__'

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo
        fields = '__all__'



class EventoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Evento
        fields = '__all__'


class UserInfoSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField()  # nome do user automaticamente
    classificacao = ClassificacaoSerializer()

    class Meta:
        model = UserInfo   # 👈 estava errado (era User), o correto é UserInfo
        fields = '__all__'

class UserBebidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserBebida
        fields = '__all__'
