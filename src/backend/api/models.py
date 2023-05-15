from django.conf import settings
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models
from django.db.models import CharField
from django.utils.translation import gettext_lazy as _
from django_mysql.models import ListCharField
from jsonfield import JSONField
from datetime import date

class UserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    use_in_migrations = True

    def _create_user(self, username, password, **extra_fields):
        """Create and save a User with the given email and password."""
        if not username:
            raise ValueError("The given username must be set")
        #email = self.normalize_email(email)
        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, password=None, **extra_fields):
        """Create and save a regular User with the given email and password."""
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username, password, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(username, password, **extra_fields)


class User(AbstractUser):
    """User model."""
    # username과 password는 기본 구현되어있음.
    username = models.CharField(max_length=10, unique=True)
    email = models.EmailField(_("email address"))
    nickname = models.CharField(max_length= 10, blank=False)

    USERNAME_FIELD = "username"
    
    objects = UserManager()


class Room(models.Model):

    """
    Room Model for group calling
    """
    
    # 방 이름, 방 비밀번호, 방을 만든 유저 이름, 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    username = models.CharField(max_length=20, blank=False)
    title = models.CharField(max_length=200, blank=False)
    room_users = ListCharField(
        base_field=CharField(max_length=10),
        size = 6,
        max_length=(6*11)
    )
    roomname = models.CharField(max_length=20, blank=False, unique=True, primary_key=True)
    password = models.CharField(max_length=15, blank=False)
    description = models.TextField(default="")
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

    def save(self, *args, **kwargs):
        self.username = self.user.username
        
        super().save(*args, **kwargs)
     
        
class CheckRoom(models.Model):
    user_check = JSONField(default=dict)
    created_on = models.DateField(default=date.today)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)