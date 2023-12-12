from rest_framework import serializers
from .models import Proyects

class ProyectsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Proyects
        fields = '__all__'