from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as DjangoUserAdmin
from django.utils.translation import gettext_lazy as _

from .models import Room, User, Check, CheckUser


admin.site.register(User)
admin.site.register(Room)
admin.site.register(Check)
admin.site.register(CheckUser)