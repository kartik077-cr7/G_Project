
from django.contrib import admin
from django.urls import path
from Grid import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('storeReview',views.storeReview,name="store Review"),
    path('storeIssue',views.storeIssue,name="store Issue"),

]
