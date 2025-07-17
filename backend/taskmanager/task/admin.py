from django.contrib import admin
from .models import Task

@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'status', 'board')
    list_filter = ('status', 'board')
    search_fields = ('name',)
