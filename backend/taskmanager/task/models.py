from django.db import models
from board.models import Board

STATUS_CHOICES = (
    ('To do', 'To do'),
    ('In progress', 'In progress'),
    ('Done', 'Done'),
)

class Task(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='To do')
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='tasks')

    def __str__(self):
        return self.name
