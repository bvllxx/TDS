
from rest_framework import viewsets
from .serializer import ProyectsSerializer
from .models import Proyects

class ProyectsView(viewsets.ModelViewSet):
    serializer_class = ProyectsSerializer
    queryset = Proyects.objects.all()

