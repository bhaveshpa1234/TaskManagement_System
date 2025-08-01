from django.db import models
from board.models import Board
from groups.models import Group

STATUS_CHOICES = (
    ('To do', 'To do'),
    ('In progress', 'In progress'),
    ('Done', 'Done'),
)

PRIORITY_CHOICES = (
    (1, '★☆☆'),
    (2, '★★☆'),
    (3, '★★★'),
)

class Task(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='To do')
    board = models.ForeignKey(Board, on_delete=models.CASCADE, related_name='tasks')
    priority = models.IntegerField(choices=PRIORITY_CHOICES, default=1)
    group = models.ForeignKey(Group, on_delete=models.CASCADE,related_name='tasks',
    null=True,blank=True)
    due_date = models.DateTimeField(null=True,blank=True)


    def __str__(self):
        return self.name
