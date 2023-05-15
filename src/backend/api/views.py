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

from .models import Room , User, CheckRoom
from .serializers import (
    RoomSerializer,
    TokenObtainPairSerializer,
    RegisterTokenSerializer,
    UsernameUniqueCheckSerializer,
    LoginSerializer,
    PasswordSerializer,
    MadeRoomSerializer,
    JoinRoomSerializer,
    CheckSerializer,
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
            return Response("Error detected.", status=status.HTTP_500_INTERNAL_SERVER_ERROR) # 
        
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
            return Response("아이디가 중복되었습니다.", status=status.HTTP_201_CREATED)
        

class AuthAPIView(APIView):
    
    permission_classes = [AllowAny]
    lookup_field = 'roomname'
    
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


class RoomViewSet(viewsets.ModelViewSet):
    """
    Rooms View
    """
    queryset = Room.objects.all().order_by("-created_on")
    serializer_class = RoomSerializer
    lookup_field = 'roomname'
    lookup_url_kwarg = 'roomname'

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

    def destroy(self, request, pk=None):

        """
        Checks whether user requesting a delete of the room is the owner of the room or not
        """
        room = get_object_or_404(Room, id=pk)

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
            room.save()
            return Response(serializer.data)
        else:
            return Response(
                {
                    "message": "잘못된 생성입니다."
                },
                status=status.HTTP_400_BAD_REQUEST
            )


    def retrieve(self, request, roomname=None):
        password = request.GET.get('password')

        try:
            instance = Room.objects.get(roomname=roomname)

            if instance.password == password and instance.roomname == roomname:
                """
                todo : 현재 유저 request.user -> instance의 room_users.append(request.user.username) 하기
                """
                room_users = instance.room_users
                if request.user.username not in room_users:
                    room_users.append(request.user.username)
                    instance.save()
                serialized_data = serialize('json', [instance])
                return HttpResponse(serialized_data, content_type="text/json-comment-filtered", status=status.HTTP_202_ACCEPTED)
            else:
                return Response(
                    {
                        "message": "비밀번호가 다릅니다.",
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

class UserMadeRoomAPIView(generics.ListCreateAPIView):
    """
    Return Rooms made by request.user
    """
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
    
        # By default list of rooms return
        queryset = Room.objects.filter(username__exact=self.request.user.username).order_by("-created_on")
        return queryset
    
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = MadeRoomSerializer(queryset, many=True)
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
        
        queryset = Room.objects.annotate(
            user_in_room=Concat(Value(','), 'room_users', Value(','), output_field=CharField()),
        ).filter(user_in_room__contains=desired_value)

        return queryset
           
    def list(self, request):
        # Note the use of `get_queryset()` instead of `self.queryset`
        queryset = self.get_queryset()
        serializer = JoinRoomSerializer(queryset, many=True, context={
            'request': request
        })
        return Response(serializer.data, status=status.HTTP_202_ACCEPTED)
    

class CheckAPIView(APIView):
    """
    출석 체크시에 유저를 True로 등록합니다.
    """

    def post(self, request):
        user = request.user

        today = date.today()

        roomname = request.query_params.get('roomname')
        room = Room.objects.get(roomname=roomname)

        # 오늘 생성된 출석 체크가 있는지
        check_room = CheckRoom.objects.filter(created_on=today, room=room).first()
        
        # 이미 오늘 생성된 인스턴스인 경우 업데이트 로직을 수행합니다.
        if check_room is not None:
            # 현재 user만 출석 체크하기
            user_dict = check_room.user_check
            user_dict[user.username] = True
            check_room.save()

            serializer = CheckSerializer(check_room)
            return Response(serializer.data, status=status.HTTP_202_ACCEPTED)

        # 오늘 생성되지 않은 경우 새로운 인스턴스를 생성합니다.
        else:
            new_check_room = CheckRoom(room=room, user_check={user.username:True})
            new_check_room.save()
        
            serializer = CheckSerializer(new_check_room)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    