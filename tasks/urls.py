from django.urls import path, include
from rest_framework import routers
from tasks import views
from django.views.generic import TemplateView

router = routers.DefaultRouter()
router.register(r'tasks', views.TaskView, 'tasks')

urlpatterns = [
    path("api/v1",include(router.urls)),
    path("base/",views.base, name="base"),
    path('task/', include)
]
