from collections import defaultdict

from django.contrib.auth import authenticate
from django.contrib.auth.password_validation import validate_password
from rest_framework.authtoken.models import Token
from django.contrib.auth.password_validation import (
    validate_password as original_pwd_validate,
)
from rest_framework import serializers
from rest_framework_simplejwt.serializers import (
    TokenObtainPairSerializer as OriginalObtainPairSerializer,
)

from rest_framework.validators import UniqueValidator

from .models import Room, User, Check, RoomUsers


# Get Token을 위한 Serializer
class TokenObtainPairSerializer(OriginalObtainPairSerializer):
    """
    Custom Token pair generator, Added full_name field to tokens to access it on a frontend
    """

    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        return token


# 회원가입을 할 때 토큰을 생성하는 Serializer
class RegisterTokenSerializer(serializers.ModelSerializer):
    """
    User registers through this serializer an receive tokens for authentication
    """

    token = serializers.SerializerMethodField("getting_token", read_only=True)

    def getting_token(self, user):
        refresh = TokenObtainPairSerializer.get_token(user)
        return {
            "refresh": str(refresh),
            "access": str(refresh.access_token),
        }

    class Meta:
        model = User
        fields = ("username", "email", "nickname", "password", "token")

    def create(self, validated_data):
        instance = self.Meta.model.objects.create_user(**validated_data)
        return instance


# 로그인 Serializer
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required = True)
    # write_only를 통해서 서버 -> 클라이언트 방향의 직렬화를 방지하여 보안 UP
    password = serializers.CharField(required = True)

    def validate(self, data):
        user = authenticate(**data)
        if user:
            token = Token.objects.get(user=user)
            return {"token":token, "User":User.objects.get(username=user.username)}         
        raise serializers.ValidationError(
            {"error": "Unable to log in"}
        )


# username 필드가 유일하다는 것을 확인하는 Serailizer
class UsernameUniqueCheckSerializer(serializers.ModelSerializer):
    username = serializers.CharField(required=True, min_length=3, max_length=30, validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('username',)

 
# 비밀번호를 정의하는 Serializer
class PasswordSerializer(serializers.Serializer):
    password = serializers.CharField(required = True)
    
    # Validates the password with django password validation
    def validate_password(self, pwd):
        
        import re

        pattern = re.compile(r'^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{8,}$')

        return bool(pattern.match(pwd))

            
class RoomSerializer(serializers.ModelSerializer):

    """
    Room Serializer
    """
    
    user = serializers.PrimaryKeyRelatedField(read_only=True, default=serializers.CurrentUserDefault())    
    username = serializers.CharField(read_only=True)

    created_on = serializers.DateTimeField(
        format="%a %I:%M %p, %d %b %Y", required=False
    )

    class Meta:
        model = Room
        fields = [
            "user",
            "username",
            "title",
            "password",
            "created_on"
            ]
        

class RoomUserSerializer(serializers.ModelSerializer):
    """
    User In Room Serializer
    """
    class Meta:
        model = RoomUsers
        fields = [
            "room",
            "username"
            ]
        
class MadeRoomSerializer(serializers.ModelSerializer):
    
    """
    User made Room Serializer
    """

    class Meta:
        model = Room
        fields = [
            "roomId",
            "user",
            "username",
            "title",
            "password",
            "created_on"
            ]


class JoinRoomSerializer(serializers.ModelSerializer):
    
    is_admin = serializers.SerializerMethodField()
    
    """
    User join Room Serializer
    """

    class Meta:
        model = Room
        fields = [
            "roomId",
            "title",
            "username",
            "is_admin"
            ]
        
    def get_is_admin(self, obj):
        
        # context는 시리얼라이저가 초기화될 때 전달되는 딕셔너리입니다. 따라서 context를 통해 현재 로그인한 사용자 정보를 전달할 수 있습니다.
        request = self.context.get('request')
        
        if obj.username == request.user.username:
            return True
    
        return False
        
class CheckSerializer(serializers.ModelSerializer):
   class Meta:
       model = Check
       fields = '__all__'


class CheckUserSerializer(serializers.Serializer):
    date = serializers.DateField()
    attend = serializers.ListField(child=serializers.DictField())

    def to_representation(self, instance):
        check_users = defaultdict(list)
        
        # check_users를 date별로 그루핑
        for check_user in instance:
            check_users[check_user.check_room.created_on].append({
                "name": check_user.username,
                "is_check": check_user.is_check
            })
        
        # 직렬화된 데이터 생성
        serialized_data = []
        for date, attend in check_users.items():
            serialized_data.append({
                "date": date.strftime("%d-%m-%y"),
                "attend": attend
            })
        
        return serialized_data