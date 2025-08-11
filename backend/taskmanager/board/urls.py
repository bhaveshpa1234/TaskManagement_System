
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BoardViewSet
from groups.views import GroupListCreateView  

router = DefaultRouter()
router.register(r'', BoardViewSet, basename='board')

urlpatterns = [
    path('', include(router.urls)),  
  
    path('<int:board_id>/groups/', GroupListCreateView.as_view(), name='board-groups'),
]
