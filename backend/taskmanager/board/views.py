from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Board
from .serializers import BoardSerializer

class BoardViewSet(viewsets.ModelViewSet):
    serializer_class = BoardSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Board.objects.filter(owner=self.request.user)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
