import jwt

from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets, generics
from django.contrib.auth import authenticate
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.views import TokenObtainPairView as OriginalObtainPairView
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer, TokenRefreshSerializer
from group_call.settings import SECRET_KEY


from .models import Room , User
from .serializers import (
    RoomSerializer,
    TokenObtainPairSerializer,
    RegisterTokenSerializer,
    EmailUniqueCheckSerializer,
    UsernameUniqueCheckSerializer,
    LoginSerializer,
    PasswordSerializer
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
        id_serializer = UsernameUniqueCheckSerializer(data=request.data)
        
        # email 중복 체크
        email_serializer = EmailUniqueCheckSerializer(data=request.data)
           
        pwd_serializer = PasswordSerializer(data=request.data) 
              
        if pwd_serializer.validate_password(pwd=request.data.get("password")) == False:    
            return Response("비밀번호는 영어와 숫자를 포함해야 하며, 8글자 이상이어야 합니다.", status=status.HTTP_400_BAD_REQUEST)
              
              
        # ID 유효성 검증에 통과 했을 때, ID가 중복되지 않았을 때 
        if id_serializer.is_valid():
            # email 유효성 검증에 통과 했을 때, nickname이 중복되지 않았을 때 
            if email_serializer.is_valid():
                serializer = RegisterTokenSerializer(data=request.data)                        
                if serializer.is_valid(): 
                    user = serializer.save() 
                    if user:
                        json = serializer.data
                        return Response(json, status=status.HTTP_201_CREATED)
            
            # email 중복 되었을 때
            else:
                return Response("이미 존재하는 이메일입니다.", status=status.HTTP_400_BAD_REQUEST)

        # ID가 중복되었을 때 
        else:
            return Response("이미 존재하는 아이디입니다.", status=status.HTTP_400_BAD_REQUEST)

        return Response("오류가 발생하였습니다.", status=status.HTTP_400_BAD_REQUEST)


class AuthAPIView(APIView):
    
    permission_classes = [AllowAny]

    
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

    def get_queryset(self):

        # By default list of rooms return
        queryset = Room.objects.all().order_by("-created_on")

        # If search params is given then list matching the param is returned
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
