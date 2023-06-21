import jwt

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.db.models.functions import Concat
from django.db.models import Q, Value, CharField
from rest_framework import status, viewsets, generics
from django.contrib.auth import authenticate
from django.core.serializers import serialize
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView as OriginalObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from group_call.settings import SECRET_KEY
from datetime import date

from .models import Room , User, Check, RoomUsers, CheckUser
from .serializers import (
    RoomSerializer,
    TokenObtainPairSerializer,
    RegisterTokenSerializer,
    UsernameUniqueCheckSerializer,
    LoginSerializer,
    PasswordSerializer,
    MadeRoomSerializer,
    JoinRoomSerializer,
    RoomUserSerializer,
    CheckUserSerializer,
    GetUserSerializer
)


class TokenObtainPairView(OriginalObtainPairView):
    """
    Replacing old 'serializer_class' with modified serializer class
    """

    serializer_class = TokenObtainPairSerializer

# 회원가입 View
class RegisterAndObtainTokenView(APIView):

    """
    Register user. Only Post method is allowed
    """

    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, format="json"):

        # username 중복 체크
        #id_serializer = UsernameUniqueCheckSerializer(data=request.data)

        pwd_serializer = PasswordSerializer(data=request.data)

        if pwd_serializer.validate_password(pwd=request.data.get("password")) == False:
            return Response("비밀번호는 영어와 숫자를 포함해야 하며, 8글자 이상이어야 합니다.", status=status.HTTP_400_BAD_REQUEST)

        serializer = RegisterTokenSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors , status=status.HTTP_500_INTERNAL_SERVER_ERROR) #

        user = serializer.save()
        if not user:
            return Response("Error detected.", status=status.HTTP_500_INTERNAL_SERVER_ERROR) # not user

        json = serializer.data
        return Response(json, status=status.HTTP_201_CREATED)


class UsernameCheckAPIView(APIView):
    """
    Register user. Only Post method is allowed
    """

    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request, format="json"):

        # username 중복 체크
        serializer = UsernameUniqueCheckSerializer(data=request.data)

        if serializer.is_valid():
            json = serializer.data
            return Response(json, status=status.HTTP_201_CREATED)
        else:
            return Response("아이디가 중복되었습니다.", status=status.HTTP_400_BAD_REQUEST)


class AuthAPIView(APIView):

    permission_classes = [AllowAny]
    lookup_field = 'pk'

    # 유저 정보 확인
    def get(self, request):
        try:
            # access token을 decode 해서 유저 id 추출 => 유저 식별
            access = request.COOKIES['access']
            payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
            pk = payload.get('user_id')
            user = get_object_or_404(User, pk=pk)
            serializer = LoginSerializer(instance=user)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except(jwt.exceptions.ExpiredSignatureError):
            # 토큰 만료 시 토큰 갱신
            data = {'refresh': request.COOKIES.get('refresh', None)}
            serializer = TokenRefreshSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                access = serializer.data.get('access', None)
                refresh = serializer.data.get('refresh', None)
                payload = jwt.decode(access, SECRET_KEY, algorithms=['HS256'])
                pk = payload.get('user_id')
                user = get_object_or_404(User, pk=pk)
                serializer = LoginSerializer(instance=user)
                res = Response(serializer.data, status=status.HTTP_200_OK)
                res.set_cookie('access', access)
                res.set_cookie('refresh', refresh)
                return res
            raise jwt.exceptions.InvalidTokenError

        except(jwt.exceptions.InvalidTokenError):
            # 사용 불가능한 토큰일 때
            return Response(status=status.HTTP_400_BAD_REQUEST)

    # 로그인
    def post(self, request):
    	# 유저 인증
        user = authenticate(
            username=request.data.get("username"), password=request.data.get("password")
        )
        # 이미 회원가입 된 유저일 때
        if user is not None:
            serializer = LoginSerializer(user)
            # jwt 토큰 접근
            token = TokenObtainPairSerializer.get_token(user)
            refresh_token = str(token)
            access_token = str(token.access_token)
            res = Response(
                {
                    "user": serializer.data,
                    "message": "login success",
                    "token": {
                        "access": access_token,
                        "refresh": refresh_token,
                    },
                },
                status=status.HTTP_200_OK,
            )
            # jwt 토큰 => 쿠키에 저장
            res.set_cookie("access", access_token, httponly=True)
            res.set_cookie("refresh", refresh_token, httponly=True)
            return res
        else:
            return Response("아이디나 비밀번호를 잘못입력하였습니다.", status=status.HTTP_400_BAD_REQUEST)

    # 로그아웃
    def delete(self, request):
        # 쿠키에 저장된 토큰 삭제 => 로그아웃 처리
        response = Response({
            "message": "Logout success"
            }, status=status.HTTP_202_ACCEPTED)
        response.delete_cookie("access")
        response.delete_cookie("refresh")
        return response


