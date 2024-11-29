from django.contrib import admin
from .models import Location

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'place', 'author_username', 'created_at')
    list_filter = ('created_at', 'author')
    search_fields = ('place', 'description', 'photo1', 'photo2', 'photo3', 'author__username')
    ordering = ('-created_at',)

    def author_username(self, obj):
        return obj.author.username
    author_username.short_description = 'Author Username'