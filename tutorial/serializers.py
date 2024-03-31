from rest_framework import serializers
from .models import *

class DrinkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drink
        fields = ['id','name','description']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','name','image','city','country','email','password','followers','following','posts','liked']

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','title','image','body','author_id','date_time','likes','comments']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ['id','body','date_time','author_id','likes']