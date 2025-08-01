from rest_framework import serializers
from .models import Board

class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ['id', 'name', 'owner', 'last_viewed']  
        read_only_fields = ['owner', 'last_viewed','created_at','updated_at']       
