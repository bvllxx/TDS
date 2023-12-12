from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
from django.contrib.auth.models import Group

UserModel = get_user_model()

class UserRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        user_obj = UserModel.objects.create_user(
            rut=validated_data['rut'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''), 
            last_name=validated_data.get('last_name', ''),
            occupation=validated_data.get('occupation')
        )
        return user_obj

class UserLoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, validated_data):
        email = validated_data['email']
        password = validated_data['password']

        user = authenticate(email=email, password=password)
        if user:
            return user
        raise serializers.ValidationError('Credenciales inválidas')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = Group
        fields = ('name',)

class UserSerializer(serializers.ModelSerializer):
    groups = GroupSerializer(many=True, read_only=True)

    class Meta:
        model = UserModel
        fields = ('email','first_name','last_name','profile_picture','groups')
