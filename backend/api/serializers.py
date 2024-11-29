from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Location


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password", "email"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user


class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ["id", "place", "description", "photo1", "photo2", "photo3", "created_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}