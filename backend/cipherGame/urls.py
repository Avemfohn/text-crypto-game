from django.urls import path, include
from rest_framework import routers
from .viewsets import UserDataModelViewSet, MultiplayerGameDataModelViewSet, MachineGameDataModelViewSet, CiphertextViewSet

router = routers.DefaultRouter()
router.register('singleplayer', UserDataModelViewSet)
router.register('multiplayer', MultiplayerGameDataModelViewSet, basename='multiplayer')
router.register('machine', MachineGameDataModelViewSet, basename='machine')
router.register(r'ciphertexts', CiphertextViewSet, basename='ciphertext')

urlpatterns = [
    path('', include(router.urls)),
]
