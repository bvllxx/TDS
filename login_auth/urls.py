from django.urls import path
from . import views

urlpatterns = [
    path('register/', views.UserRegister.as_view(), name='register'),
	path('user/', views.UserView.as_view(), name='user'),
    path('users/<int:pk>/', views.UserDetailView.as_view(), name='user-detail'),
    path('list_users/', views.ListUsers.as_view(), name='user_list')

]
 