class GetUserApiView(viewsets.ReadOnlyModelViewSet):
    """
    User View
    """
    serializer_class = GetUserSerializer
    lookup_field = 'userId'

    def retrieve(self, request, userId=None):
        user = User.objects.get(pk=userId)

        serializer = GetUserSerializer(user)

        return Response(serializer.data)

class RoomViewSet(viewsets.ModelViewSet):
    """
    Rooms View
    """
    queryset = Room.objects.all().order_by("-created_on")
    serializer_class = RoomSerializer
    lookup_field = 'roomId'
    lookup_url_kwarg = 'roomId'

    def get_queryset(self):

        # By default list of rooms return
        queryset = Room.objects.all().order_by("-created_on")

        # If search params is given then list matching the param is returned
        # 찾고자하는 방이 있었으면, 해당 방을 최신 생성순으로 리턴해준다.
        search = self.request.query_params.get("search", None)
        if search is not None:
            queryset = Room.objects.filter(title__icontains=search).order_by(
                "-created_on"
            )
        return queryset

    def get_permissions(self):
        """
        Instantiates and returns the list of permissions that this view requires.
        """
        # 만약 GET 요청일시 모두가 접근할 수 있게 하고 아니면 인증된 자만 접근될 수 있게 한다.
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def destroy(self, request, roomId=None):

        """
        Checks whether user requesting a delete of the room is the owner of the room or not
        """
        room = get_object_or_404(Room, roomId=roomId)

        if room:
            authenticate_class = JWTAuthentication()
            user, _ = authenticate_class.authenticate(request)
            if user.id == room.user.id:
                room.delete()
            else:
                return Response(
                    {
                        "message": "Either you are not logged in or you are not the owner of this room to delete"
                    },
                    status=status.HTTP_401_UNAUTHORIZED,
                )
        return Response({}, status=status.HTTP_204_NO_CONTENT)


    def create(self, request, *args, **kwargs):
        serializer = RoomSerializer(data=request.data, context={'request': request})

        if serializer.is_valid():
            room = serializer.save(user=request.user)
            room_users = RoomUsers(room=room, username=request.user.username)
            room_users.save()
            return Response(serializer.data)
        else:
            return Response(
                {
                    "message": "잘못된 생성입니다."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


    def retrieve(self, request, roomId=None):
        password = request.GET.get('password')

        try:
            instance = Room.objects.get(roomId=roomId)

            # 방 비밀번호와 아이디를 맞췄다면cccc
            if instance.password == password and instance.roomId == int(roomId):
                """
                todo : 현재 유저 request.user -> instance의 room_users.append(request.user.username) 하기
                """
                # 만약 이미 RoomUser가 있다면
                if RoomUsers.objects.filter(room=instance, username=request.user.username).exists():
                    roomusers = RoomUsers.objects.filter(room=instance)
                    serialize = RoomUserSerializer(roomusers, many=True)
                    return Response(serialize.data, status=status.HTTP_202_ACCEPTED)

                room_users = RoomUsers(room=instance, username=request.user.username)
                room_users.save()

                all_room_users = RoomUsers.objects.filter(room=instance)

                serialize= RoomUserSerializer(all_room_users, many=True)
                return Response(serialize.data, status=status.HTTP_202_ACCEPTED)

            # 방 비밀번호와 아이디를 맞추지 못했다면
            else:
                return Response(
                {
                    "1" : instance.password,
                    "2" : password,
                    "3" : instance.roomId,
                    "4" : roomId
                },
                    status=status.HTTP_401_UNAUTHORIZED
                )
        except Room.DoesNotExist:
            return Response(
                {
                    "message": "해당 아이디의 방을 찾을 수 없습니다.",
                },
                status=status.HTTP_404_NOT_FOUND
            )

class UserMadeRoomAPIView(generics.RetrieveAPIView):
    """
    Return Rooms made by request.user
    """
    queryset = Room.objects.all()
    serializer_class = MadeRoomSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
                
        roomId = self.kwargs.get('roomId')  # URL의 roomId 값을 가져옴

        # 현재 room만 가져온다.
        queryset = Room.objects.filter(roomId=roomId)
        
        if queryset.exists() and queryset.first().username == self.request.user.username:
            return queryset
        
        return Room.objects.none()  # 사용자가 소유한 room이 없을 경우 빈 쿼리셋 반환

    
    def retrieve(self, request, *args, **kwargs):

        queryset = self.get_queryset()
                
        if not queryset.exists():
            return Response("유저가 만든 방이 아닙니다.", status=status.HTTP_400_BAD_REQUEST)
        
        serializer = self.get_serializer(queryset, many=True) 
    
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    

class UserJoinRoomAPIView(generics.ListCreateAPIView):
    """
    Return Rooms made by request.user
    """
    queryset = Room.objects.all()
    serializer_class = JoinRoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        desired_value = self.request.user.username

        #  RoomUser filter중 현재 user 이름이 있는 RoomUser 객체를 불러와서 room 필드들 추출해서 해당 room 필드들 반환
        # __in 연산자를 사용하면 주어진 값의 리스트 또는 쿼리셋이 필터링할 필드에 포함되어 있는지 확인할 수 있습니다.
        queryset = Room.objects.filter(roomusers__in=RoomUsers.objects.filter(username=desired_value))
        return queryset

    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = JoinRoomSerializer(queryset, many=True, context={
            'request': request
        })
        
        if serializer is None:
            return Response("현재 접속한 방들이 없습니다.", status=status.H)

        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)


class CheckAPIView(APIView):
    """
    출석 체크시에 유저를 True로 등록합니다.
    """

    def post(self, request):
        today = date.today()

        roomId = request.query_params.get('roomId')
        room = Room.objects.get(roomId=roomId)

        # 오늘 생성된 출석 체크가 있는지
        is_exists = Check.objects.filter(created_on=today, room=room).exists()

        # 이미 오늘 생성된 인스턴스인 경우 CheckUser만 생성해줍니다.
        if is_exists:
            check_room = Check.objects.filter(created_on=today, room=room).first()

            # 현재 user만 출석 체크하기 -> 이미 출첵 한 유저면 ㄴㄴㄴ
            if not CheckUser.objects.filter(check_room=check_room, username=request.user.username).exists():
                check_user = CheckUser(check_room=check_room, username=request.user.username, is_check=True)
                check_user.save()

            check_user = CheckUser.objects.filter(check_room=check_room, username=request.user.username)
            serializer = CheckUserSerializer()
            serialized_data = serializer.to_representation(check_user)
            return Response(serialized_data, status=status.HTTP_202_ACCEPTED)

        # 오늘 생성되지 않은 경우 새로운 Check 인스턴스와 CheckUser 인스턴스를 생성합니다.
        else:
            new_check_room = Check(room=room)
            new_check_room.save()

            # 현재 user만 출석 체크하기
            check_user = CheckUser(check_room=new_check_room, username=request.user.username, is_check=True)
            check_user.save()

            serialize_check_user = CheckUser.objects.filter(check_room=new_check_room, username=request.user.username)
            serializer = CheckUserSerializer()
            serialized_data = serializer.to_representation(serialize_check_user)

            return Response(serialized_data, status=status.HTTP_202_ACCEPTED)


    def get(self, request):
        roomId = request.query_params.get('roomId')
        room = Room.objects.get(roomId=roomId)

        # 출석 체크들을 반환
        checks = Check.objects.filter(room=room)

        # 해당 출석 체크한 유저들을 반환
        check_users = CheckUser.objects.filter(check_room__in=checks)

        # check_users가 비어 있는 경우
        if not check_users.exists():
            return Response({"message": "No check users found."}, status=status.HTTP_204_NO_CONTENT)

        serializer = CheckUserSerializer()
        serialized_data = serializer.to_representation(check_users)

        return Response(serialized_data, status=status.HTTP_200_OK)