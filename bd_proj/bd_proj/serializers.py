from rest_framework import serializers
from .models import (Classificacao, Grupo, Evento, Universidade, User, Bebida, UserBebida)

class ClassificacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Classificacao
        fields = '__all__'

class GrupoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Grupo
        fields = '__all__'

class UniversidadeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Universidade
        fields = '__all__'

class EventoSerializer(serializers.ModelSerializer):
    universidade = UniversidadeSerializer()

    class Meta:
        model = Evento
        fields = '__all__'

class BebidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bebida
        fields = '__all__'

class UserBebidaSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=User.objects.all())
    bebida = serializers.PrimaryKeyRelatedField(queryset=Bebida.objects.all())

    class Meta:
        model = UserBebida
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    classificacao = ClassificacaoSerializer()
    grupos = serializers.PrimaryKeyRelatedField(many=True, queryset=Grupo.objects.all())
    eventos = serializers.PrimaryKeyRelatedField(many=True, queryset=Evento.objects.all())

    class Meta:
        model = User
        fields = [
            'id', 'total_bebidas', 'total_festas', 'classificacao', 'email', 'password',
            'nome', 'username', 'data_entrada', 'grupos', 'eventos'
        ]
