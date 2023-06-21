from django.shortcuts import render
from django.core.paginator import Paginator
from django.http import JsonResponse, Http404
from .models import History, UserProfile, Persona
from .serializers import HistorySerializer, ChatLogReportSerializer, UserProfileSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import authenticate
from django.contrib.auth import logout as logout_django
from django.contrib.auth import login as login_django
from django.core.exceptions import ValidationError
from django.core.validators import validate_email
from django.contrib.auth.models import User
from django.contrib.auth.hashers import check_password
import json
import re

#### 히스토리페이지에서 사용되는 API#### -> 서준호

# 1. GET /history/
# 최신 순으로 10개씩 로드, 
# query parameter로 page를 받아서 해당 페이지의 10개를 로드
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_history(request):
    page_number = request.GET.get('page', 1) # 기본값 1
    history_items = History.objects.filter(user=request.user).order_by('-date') # 최신순
    paginator = Paginator(history_items, 10)  # Paginator 객체

    try:
        items = paginator.page(page_number)
    except:
        raise Http404('Page not found')

    serializer = HistorySerializer(items, many=True)

    return JsonResponse(serializer.data, safe=False)
    
# 2. /history/bookmarked/
# 북마크한 히스토리만 로드
# 최신 순으로 10개씩 로드
# query parameter로 page를 받아서 해당 페이지의 10개를 로드
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def list_bookmarked_history(request):
    page_number = request.GET.get('page', 1)
    history_items = History.objects.filter(user=request.user, bookmark=True).order_by('-date')
    paginator = Paginator(history_items, 10)

    try:
        items = paginator.page(page_number)
    except:
        raise Http404('Page not found')

    serializer = HistorySerializer(items, many=True)
    
    return JsonResponse(serializer.data, safe=False)

# 3. /history/<int:history_id>/
@api_view(['GET', 'DELETE'])
@permission_classes([IsAuthenticated])
def detail_or_delete_history(request, history_id):
    # pk를 확인해서 없으면 404 에러
    try:
        history = History.objects.get(id=history_id, user=request.user)
    except History.DoesNotExist:
        raise Http404('History does not exist')
    
    # GET, detail 기능
    if request.method == 'GET':
        serializer = ChatLogReportSerializer(history)
        return JsonResponse(serializer.data)
    
    # DELETE, 삭제 기능
    if request.method == 'DELETE':
        history.delete()
        return JsonResponse({}, status=200)
    
# 4. /history/<int:history_id>/bookmark/
# 북마크 기능
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def bookmark_history(request, history_id):
    # pk를 확인해서 없으면 404 에러
    try:
        history = History.objects.get(id=history_id, user=request.user)
    except History.DoesNotExist:
        raise Http404('History does not exist')
    
    # 북마크 기능
    if request.method == 'POST':
        history.bookmark = not history.bookmark # True <-> False
        history.save()
        
        return JsonResponse({}, status=200)
    
    
#### 프로필 페이지에서 사용되는 API ####

# 1. GET, POST, DELETE /profile/
@api_view(['GET', 'POST', 'DELETE'])
@permission_classes([IsAuthenticated])
def profile(request):
    user_profile = request.user.userprofile

    # 1-1 GET request: 유저 프로필 정보 로드
    if request.method == 'GET':
        user_profile_serializer = UserProfileSerializer(user_profile)
        return JsonResponse(user_profile_serializer.data, safe=False)
    
    # 1-2 POST request: 유저 프로필 정보 수정
    # 수정할 정보 : real_name, email, password
    elif request.method == 'POST':
        # real_name
        real_name = request.data.get('real_name')
        if real_name:
            user_profile.real_name = real_name

        # email
        email = request.data.get('email')
        if email:
            # 이메일 형식 검사
            try:
                validate_email(email)
            except ValidationError:
                return JsonResponse({"error": "Invalid email format."}, status=400)
                
            user_profile.user.email = email
            user_profile.user.save()

        # password
        password = request.data.get('password')
        if password:
            user_profile.user.set_password(password)
            user_profile.user.save()
            logout(request) 

        user_profile.save()
        return JsonResponse({}, status=200)
    
    # 1-3 DELETE request: 유저 계정 삭제
    elif request.method == 'DELETE':
        logout(request)
        user_profile.user.delete()
        return JsonResponse({}, status=204)

    
# 3. POST /profile/image/
# 유저 프로필 이미지 수정
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def update_profile_image(request):
    user_profile = request.user.userprofile
    
    # image
    image = request.FILES.get('image')
    if image:
        user_profile.profile_image = image
    
    user_profile.save()
    
    return JsonResponse({}, status=200)


#### 로그인, 로그아웃, 회원가입 API ####

