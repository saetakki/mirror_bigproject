# views.py

from rest_framework import viewsets
from .models import Book
from .serializers import BookSerializer
from rest_framework import permissions

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
    permission_classes = [permissions.AllowAny]
