import re
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken
from .models import Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "is_staff",
            "is_superuser",
        ]
        read_only_fields = ["id", "is_staff", "is_superuser"]


class ProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    remove_profile_image = serializers.BooleanField(
        write_only=True,
        required=False,
        default=False,
    )

    class Meta:
        model = Profile
        fields = [
            "id",
            "user",
            "profile_image",
            "bio",
            "travel_style",
            "favorite_destination",
            "created_at",
            "remove_profile_image",
        ]
        read_only_fields = [
            "id",
            "user",
            "created_at",
        ]


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        required=True,
        style={"input_type": "password"}
    )
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = [
            "username",
            "email",
            "password",
            "first_name",
            "last_name",
        ]

    def validate_username(self, value):
        cleaned = value.strip()
        if len(cleaned) < 3:
            raise serializers.ValidationError("Username must be at least 3 characters long.")
        # Allow alphanumeric, underscore, dot, and hyphen
        if not re.match(r"^[\w.@+-]+$", cleaned):
            raise serializers.ValidationError("Username can only contain letters, numbers, and @/./+/-/_ characters.")
        if User.objects.filter(username__iexact=cleaned).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return cleaned

    def validate_email(self, value):
        cleaned = value.strip().lower()
        if not cleaned:
            raise serializers.ValidationError("Email address is required.")
        if User.objects.filter(email__iexact=cleaned).exists():
            raise serializers.ValidationError("An account with this email address already exists. Please login instead.")
        return cleaned

    def validate_password(self, value):
        # Validate password using Django's configured password validators
        validate_password(value)
        return value

    def create(self, validated_data):
        username = validated_data["username"].strip()
        email = validated_data["email"].strip().lower()
        password = validated_data["password"]
        first_name = validated_data.get("first_name", "").strip()
        last_name = validated_data.get("last_name", "").strip()

        user = User.objects.create_user(
            username=username,
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
        )

        # Ensure profile exists
        Profile.objects.get_or_create(user=user)
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Enhanced JWT serializer that returns access, refresh, user information, and profile in one response.
    """
    def validate(self, attrs):
        data = super().validate(attrs)
        
        # Ensure profile exists
        profile, _ = Profile.objects.get_or_create(user=self.user)
        
        data["user"] = UserSerializer(self.user).data
        data["profile"] = ProfileSerializer(profile).data
        return data


class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True, write_only=True)
    new_password = serializers.CharField(required=True, write_only=True)

    def validate_new_password(self, value):
        validate_password(value)
        return value