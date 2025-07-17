from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import APIView
from account.serializers import UserRegistrationSerializer
from account.serializers import UserLoginSerializer
from django.contrib.auth import authenticate
from account.renderers import UserRenderer
from rest_framework_simplejwt.tokens import RefreshToken
from account.serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated
from account.serializers import UserChangePasswordSerializer
from account.serializers import SendPasswordResetEmailSerializer
from account.serializers import UserPasswordResetSerializer

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class UserRegistrationView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserRegistrationSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.save()
            token = get_tokens_for_user(user)
            return Response(
            {'token': token,'msg': 'User registered successfully'},
            status=status.HTTP_201_CREATED
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class UserLoginView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serializer = UserLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            email = serializer.validated_data['email']
            password = serializer.validated_data['password']
            user =authenticate(email=email, password=password)
            if user is not None:
                token = get_tokens_for_user(user)
                return Response({'token': token,'msg': 'User logged in successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'msg': 'Email or password is incorrect'}, status=status.HTTP_404_NOT_FOUND)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserProfileView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def get(self, request, format=None):
        serializer = UserProfileSerializer(request.user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserChangePasswordView(APIView):
    renderer_classes = [UserRenderer]
    permission_classes = [IsAuthenticated]
    def post(self, request, format=None):
        serializer = UserChangePasswordSerializer(data=request.data, context={'user': request.user})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password changed successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    

class SendPasswordResetEmailView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, format=None):
        serilaizer = SendPasswordResetEmailSerializer(data=request.data)
        if serilaizer.is_valid(raise_exception=True):
            return Response({'msg': 'Password reset link sent successfully'}, status=status.HTTP_200_OK)
        return Response(serilaizer.errors, status=status.HTTP_400_BAD_REQUEST)

class UserPasswordResetView(APIView):
    renderer_classes = [UserRenderer]
    def post(self, request, uid, token, format=None):
        serializer = UserPasswordResetSerializer(data=request.data, context={'uid': uid, 'token': token})
        if serializer.is_valid(raise_exception=True):
            return Response({'msg': 'Password reset successfully'}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)