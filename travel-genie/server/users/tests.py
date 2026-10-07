from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient
from rest_framework import status

class UserAuthTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.register_url = "/api/users/register/"
        self.login_url = "/api/token/"
        self.profile_url = "/api/users/profile/"
        self.me_url = "/api/users/me/"

    def test_successful_registration(self):
        payload = {
            "username": "ahmad_samadi",
            "email": "ahmad.samadi@kamair.com",
            "password": "StrongPassword123!",
            "first_name": "Ahmad",
            "last_name": "Samadi",
        }
        res = self.client.post(self.register_url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        self.assertIn("access", res.data)
        self.assertIn("refresh", res.data)
        self.assertEqual(res.data["user"]["username"], "ahmad_samadi")
        self.assertEqual(res.data["user"]["email"], "ahmad.samadi@kamair.com")

        # Verify DB user exists
        user = User.objects.get(username="ahmad_samadi")
        self.assertTrue(user.check_password("StrongPassword123!"))
        self.assertTrue(hasattr(user, "profile"))

    def test_duplicate_email_prevention(self):
        # Create first user
        User.objects.create_user(
            username="user_one",
            email="duplicate@kamair.com",
            password="StrongPassword123!"
        )

        # Attempt to register second user with same email
        payload = {
            "username": "user_two",
            "email": "DUPLICATE@kamair.com",
            "password": "StrongPassword123!",
        }
        res = self.client.post(self.register_url, payload, format="json")
        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("email", res.data)

    def test_login_with_username_and_email(self):
        user = User.objects.create_user(
            username="kam_passenger",
            email="passenger@kamair.com",
            password="SecurePass9988!"
        )

        # 1. Login with username
        res1 = self.client.post(self.login_url, {
            "username": "kam_passenger",
            "password": "SecurePass9988!",
        }, format="json")
        self.assertEqual(res1.status_code, status.HTTP_200_OK)
        self.assertIn("access", res1.data)
        self.assertIn("user", res1.data)

        # 2. Login with email
        res2 = self.client.post(self.login_url, {
            "username": "passenger@kamair.com",
            "password": "SecurePass9988!",
        }, format="json")
        self.assertEqual(res2.status_code, status.HTTP_200_OK)
        self.assertIn("access", res2.data)

    def test_protected_profile_and_me_endpoints(self):
        user = User.objects.create_user(
            username="secure_flyer",
            email="flyer@kamair.com",
            password="SecurePass9988!"
        )

        # Unauthorized access
        unauth_res = self.client.get(self.me_url)
        self.assertEqual(unauth_res.status_code, status.HTTP_401_UNAUTHORIZED)

        # Authorized access
        self.client.force_authenticate(user=user)
        auth_res = self.client.get(self.me_url)
        self.assertEqual(auth_res.status_code, status.HTTP_200_OK)
        self.assertEqual(auth_res.data["user"]["username"], "secure_flyer")
