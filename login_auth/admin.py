from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import AppUser

class AppUserAdmin(UserAdmin):
    model = AppUser
    list_display = ('email', 'first_name', 'last_name', 'occupation', 'is_staff')
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name','profile_picture', 'rut', 'phone_number')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions')}),
        ('Occupation', {'fields': ('occupation', 'company_name', 'institution_type')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'rut', 'first_name', 'last_name', 'password1', 'password2'),
        }),
    )
    search_fields = ('email', 'first_name', 'last_name', 'rut')
    ordering = ('email',)

admin.site.register(AppUser, AppUserAdmin)
