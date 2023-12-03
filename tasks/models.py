from django.db import models
from login_auth.models import AppUser

class Proyects(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    begin_date = models.DateField(auto_now=True, auto_now_add=False, null=True)
    end_date = models.DateField(auto_now_add=True,null=True)
    #involved_users = models.ManyToManyField(AppUser, related_name='proyects',null=True)
    founding_src_name = models.CharField(max_length=30, default='N/A')

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
