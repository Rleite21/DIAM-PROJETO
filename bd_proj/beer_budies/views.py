from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Grupo
from .serializers import GrupoSerializer

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
