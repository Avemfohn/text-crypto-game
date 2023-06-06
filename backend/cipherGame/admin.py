from django.contrib import admin
from nested_inline.admin import NestedStackedInline, NestedModelAdmin
from .models import UserDataModel, ScoreModel
from django.utils.html import format_html


# Register your models here.

class ScoreInline(NestedStackedInline):
    model = ScoreModel
    extra = 1
    max_num = 10
    fk_name = 'user'

class UserDataAdmin(NestedModelAdmin):

    inlines = [ScoreInline]

    list_display = ('user',)
    list_filter = ['user']
    search_fields = ['user']


admin.site.register(UserDataModel, UserDataAdmin)


