from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser

class AppUserAdmin(UserAdmin):
    list_display = ('rut', 'email', 'first_name', 'second_name', 'is_active', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'rut', 'password', 'first_name', 'second_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')})
    )

    # Agrega el siguiente atributo para especificar el campo de ordenamiento
    ordering = ('email',)  # Puedes cambiar 'email' por el campo que desees

admin.site.register(AppUser, AppUserAdmin)
