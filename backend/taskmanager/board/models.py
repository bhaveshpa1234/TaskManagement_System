from django.db import models
from account.models import User

class Board(models.Model):
    name = models.CharField(max_length=100)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='boards')

    def __str__(self):
        return self.name
