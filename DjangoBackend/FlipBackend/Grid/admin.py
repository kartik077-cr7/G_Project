from django.contrib import admin

# Register your models here.

from .models import Issues,Review

admin.site.register(Issues)
admin.site.register(Review)