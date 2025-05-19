from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .models import Grupo, Evento, UserBebida, Bebida, UserInfo
from .serializers import GrupoSerializer, EventoSerializer, UserBebidaSerializer
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import get_user_model
from django.utils import timezone
from django.db import models
from django.db.models import Sum


@api_view(['GET', 'POST'])
def listar_grupos(request):
    if request.method == 'GET':
        grupos = Grupo.objects.all()
        serializer = GrupoSerializer(grupos, many=True)
        return Response(serializer.data)
    
    elif request.method == 'POST':
        serializer = GrupoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST'])
def proximos_eventos(request):
    if request.method == 'GET':
        eventos = Evento.objects.all()
        serializer = EventoSerializer(eventos,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = EventoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    if username is None or password is None:
        return Response({'error': 'invalid username/password'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=status.HTTP_400_BAD_REQUEST)
    if User.objects.filter(email=email).exists():
        return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
    
    user = User.objects.create_user(username=username, password=password, email=email)
    return Response({'message': 'User ' + user.username + ' created successfully'}, status=status.HTTP_201_CREATED)

@api_view(['POST'])
def login_view(request):
    username = request.data.get('username')
    password = request.data.get('password')
    
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user) 
        return Response({'message': 'Logged in successfully'})
    else:
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    

@api_view(['GET'])
def logout_view(request):
    logout(request)
    return Response({'message': 'Logged out successfully'})


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_view(request):
    user = request.user
    try:
        userinfo = user.userinfo
    except UserInfo.DoesNotExist:
        userinfo = None

    total_bebidas = UserBebida.objects.filter(user=user).aggregate(
        total=Sum('cervejas')
    )['total'] or 0

    total_festas = userinfo.total_festas if userinfo else 0
    classificacao = userinfo.classificacao.designacao if (userinfo and userinfo.classificacao) else ""
    data_entrada = userinfo.data_entrada if userinfo else user.date_joined.date()

    return Response({
        'username': user.username,
        'data_entrada': data_entrada,
        'total_bebidas': total_bebidas,
        'total_festas': total_festas,
        'classificacao': classificacao
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_id_view(request):
    return Response({'user_id': request.user.id})

@api_view(['GET'])
def userInfo_view(request, user_id):
    try:
        user = User.objects.get(pk=user_id)
        data = {
            'id': user.id,
            'username': user.username,
            'email': user.email,
        }
        return Response(data, status=status.HTTP_200_OK)
    except User.DoesNotExist:
        return Response({'error': 'Utilizador não encontrado'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def adicionar_bebida(request):
    bebida_nome = request.data.get('bebida') 
    evento = request.data.get('evento')
    local = request.data.get('local')
    cervejas = request.data.get('cervejas')
    coordenadas = request.data.get('coordenadas', '')
    user = request.user

    bebida = None
    if bebida_nome:
        bebida, _ = Bebida.objects.get_or_create(nome=bebida_nome)

    UserBebida.objects.create(
        user=user,
        bebida=bebida,
        data=timezone.now(),
        coordenadas=coordenadas,
        evento=evento,
        cervejas=cervejas,
        local=local
    )

    try:
        userinfo = user.userinfo
        total = UserBebida.objects.filter(user=user).aggregate(
            total=models.Sum('cervejas')
        )['total'] or 0
        userinfo.total_bebidas = total
        userinfo.save()
    except UserInfo.DoesNotExist:
        pass

    return Response({'success': True})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def listar_bebidas_user(request):
    user = request.user
    bebidas = UserBebida.objects.filter(user=user)
    serializer = UserBebidaSerializer(bebidas, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def apagar_bebida(request, bebida_id):
    try:
        bebida = UserBebida.objects.get(id=bebida_id, user=request.user)
        bebida.delete()
        return Response({'success': True})
    except UserBebida.DoesNotExist:
        return Response({'error': 'Evento não encontrado'}, status=404)

@api_view(['GET'])
def grupo_detail(request, grupo_id):
    try:
        grupo = Grupo.objects.get(id=grupo_id)
        return Response({
            "id": grupo.id,
            "nome": grupo.nome,
            "descricao": grupo.descricao,
            "num_membros": grupo.num_membros,
        })
    except Grupo.DoesNotExist:
        return Response({"error": "Grupo não encontrado"}, status=404)

@api_view(['GET'])
def grupo_membros(request, grupo_id):
    try:
        grupo = Grupo.objects.get(id=grupo_id)
        membros = grupo.membros.all()
        return Response([{"id": m.id, "username": m.username} for m in membros])
    except Grupo.DoesNotExist:
        return Response({"error": "Grupo não encontrado"}, status=404)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def juntar_ao_grupo(request, grupo_id):
    try:
        grupo = Grupo.objects.get(id=grupo_id)
        user = request.user
        grupo.membros.add(user)
        grupo.num_membros = grupo.membros.count()
        grupo.save()
        return Response({'success': True})
    except Grupo.DoesNotExist:
        return Response({'error': 'Grupo não encontrado'}, status=404)