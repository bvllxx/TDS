from django.urls import path, include
from rest_framework import routers
from .views import TaskListView, TaskCreateView, TaskUpdateView, TaskDeleteView

#router = routers.DefaultRouter()
#router.register(r'tasks',views.ProyectsView, 'tasks')
#
#urlpatterns = [
#    path("api/v1/",include(router.urls)),
#    path('docs/', include_docs_urls(title="proyects_api"))
#]

urlpatterns = [
    path('list/', TaskListView.as_view(), name='task-list'),
    path('create/', TaskCreateView.as_view(), name='task-create'),
    path('update/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),
    path('delete/<int:pk>/', TaskDeleteView.as_view(), name='task-delete')
]