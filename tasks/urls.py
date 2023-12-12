from django.urls import path, include
from .views import TaskListView, TaskCreateView, TaskUpdateView, TaskDeleteView
urlpatterns = [
    path('list/', TaskListView.as_view(), name='task-list'),
    path('create/', TaskCreateView.as_view(), name='task-create'),
    path('update/<int:pk>/', TaskUpdateView.as_view(), name='task-update'),
    path('delete/<int:pk>/', TaskDeleteView.as_view(), name='task-delete')
]