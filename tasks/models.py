from django.db import models

class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    status_choices = [
        ('pendiente', 'Pendiente'),
        ('en_proceso', 'En Proceso'),
        ('finalizado', 'Finalizado'),
    ]
    status = models.CharField(max_length=20, choices=status_choices, default='pendiente')

    def __str__(self) -> str:
        return self.title