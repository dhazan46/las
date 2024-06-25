from django.db import models
from django.contrib.auth.models import User

class Product(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    desc = models.CharField(max_length=50, null=True, blank=True)
    price = models.DecimalField(max_digits=5, decimal_places=2)
    createdTime = models.DateTimeField(auto_now_add=True)
    videos = models.FileField(upload_to='videos/', null=True, blank=True)
    description = models.TextField(null=True, blank=True)  # הוספת שדה התיאור

    def __str__(self):
        return self.desc

