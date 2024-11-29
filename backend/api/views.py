from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, status
from .serializers import UserSerializer, LocationSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Location, Profile
from rest_framework.views import APIView
from rest_framework.response import Response
from django.contrib.auth.hashers import check_password
from rest_framework.parsers import MultiPartParser, FormParser
from django.conf import settings
from django.core.files.storage import default_storage
import os


class LocationListCreate(generics.ListCreateAPIView):
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Location.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class LocationDelete(generics.DestroyAPIView):
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Location.objects.filter(author=user)


class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
        except Profile.DoesNotExist:
            profile = None

        return Response({
            "id": user.id,
            "email": user.email,
            "date_joined": user.date_joined,
            "avatar": profile.avatar.url if profile and profile.avatar else None,
        })
    
    
class ChangePasswordView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        old_password = request.data.get("old_password")
        new_password = request.data.get("new_password")

        if not old_password or not new_password:
            return Response(
                {"error": "Both old and new passwords are required."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user = request.user
        if not user.check_password(old_password):
            return Response(
                {"error": "Old password is incorrect."},
                status=status.HTTP_400_BAD_REQUEST,
            )

        user.set_password(new_password)
        user.save()

        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
    

class AvatarUploadView(APIView):
    permission_classes = [IsAuthenticated]
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        user = request.user
        avatar = request.FILES.get('avatar')

        profile, created = Profile.objects.get_or_create(user=user)

        if profile.avatar:
            old_avatar_path = profile.avatar.path
            if os.path.isfile(old_avatar_path):
                default_storage.delete(profile.avatar.name)
                print(f"Deleted old avatar: {old_avatar_path}")

        if avatar:
            profile.avatar = avatar
            profile.save()
            return Response({"avatar": profile.avatar.url}, status=status.HTTP_200_OK)

        return Response({"error": "No avatar uploaded"}, status=status.HTTP_400_BAD_REQUEST)