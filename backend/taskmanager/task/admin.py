from django.contrib import admin
from .models import Task

@admin.register(Task)
class BoardAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description','status','board','priority','group','due_date')
    search_fields = ('id', 'name')