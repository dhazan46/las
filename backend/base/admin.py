from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('desc', 'price', 'description', 'createdTime')
    fields = ('user', 'desc', 'price', 'description', 'videos', 'createdTime')
    readonly_fields = ('createdTime',)
