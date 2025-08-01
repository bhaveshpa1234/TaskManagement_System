# board/urls.py

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BoardViewSet
from groups.views import GroupListCreateView  # ✅ Import the view from the group app

router = DefaultRouter()
router.register(r'', BoardViewSet, basename='board')

urlpatterns = [
    path('', include(router.urls)),  # this handles /board/ routes
    
    # ✅ Add nested group endpoint here
    path('<int:board_id>/groups/', GroupListCreateView.as_view(), name='board-groups'),
]
