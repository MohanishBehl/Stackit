import React, { useEffect, useState } from 'react';

function QuestionsFeed() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('access');

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/random-questions/')
      .then((res) => res.json())
      .then((data) => setQuestions(data))
      .catch((err) => console.error('Failed to fetch questions:', err));
  }, []);

  const handleAnswerChange = (e, questionId) => {
    setAnswers({ ...answers, [questionId]: e.target.value });
  };

  const submitAnswer = async (questionId) => {
    const answerText = answers[questionId];
    if (!answerText) {
      setMessage('Answer cannot be empty.');
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:8000/api/answers/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          answer: answerText,
          question_id: questionId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage('Answer submitted!');
        setAnswers({ ...answers, [questionId]: '' }); // clear input
      } else {
        const firstError = Object.values(data)[0];
        setMessage(Array.isArray(firstError) ? firstError[0] : firstError);
      }
    } catch (err) {
      console.error('Answer submission error:', err);
      setMessage('Something went wrong. Try again.');
    }
  };

  return (
    <div className="questions-feed">
      <h2>📋 Random Questions</h2>
      {message && <p style={{ color: 'green' }}>{message}</p>}
      {questions.map((q) => (
        <div key={q.question_id} className="question-card">
          <h3>{q.title}</h3>
          <p dangerouslySetInnerHTML={{ __html: q.description }} />
          <small>Tags: {q.tags?.join(', ')}</small>

          <textarea
            placeholder="Write your answer..."
            value={answers[q.question_id] || ''}
            onChange={(e) => handleAnswerChange(e, q.question_id)}
            rows={3}
            style={{ width: '100%', marginTop: '10px' }}
          />
          <button onClick={() => submitAnswer(q.question_id)} style={{ marginTop: '5px' }}>
            Submit Answer
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default QuestionsFeed;
