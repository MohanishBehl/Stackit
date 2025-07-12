from django.urls import path
from .views import SignupView, CustomLoginView,QuestionCreateAPIView,AnswerCreateAPIView,RandomQuestionListAPIView,QuestionAnswersAPIView,UpvoteAPIView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('questions/create/', QuestionCreateAPIView.as_view(), name='question-create'),
    path('answers/create/', AnswerCreateAPIView.as_view(), name='answer-create'),
    path('questions/random/', RandomQuestionListAPIView.as_view(), name='random-questions'),
    path('questions/<int:question_id>/answers/', QuestionAnswersAPIView.as_view(), name='question-answers'),
    path('upvotes/<int:answer_id>/', UpvoteAPIView.as_view(), name='upvote-api'),
]
