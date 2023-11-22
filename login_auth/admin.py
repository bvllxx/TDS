from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser

class AppUserAdmin(UserAdmin):
    list_display = ('rut', 'email', 'first_name', 'second_name', 'is_active', 'is_staff')
    fieldsets = ((None, {'fields': ('email', 'rut', 'password', 'first_name', 'second_name')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser')})
    )
    
    ordering = ('email',) 
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'rut', 'password1', 'password2'),
        }),
    )

admin.site.register(AppUser, AppUserAdmin)
