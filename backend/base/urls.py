from django.contrib import admin
from django.urls import path
from django.views.static import serve
from django.conf import settings
from . import views
from django.conf.urls.static import static
from .views import  index, members, register, CustomTokenObtainPairView
from .views import ProductDetailView
from .views import profile_view  # היבוא של ה-view שלך
from .views import recommend_course


urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', CustomTokenObtainPairView.as_view(), name='login'),
    path('members/', members, name='members'),
    path('register/', register, name='register'),
    path('api/product/<int:pk>/', ProductDetailView.as_view(), name='product-detail'),
    path('api/user/profile/', profile_view, name='profile'),  # הוספת הנתיב ל-view
    path('api/recommend_course/', recommend_course, name='recommend_course'),



]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
