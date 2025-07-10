from django.db import models
from django.contrib.auth.models import User
# Create your models here.


class Board(models.Model):
    name = models.CharField(max_length=30, unique=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE,related_name="boards")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Card(models.Model):
    board = models.ForeignKey(Board, on_delete=models.CASCADE)
    title = models.CharField(max_length=30)
    description = models.TextField()
    status = models.CharField(max_length=30)
    choices=(
        ('To do', 'To do'),
        ('In progress', 'In progress'),
        ('Done', 'Done'),
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    

    def __str__(self):
        return self.title