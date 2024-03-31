from django.http import JsonResponse
from .models import *
from .serializers import *
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status


def index(req, res, next):
    res.header('X-Total-Count', 'X-Custom-Header')
    next() 


# Drinks
@api_view(['GET', 'POST'])
def drink_list(request, format=None):

    if request.method == 'GET':
        # Get all the drinks
        drinks = Drink.objects.all()
        # Serialize them
        serializer = DrinkSerializer(drinks, many=True)
        # Return json 
        return Response(serializer.data) 
    
    if request.method == 'POST':
        # Serialize the object
        serializer = DrinkSerializer(data=request.data)
        # Save the serialized object
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        

@api_view(['GET','PUT','DELETE'])
def drink_detail(request, id, format=None):

    try:
        # pk = Primary key
        drink = Drink.objects.get(pk = id)
    except Drink.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DrinkSerializer(drink)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = DrinkSerializer(drink, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        drink.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
    
# Users
@api_view(['GET', 'POST'])
def user_list(request, format=None):

    if request.method == 'GET':
        # Get all the users
        users = User.objects.all()
        # Serialize them
        serializer = UserSerializer(users, many=True)
        # Return json 
        return Response(serializer.data) 
    
    if request.method == 'POST':
        # Serialize the object
        serializer = UserSerializer(data=request.data)
        # Save the serialized object
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
@api_view(['GET','PUT','DELETE'])
def user_detail(request, id, format=None):

    try:
        # pk = Primary key
        user = User.objects.get(pk = id)
    except User.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserSerializer(user)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
        

# Posts
@api_view(['GET', 'POST'])
def post_list(request, format=None):

    if request.method == 'GET':
        # Get all the posts
        posts = Post.objects.all()
        # Serialize them
        serializer = PostSerializer(posts, many=True)
        # Return json 
        return Response(serializer.data) 
    
    if request.method == 'POST':
        # Serialize the object
        serializer = PostSerializer(data=request.data)
        # Save the serialized object
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.error_messages, status=status.HTTP_406_NOT_ACCEPTABLE)
        
@api_view(['GET','PUT','DELETE'])
def post_detail(request, id, format=None):

    try:
        # pk = Primary key
        post = Post.objects.get(pk = id)
    except Post.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = PostSerializer(post)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = PostSerializer(post, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        post.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        
# Comments
@api_view(['GET', 'POST'])
def comment_list(request, format=None):

    if request.method == 'GET':
        # Get all the posts
        comments = Comment.objects.all()
        # Serialize them
        serializer = CommentSerializer(comments, many=True)
        # Return json 
        return Response(serializer.data) 
    
    if request.method == 'POST':
        # Serialize the object
        serializer = CommentSerializer(data=request.data)
        # Save the serialized object
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        
@api_view(['GET','PUT','DELETE'])
def comment_detail(request, id, format=None):

    try:
        # pk = Primary key
        comment = Comment.objects.get(pk = id)
    except Comment.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CommentSerializer(comment)
        return Response(serializer.data)
    
    if request.method == 'PUT':
        serializer = CommentSerializer(comment, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    if request.method == 'DELETE':
        comment.delete()
        return Response(status=status.HTTP_204_NO_CONTENT) 
        