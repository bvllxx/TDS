from django.shortcuts import render
from rest_framework import viewsets
from .serializer import TaskSerializer
from .models import Task

class TaskView(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    queryset = Task.objects.all()

def base(request):
    return render(request,('core/base.html'))
