from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class SignupSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, style={"input_type": "password"})

    class Meta:
        model = User
        fields = ['username', 'email', 'name', 'phone_number', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            name=validated_data['name'],
            phone_number=validated_data['phone_number'],
            password=validated_data['password']
        )
        return user


# serializers.py

from rest_framework import serializers
from .models import Question

class QuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question_id', 'title', 'description', 'tags', 'timestamp', 'image_upload']

    def create(self, validated_data):
        user = self.context['request'].user  # Authenticated user from request
        return Question.objects.create(user=user, **validated_data)

# serializers.py

from rest_framework import serializers
from .models import Answer

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['answer_id', 'answer', 'file_upload', 'question', 'accepted_or_not']

    def create(self, validated_data):
        user = self.context['request'].user
        return Answer.objects.create(user=user, **validated_data)

from .models import Upvote
class UpvoteSerializer(serializers.ModelSerializer):
    answer_id = serializers.IntegerField(source='answer.answer_id', read_only=True)

    class Meta:
        model = Upvote
        fields = ['answer_id', 'total_vote']