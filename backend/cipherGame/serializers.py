from django.core.exceptions import ObjectDoesNotExist
from rest_framework import serializers
from drf_spectacular.extensions import OpenApiSerializerFieldExtension
from drf_spectacular.settings import spectacular_settings
from drf_extra_fields.relations import PresentablePrimaryKeyRelatedField
from .models import UserDataModel, ScoreModel,Ciphertext, MultiplayerGameDataModel, MachineGameDataModel
from drf_writable_nested import WritableNestedModelSerializer

class PresentablePrimaryKeyRelatedFieldSchemaExtension(OpenApiSerializerFieldExtension):
    target_class = PresentablePrimaryKeyRelatedField

    def map_serializer_field(self, auto_schema, direction):
        if direction == "response" and spectacular_settings.COMPONENT_SPLIT_REQUEST:

            return auto_schema._map_serializer_field(
                self.target.presentation_serializer, direction, bypass_extensions=True
            )
        else:
            return auto_schema._map_serializer_field(
                self.target, direction, bypass_extensions=True
            )


class CreatableSlugRelatedField(serializers.SlugRelatedField):
    def to_internal_value(self, data):
        try:
            return self.get_queryset().get(**{self.slug_field: data})
        except ObjectDoesNotExist:
            return self.get_queryset().create(**{self.slug_field: data})  # to create the object
        except (TypeError, ValueError):
            self.fail('invalid')

class ScoreSerializer(serializers.ModelSerializer):
    score = serializers.IntegerField(required=False)
    time = serializers.IntegerField(required=False)
    date = serializers.DateField(required=False)
    class Meta:
        model = ScoreModel
        exclude = ('user',)

class UserDataSerializer(serializers.ModelSerializer):
    rows = ScoreSerializer(many=True)

    def create(self, validated_data):
        rows_data = validated_data.pop('rows')
        user = UserDataModel.objects.create(**validated_data)
        for row_data in rows_data:
            ScoreModel.objects.create(user=user, **row_data)
        return user

    class Meta:
        model = UserDataModel
        fields = '__all__'


class MultiplayerGameDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MultiplayerGameDataModel
        fields = '__all__'

    def create(self, validated_data):
        return MultiplayerGameDataModel.objects.create(**validated_data)


class MachineGameDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = MachineGameDataModel
        fields = '__all__'

    def create(self, validated_data):
        return MachineGameDataModel.objects.create(**validated_data)


class CiphertextSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ciphertext
        fields = '__all__'


# class UserDataSerializer(WritableNestedModelSerializer):
#     rows = ScoreSerializer(many=True)
#
#     class Meta:
#         model = UserDataModel
#         fields = '__all__'

# class UserDataSerializer(WritableNestedModelSerializer):
#     user = serializers.CharField()
#     rows = ScoreSerializer(many=True)
#
#     def create(self, validated_data):
#         rows_data = validated_data.pop('rows')
#         user_data = validated_data.pop('user')
#         user, _ = UserDataModel.objects.get_or_create(user=user_data)
#         for row_data in rows_data:
#             ScoreModel.objects.create(user=user, **row_data)
#         return user
#
#     class Meta:
#         model = UserDataModel
#         fields = ['id', 'user', 'rows']

