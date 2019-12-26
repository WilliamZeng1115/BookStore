from rest_framework import routers
from django.urls import path, include

router = routers.DefaultRouter()
urlpatterns = router.urls
# urlpatterns.append(path('api/auth/logout', knox_views.LogoutView.as_view(), name='knox_logout'))
