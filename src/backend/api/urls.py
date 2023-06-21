from django.urls import path
from rest_framework import routers
from rest_framework_simplejwt.views import TokenRefreshView, TokenVerifyView

from .views import RegisterAndObtainTokenView, RoomViewSet, TokenObtainPairView, AuthAPIView, UsernameCheckAPIView, UserMadeRoomAPIView, UserJoinRoomAPIView, CheckAPIView, GetUserApiView



# Rooms url
router = routers.DefaultRouter(trailing_slash=False)
router.register(r"rooms", RoomViewSet)

urlpatterns = router.urls

# Authentications Urls
urlpatterns += [
    path("user/create", RegisterAndObtainTokenView.as_view(), name="create_user"),
    
    path("user/create/username", UsernameCheckAPIView.as_view(), name="check_username"),
    
    path("user", GetUserApiView.as_view()),

    # post - 로그인, delete - 로그아웃, get - 유저 정보
    path("user/login", AuthAPIView.as_view(), name="login_user"),
    
    path("rooms/<int:roomId>", RoomViewSet.as_view(actions = {'get': 'retrieve'})),
    
    path("search/room/<int:roomId>", UserMadeRoomAPIView.as_view(), name="user_made_room"),
    
    path("search/joined/room", UserJoinRoomAPIView.as_view(), name="user_join_room"),
    
    path("check/room", CheckAPIView.as_view(), name="user_check_room"),

    path("token", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("token/refresh", TokenRefreshView.as_view(), name="token_refresh"),
    path("token/verify", TokenVerifyView.as_view(), name="token_verify"),
]