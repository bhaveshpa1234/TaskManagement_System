from django.contrib import admin
from .models import Board

@admin.register(Board)
class BoardAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'owner')
    search_fields = ('name', 'owner__email')
