from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework import serializers, status, generics
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.models import User, Group
from .models import Product

# Serializer for the Product model
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'

# Serializer for the User model
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email']

        
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
import random

@csrf_exempt
def recommend_course(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        interests = data.get('interests')
        experience_level = data.get('experienceLevel')
        goals = data.get('goals')
        weekly_time = data.get('weeklyTime')
        pace_preference = data.get('pacePreference')

        # לוגיקה לעיבוד ההמלצה - דוגמה להמלצה אקראית לפי האינטרסים שהתקבלו
        courses = {
            'Programming': ['Introduction to Python', 'JavaScript Fundamentals', 'Java Basics'],
            'Data Science': ['Data Analysis with Python', 'Machine Learning Foundations', 'SQL for Data Science'],
            'Design': ['Introduction to UX/UI Design', 'Graphic Design Essentials', 'Web Design Principles'],
            'Business': ['Introduction to Business Management', 'Marketing Fundamentals', 'Entrepreneurship 101'],
            'Language Learning': ['Spanish for Beginners', 'French Conversation Practice', 'Japanese Language Essentials']
        }

        if interests in courses:
            recommended_course = random.choice(courses[interests])
        else:
            recommended_course = "General Introduction Course"

        return JsonResponse({'recommended_course': recommended_course})
    
    return JsonResponse({'error': 'Invalid request'}, status=400)

# View to register a new user
@api_view(['POST'])
def register(request):
    user = User.objects.create_user(
                username=request.data['username'],
                email=request.data['email'],
                password=request.data['password']
            )
    user.is_active = True
    user.is_staff = True
    user.save()
    return Response("new user born")

# View to return authenticated user profile
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):
    user_data = {
        'username': request.user.username,
        'email': request.user.email,
    }
    return Response(user_data)

# JWT Token customization to include username
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['username'] = user.username  # Add the username to the token
        return token

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

# Generic view to handle product details with permission
class ProductDetailView(generics.RetrieveAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]

# API View for products with permission handling
class ProductsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        product = Product.objects.get(pk=pk)
        serializer = ProductSerializer(product, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        product = Product.objects.get(pk=pk)
        product.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# Basic test views to ensure the API is working
@api_view(['GET'])
def index(request):
    return Response({'done': 'workin'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def members(request):
    return Response('members only - yaya')

