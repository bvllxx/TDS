from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status,permissions
from .models import Proyects
from .serializer import ProyectsSerializer
from django.views.decorators.csrf import csrf_exempt

class TaskListView(APIView):
    def get(self, request, format=None):
        tasks = Proyects.objects.all()
        serializer = ProyectsSerializer(tasks, many=True)
        return Response(serializer.data)

class TaskCreateView(APIView):
    def post(self, request, format=None):
        serializer = ProyectsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskUpdateView(APIView):
    def put(self, request, pk, format=None):
        task = Proyects.objects.get(pk=pk)
        serializer = ProyectsSerializer(task, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TaskDeleteView(APIView):
    def delete(self, request, pk, format=None):
        task = Proyects.objects.get(pk=pk)
        task.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
