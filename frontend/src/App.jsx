import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import './App.css';
import QuestionsFeed from './components/QuestionFeed';

function App() {
  const [isLogin, setIsLogin] = useState(false);

  return (
    <div className="app-container">
      {/* {isLogin ? (
        <Login switchToSignup={() => setIsLogin(false)} />
      ) : (
        <Signup switchToLogin={() => setIsLogin(true)} />
      )} */}
      <QuestionsFeed/>
    </div>
  );
}

export default App;
    