from django.urls import path
from .views import (
    register_user,
    ProfileView,
    CurrentUserView,
    change_password,
)

urlpatterns = [
    path("register/", register_user, name="register"),
    path("me/", CurrentUserView.as_view(), name="current_user"),
    path("profile/", ProfileView.as_view(), name="profile"),
    path("change-password/", change_password, name="change_password"),
]