# 1. POST /signup/
# 회원가입
@api_view(['POST'])
def signup(request):
    username = request.data.get('username')
    password = request.data.get('password')
    email = request.data.get('email')
    real_name = request.data.get('real_name')
    
    # username 중복 검사
    if User.objects.filter(username=username).exists():
        return JsonResponse({"error": "Username already exists."}, status=400)
    
    # email 형식 검사
    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"error": "Invalid email format."}, status=400)
    
    # password 길이 검사
    # 1. 대소문자, 숫자 포함
    # 2. 8자 이상
    # 3. 16자 이하

    if len(password) < 8 or len(password) > 16:
        return JsonResponse({"error": "Password must be between 8 and 16 characters."}, status=400)

    if not re.search('[a-z]', password) or not re.search('[0-9]', password):
        return JsonResponse({"error": "Password must include uppercase or lowercase, and numbers."}, status=400)
    
    if not (username and password and email and real_name):
        return JsonResponse({"error": "All blanks must be filled completely."}, status=400)
    
    # 회원가입
    user = User.objects.create_user(username=username, password=password, email=email)
    user.save()
    
    user_profile = UserProfile.objects.create(user=user, real_name=real_name)
    user_profile.save()
    
    return JsonResponse({}, status=200)

# 2. POST /login/
# 로그인
@api_view(['POST'])
def login(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # username, password 검사
    user = authenticate(username=username, password=password)
    if user is None:
        return JsonResponse({"error": "Invalid username or password."}, status=400)

    # 로그인
    login_django(request, user)
    
    # 히스토리 리스트
    history_items = History.objects.filter(user=request.user).order_by('-date')[:5]
    history_serializer = HistorySerializer(history_items, many=True)
    
    # 북마크 히스토리 리스트
    bookmarked_history_items = History.objects.filter(user=request.user, bookmark=True).order_by('-date')[:5]
    bookmarked_history_serializer = HistorySerializer(bookmarked_history_items, many=True)
    
    # 유저 프로필 정보
    user_profile = request.user.userprofile
    user_profile_serializer = UserProfileSerializer(user_profile)
    
    return JsonResponse({
        'history': history_serializer.data,
        'bookmarked_history': bookmarked_history_serializer.data,
        'user_profile': user_profile_serializer.data,
    }, status=200)

# 3. POST /logout/
# 로그아웃
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):
    # 로그아웃
    logout_django(request)
    
    return JsonResponse({}, status=200)

# 4. POST /find_id/
# 아이디 찾기
@api_view(['POST'])
def find_id(request):
    email = request.data.get('email')
    password = request.data.get('password')
    
    # email 형식 검사
    try:
        validate_email(email)
    except ValidationError:
        return JsonResponse({"error": "Invalid email format."}, status=400)
    
    # email에 해당하는 유저 검사
    user = User.objects.filter(email=email)
    if not user.exists():
        return JsonResponse({"error": "이메일을 다시 확인해주세요"}, status=400)

    user = user.first()
    
    # 비밀번호 검사
    if not check_password(password, user.password):
        return JsonResponse({"error": "비밀번호를 다시 확인해주세요"}, status=400)
    
    # 유저 아이디 반환
    return JsonResponse({"username": user.username}, status=200)

# 5. POST /find_password/
# 비밀번호 찾기
@api_view(['POST'])
def find_password(request):
    username = request.data.get('username')
    email = request.data.get('email')
    
    # username과 email이 일치하는 유저 검사
    user = User.objects.filter(username=username, email=email)
    if not user.exists():
        return JsonResponse({"error": "아이디와 이메일을 다시 확인해주세요"}, status=400)
    
    # 임시 비밀번호 생성
    temp_password = User.objects.make_random_password()
    user[0].set_password(temp_password)
    user[0].save()
    
    return JsonResponse({"temp_password": temp_password}, status=200)


# test 더미 데이터 생성API
@api_view(['POST'])
def create_dummy_data(request):
    if request.method == "POST":
        for i in range(1, 151):
            user = User.objects.get(pk=2)  
            persona = Persona.objects.get(pk=1)  

            bookmark = True if i % 3 == 0 else False

            chat_log = [{"role": f"str{i}", "content": f"str{i}"}, {"role": f"str{i+1}", "content": f"str{i+1}"}]
            report = {"summary": f"str{i}","good": f"str{i+1}", "bad": f"str{i+2}","overall": f"str{i+3}"}

            History.objects.create(user=user, persona=persona, chat_log=chat_log, report=report, bookmark=bookmark)

        return JsonResponse({"message": "Dummy data created!"}, status=201)

    else:
        return JsonResponse({"error": "Invalid method"}, status=400)           