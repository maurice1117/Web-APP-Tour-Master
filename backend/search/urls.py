from django.contrib import admin
from django.urls import path
from .views import *

urlpatterns = [
    path('location', handle_location),
    path('attraction', handle_attraction),
    path('delete-response-file', delete_response_file),
]
