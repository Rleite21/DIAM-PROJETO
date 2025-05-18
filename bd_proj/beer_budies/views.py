from rest_framework.decorators import api_view
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate, login, logout
from .models import Grupo,Evento
from .serializers import GrupoSerializer, EventoSerializer
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt



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

@csrf_exempt
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
    return Response({'username': request.user.username})

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