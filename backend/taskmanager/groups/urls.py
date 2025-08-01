from django.urls import path
from .views import GroupListCreateView
from .views import GroupRetrieveUpdateDestroyView

urlpatterns = [
    path('board/<int:board_id>/groups/', GroupListCreateView.as_view(), name='board-groups'),
    path('<int:pk>/', GroupRetrieveUpdateDestroyView.as_view(), name='group-detail'),
]
