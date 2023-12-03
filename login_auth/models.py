from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin

class AppUserManager(BaseUserManager):
	def create_user(self, rut, email, password=None, occupation=None, company_name=None, institution_type=None, **extra_fields):
		if not email:
			raise ValueError('Se necesita un correo')
		if not password:
			raise ValueError('Se necesita una contraseña')
		if not rut:
			raise ValueError('Se necesita un rut')
		email = self.normalize_email(email)
		user = self.model(
            email=email,
            rut=rut,
            occupation=occupation,
            company_name=company_name,
            institution_type=institution_type,
            **extra_fields
        )
		user.set_password(password)
		user.save(using=self._db)
		return user
	
	def create_superuser(self, rut, email, password=None, **extra_fields):
		extra_fields.setdefault('occupation', '')  # Establecer el valor por defecto para occupation
		extra_fields.setdefault('company_name', '')  # Establecer el valor por defecto para company_name
		extra_fields.setdefault('institution_type', '') 
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
	last_name = models.CharField(max_length=15)
	is_active = models.BooleanField(default=True)
	is_staff = models.BooleanField(default=False)

	institution_type = models.CharField(
        max_length=20,
        choices=[
            ('instituto', 'Instituto Profesional'),
            ('cft', 'CFT'),
        ],
        blank=True,
        null=True
    )

	occupation_choices = [
        ('empresa', 'Empresa'),
        ('institucion', 'Institución'),
    ]

	occupation = models.CharField(max_length=20, choices=occupation_choices, null=True)
	company_name = models.CharField(max_length=50, blank=True, null=True)
	phone_number = models.CharField(max_length=14)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['rut']

	objects = AppUserManager()

	def __str__(self):
		username = '{}, {}'.format(self.first_name, self.last_name)
		return username

 