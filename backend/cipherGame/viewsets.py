
from collections import OrderedDict

from rest_framework import viewsets, filters
from rest_framework.pagination import LimitOffsetPagination
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import UserDataModel, Ciphertext, MultiplayerGameDataModel, MachineGameDataModel
from .serializers import UserDataSerializer, CiphertextSerializer, MultiplayerGameDataSerializer, MachineGameDataSerializer
from .utils import CiphertextSolver


class CustomLimitOffsetPagination(LimitOffsetPagination):

    def get_paginated_response(self, data):
        return Response(OrderedDict([
            ('count', self.count),
            ('current_page', self.offset // self.limit + 1),
            ('offset', self.offset),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link()),
            ('results', data)
        ]))

    def get_paginated_response_schema(self, schema):
        return {
            'type': 'object',
            'properties': {
                'current_page': {
                    'type': 'integer',
                    'example': 123,
                },
                'offset': {
                    'type': 'integer',
                    'example': 123,
                },
                'count': {
                    'type': 'integer',
                    'example': 123,
                },
                'next': {
                    'type': 'string',
                    'nullable': True,
                    'format': 'uri',
                    'example': 'http://api.example.org/accounts/?{offset_param}=400&{limit_param}=100'.format(
                        offset_param=self.offset_query_param, limit_param=self.limit_query_param),
                },
                'previous': {
                    'type': 'string',
                    'nullable': True,
                    'format': 'uri',
                    'example': 'http://api.example.org/accounts/?{offset_param}=200&{limit_param}=100'.format(
                        offset_param=self.offset_query_param, limit_param=self.limit_query_param),
                },
                'results': schema,
            },
        }


class UserDataModelViewSet(viewsets.ModelViewSet):
    queryset = UserDataModel.objects.all()
    serializer_class = UserDataSerializer
    pagination_class = CustomLimitOffsetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']

class MultiplayerGameDataModelViewSet(viewsets.ModelViewSet):
    queryset = MultiplayerGameDataModel.objects.all()
    serializer_class = MultiplayerGameDataSerializer
    pagination_class = CustomLimitOffsetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']

class MachineGameDataModelViewSet(viewsets.ModelViewSet):
    queryset = MachineGameDataModel.objects.all()
    serializer_class = MachineGameDataSerializer
    pagination_class = CustomLimitOffsetPagination
    filter_backends = [filters.SearchFilter]
    search_fields = ['username', 'email', 'first_name', 'last_name']

class CiphertextViewSet(viewsets.ModelViewSet):
    queryset = Ciphertext.objects.all()
    serializer_class = CiphertextSerializer

    def solve_ciphertext(self, ciphertext):
        # Your existing code to solve the ciphertext
        plaintext = CiphertextSolver.solve_ciphertext(ciphertext)
        return plaintext

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        ciphertext = serializer.validated_data['text']
        plaintext = self.solve_ciphertext(ciphertext)
        serializer.validated_data['text'] = plaintext
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)