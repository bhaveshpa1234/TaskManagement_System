from rest_framework import serializers
from .models import Group
from task.serializers import TaskSerializer

class GroupSerializer(serializers.ModelSerializer):
    tasks = TaskSerializer(many=True, read_only=True)
    board = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Group
        fields = ['id', 'name', 'board', 'tasks', 'created_at']
