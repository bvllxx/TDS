from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.contrib.auth.models import Group, Permission

class AppUserManager(BaseUserManager):
	
	def create_user(self,rut,email, password=None,   **extra_fields):
		if not email:
			raise ValueError('Se necesita un correo')
		if not password:
			raise ValueError('Se necesita una contraseña')
		if not rut:
			raise ValueError('Se necesita un rut')
		email = self.normalize_email(email)
		user = self.model(email=email)
		user.set_password(password)
		user.save()
		return user
	
	def create_superuser(self,rut,email,password=None,  **extra_fields):
		if not email:
			raise ValueError('Se necesita un correo')
		if not password:
			raise ValueError('Se necesita una contraseña')
		user = self.create_user(rut,email,password)
		user.is_staff = True
		user.is_superuser = True
		user.save()
		return user

class AppUser(AbstractBaseUser, PermissionsMixin):
	user_id = models.AutoField(primary_key=True)
	rut = models.CharField(max_length=12, unique=True)
	email = models.EmailField(max_length=20, unique=True)
	first_name = models.CharField(max_length=15)
	second_name = models.CharField(max_length=15)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)
	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['rut']


	objects = AppUserManager()

	def __str__(self):
		username = '{}, {}'.format(self.first_name, self.second_name)
		return username

#project_management_group, created = Group.objects.get_or_create(name='Administradores')

#project_management_group.permissions.add(
#	Permission.objects.get(codename='can_create_project'),
#	Permission.objects.get(codename='can_edit_project'),
#	Permission.objects.get(codename='can_delete_project'),
#)

#AppUser.groups.add(project_management_group)