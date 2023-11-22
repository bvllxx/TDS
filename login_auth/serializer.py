from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''), 
            last_name=validated_data.get('last_name', '')
        )
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def check_user(self, validated_data):
        user = authenticate(email=validated_data['email'], password=validated_data['password'])
        if not user:
            raise ValidationError('Usuario no encontrado')
        return user

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ('email',)
