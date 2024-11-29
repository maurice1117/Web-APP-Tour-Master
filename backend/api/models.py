from django.db import models
from django.contrib.auth.models import User

class Location(models.Model):
    place = models.CharField(max_length=100)
    description = models.TextField()
    photo1 = models.URLField(max_length=500, blank=True, null=True)
    photo2 = models.URLField(max_length=500, blank=True, null=True)
    photo3 = models.URLField(max_length=500, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="locations")

    def __str__(self):
        return self.place
