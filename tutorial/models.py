from django.db import models
# from django.contrib.postgres.fields import ArrayField

class Drink(models.Model):
    name = models.CharField(max_length=200)
    description = models.CharField(max_length=500)

    def __str__(self):
        return self.name + " - " + self.description
    
class User(models.Model):
    name = models.CharField(max_length=200)
    image = models.ImageField(upload_to='client/src/images', default='default_image.jpg')
    city = models.CharField(max_length=50)
    country = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    password = models.CharField(max_length=50)
    followers = models.ManyToManyField('User', related_name='user_followers', blank=True)
    following = models.ManyToManyField('User', related_name='user_following', blank=True)
    posts = models.ManyToManyField('Post', related_name='user_posts', blank=True)
    liked = models.ManyToManyField('Post', related_name='user_liked_posts', blank=True)

    def __str__(self):
        return self.name+" from "+self.city+","+self.country
    
class Post(models.Model):
    title = models.CharField(max_length=300)
    image = models.ImageField(upload_to='client/src/images', default='default_image.jpg')
    body = models.CharField(max_length=2000)
    author_id = models.IntegerField()
    date_time = models.DateTimeField(auto_now_add=True)
    likes = models.ManyToManyField('User', related_name='post_likes', blank=True)
    comments = models.ManyToManyField('Comment', related_name='post_comments', blank=True)

    def __str__(self):
        return self.title
    
class Comment(models.Model):
    body = models.CharField(max_length=2000)
    date_time = models.DateTimeField(auto_now_add=True)
    author_id = models.IntegerField()
    likes = models.ManyToManyField('User', related_name='comment_likes', blank=True)

    def __str__(self):
        return self.body
    