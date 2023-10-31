from rest_framework import serializers


class TaskSerializer():
    class Meta:
        model = 'task'
        fields = '__all__'