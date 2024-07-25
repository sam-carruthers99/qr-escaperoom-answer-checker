import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AnswerChecker from './AnswerChecker';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/1" />} />
          <Route path="/:puzzleNumber" element={<AnswerChecker />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;