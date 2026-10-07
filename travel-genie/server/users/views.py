from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User

from .models import Profile
from .serializers import (
    RegisterSerializer,
    ProfileSerializer,
    UserSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom JWT login endpoint returning tokens, user details, and profile in a single atomic response.
    """
    serializer_class = CustomTokenObtainPairSerializer


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    """
    Secure registration endpoint:
    - Validates email uniqueness and format
    - Validates username and password complexity
    - Automatically issues JWT tokens upon creation
    """
    serializer = RegisterSerializer(data=request.data)

    if serializer.is_valid():
        user = serializer.save()
        profile, _ = Profile.objects.get_or_create(user=user)

        # Generate JWT tokens for instant, seamless authentication
        refresh = RefreshToken.for_user(user)
        access = str(refresh.access_token)

        return Response(
            {
                "message": "User registered successfully.",
                "access": access,
                "refresh": str(refresh),
                "user": UserSerializer(user).data,
                "profile": ProfileSerializer(profile).data,
            },
            status=status.HTTP_201_CREATED,
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST,
    )


class CurrentUserView(APIView):
    """
    Returns current authenticated user details and profile.
    """
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, _ = Profile.objects.get_or_create(user=request.user)
        return Response({
            "user": UserSerializer(request.user).data,
            "profile": ProfileSerializer(profile).data,
        })


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile, created = Profile.objects.get_or_create(
            user=request.user
        )
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def patch(self, request):
        profile, created = Profile.objects.get_or_create(
            user=request.user
        )

        data = request.data.copy()

        remove_profile_image = data.get("remove_profile_image")

        if str(remove_profile_image).lower() == "true":
            if profile.profile_image:
                profile.profile_image.delete(save=False)

            profile.profile_image = None
            profile.save()

            data.pop("remove_profile_image", None)

        serializer = ProfileSerializer(
            profile,
            data=data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def change_password(request):
    """
    Secure password change endpoint requiring verification of current password.
    """
    serializer = ChangePasswordSerializer(data=request.data)
    if not serializer.is_valid():
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    user = request.user
    if not user.check_password(serializer.validated_data["old_password"]):
        return Response(
            {"old_password": ["Incorrect current password."]},
            status=status.HTTP_400_BAD_REQUEST,
        )

    user.set_password(serializer.validated_data["new_password"])
    user.save()

    # Generate new tokens after password change
    refresh = RefreshToken.for_user(user)

    return Response({
        "message": "Password updated successfully.",
        "access": str(refresh.access_token),
        "refresh": str(refresh),
    }, status=status.HTTP_200_OK)