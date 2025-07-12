from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    name = models.CharField(max_length=100)

    REQUIRED_FIELDS = ['email', 'phone_number', 'name']
    USERNAME_FIELD = 'username'  # you can change this to 'email' if needed

    def __str__(self):
        return self.username
from django.db import models
from django.conf import settings

class Question(models.Model):
    question_id = models.AutoField(primary_key=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='questions')
    title = models.CharField(max_length=255)
    description = models.TextField()
    tags = models.CharField(max_length=255)  # comma-separated tags like "django,react,jwt"
    timestamp = models.DateTimeField(auto_now_add=True)  # uses system (server) time at creation
    image_upload = models.URLField(null=True, blank=True)  # optional field

    def __str__(self):
        return self.title


class Answer(models.Model):
    answer_id = models.AutoField(primary_key=True)
    answer = models.TextField()
    file_upload = models.URLField(null=True, blank=True)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='answers')
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='answers')
    accepted_or_not = models.CharField(max_length=20, default="Not Accepted")

    def __str__(self):
        return f"Answer by {self.user.username} on Question ID {self.question.question_id}"

from .models import Answer  # or from yourapp.models if Answer is in another app

class Upvote(models.Model):
    answer = models.OneToOneField(Answer, on_delete=models.CASCADE, related_name='upvote')
    total_vote = models.IntegerField(default=0)

    def __str__(self):
        return f"Answer ID {self.answer.answer_id} - Votes: {self.total_vote}"