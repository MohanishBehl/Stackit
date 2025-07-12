# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import SignupSerializer

class SignupView(APIView):
    def post(self, request):
        serializer = SignupSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "User registered successfully"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model

User = get_user_model()

class CustomLoginView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        if not username or not password:
            return Response({"error": "Username and password are required."}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(username=username, password=password)

        if user is None:
            return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)

        refresh = RefreshToken.for_user(user)

        return Response({
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'username': user.username,
            'email': user.email,
            'name': user.name,
            'phone_number': user.phone_number,
        }, status=status.HTTP_200_OK)

# views.py

from rest_framework.permissions import IsAuthenticated
from .serializers import QuestionSerializer

class QuestionCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = QuestionSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Question posted successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from .serializers import AnswerSerializer
from .models import Upvote 
class AnswerCreateAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AnswerSerializer(data=request.data, context={'request': request})
        if serializer.is_valid():
            answer = serializer.save()

            # Create an Upvote entry with total_vote = 0
            Upvote.objects.create(answer=answer, total_vote=0)

            return Response({"message": "Answer submitted successfully!"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
import random
from .models import Question
class RandomQuestionListAPIView(APIView):
    def get(self, request):
        questions = list(Question.objects.all())
        random.shuffle(questions)
        selected = questions[:10]
        serializer = QuestionSerializer(selected, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
from .models import Answer, Question
from .serializers import AnswerSerializer

class QuestionAnswersAPIView(APIView):
    def get(self, request, question_id):
        try:
            question = Question.objects.get(question_id=question_id)
        except Question.DoesNotExist:
            return Response({"error": "Question not found"}, status=status.HTTP_404_NOT_FOUND)

        answers = Answer.objects.filter(question=question)
        serializer = AnswerSerializer(answers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
# views.py

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Upvote, Answer
from .serializers import UpvoteSerializer

class UpvoteAPIView(APIView):
    def get(self, request, answer_id):
        try:
            answer = Answer.objects.get(answer_id=answer_id)
            upvote, _ = Upvote.objects.get_or_create(answer=answer)
            serializer = UpvoteSerializer(upvote)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Answer.DoesNotExist:
            return Response({'error': 'Answer not found'}, status=status.HTTP_404_NOT_FOUND)

    def post(self, request, answer_id):
        try:
            answer = Answer.objects.get(answer_id=answer_id)
            upvote, _ = Upvote.objects.get_or_create(answer=answer)
            upvote.total_vote += 1
            upvote.save()
            serializer = UpvoteSerializer(upvote)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except Answer.DoesNotExist:
            return Response({'error': 'Answer not found'}, status=status.HTTP_404_NOT_FOUND)
 