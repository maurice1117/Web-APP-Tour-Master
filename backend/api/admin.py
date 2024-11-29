from django.contrib import admin
from .models import Location, Profile

@admin.register(Location)
class LocationAdmin(admin.ModelAdmin):
    list_display = ('id', 'place', 'author_username', 'created_at')
    list_filter = ('created_at', 'author')
    search_fields = ('place', 'description', 'photo1', 'photo2', 'photo3', 'author__username')
    ordering = ('-created_at',)

    def author_username(self, obj):
        return obj.author.username
    author_username.short_description = 'Author Username'
    def author_avatar(self, obj):
        return obj.author.profile.avatar.url if obj.author.profile.avatar else "No Avatar"
    author_avatar.short_description = 'Author Avatar'

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'avatar')
    search_fields = ('user__username',)
    list_filter = ('user',) 

    fieldsets = (
        (None, {
            'fields': ('user', 'avatar')
        }),
    )