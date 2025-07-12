import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import AskQuestion from './Components/AskQuestion';
import './App.css';
import AskQuestion from './components/AskQuestion';
import Home from './components/Home';

function App() {
  return (
    <div className="container">
      {/* <AskQuestion /> */}
      <Home/>
      
    </div>
  );
}

export default App;
