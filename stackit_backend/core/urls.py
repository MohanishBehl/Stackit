from django.urls import path
from .views import SignupView, CustomLoginView,QuestionCreateAPIView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', CustomLoginView.as_view(), name='login'),
    path('questions/create/', QuestionCreateAPIView.as_view(), name='question-create'),
]
