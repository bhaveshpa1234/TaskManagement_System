from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils.timezone import now

from .models import Board
from .serializers import BoardSerializer

class BoardViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Board.objects.filter(owner=self.request.user).order_by('-last_viewed', '-id')

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user, last_viewed=now())

    @action(detail=True, methods=['post'], url_path='view')
    def mark_as_viewed(self, request, pk=None):
        try:
            board = self.get_queryset().get(pk=pk)
            board.last_viewed = now()
            board.save()
            return Response({'message': 'Board marked as last viewed'})
        except Board.DoesNotExist:
            return Response({'error': 'Board not found'}, status=404)
