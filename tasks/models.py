from django.db import models
from login_auth.models import AppUser
from datetime import timezone

class Proyects(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField(blank=True)
    begin_date = models.DateField(auto_now_add=True, null=True)
    end_date = models.DateField(null=True, blank=True)
    founding_src_name = models.CharField(max_length=30, default='N/A')
    involved_users = models.ManyToManyField(AppUser, related_name='proyects', blank=True)

    founding_choices = [
        ('interna', 'Interna'),
        ('externa', 'Externa')
    ] 

    status_choices = [
        ('pendiente', 'Pendiente'),
        ('en_proceso', 'En Proceso'),
        ('finalizado', 'Finalizado'),
    ]

    founding_src = models.CharField(
        max_length=10,
        choices=founding_choices,
        default='interna',
    )
    
    status = models.CharField(
        max_length=20,
        choices=status_choices,
        default='pendiente'
    )

    def __str__(self) -> str:
        return self.title
