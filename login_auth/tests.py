from rest_framework.test import APITestCase, APIRequestFactory, force_authenticate
from rest_framework import status
from rest_framework.authtoken.models import Token
from .models import AppUser
from .views import SignupCredentialVerification

class UserViewTestCase(APITestCase):
    def setUp(self):
        self.factory = APIRequestFactory()
        self.user = AppUser.objects.create(username='testuser', email='test@example.com')
        self.token = Token.objects.create(user=self.user)

    def test_duplicate_data(self):
        url = 'validate/'  # Reemplaza con la URL de tu endpoint
        data = {'email': 'correo_existente@example.com'}  # Datos de prueba
        request = self.factory.get(url, data)
        force_authenticate(request, user=self.user)
        response = SignupCredentialVerification.as_view()(request)  
        self.assertEqual(response.status_code, status.HTTP_409_CONFLICT)

    def test_valid_data(self):
        url = 'validate/'  # Reemplaza con la URL de tu endpoint
        data = {'email': 'nuevo_email@example.com'}  # Datos de prueba
        request = self.factory.get(url, data)
        force_authenticate(request, user=self.user)
        response = SignupCredentialVerification.as_view()(request)
        self.assertEqual(response.status_code, status.HTTP_200_OK)