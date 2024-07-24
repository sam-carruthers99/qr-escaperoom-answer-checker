import React, { useState } from 'react';
import './App.css';

const AnswerChecker = () => {
  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [puzzleNumber, setPuzzleNumber] = useState(1);

  const correctAnswers = ["6014", "3781", "5283", "7149", "6128", "1649", "2896"] // 7 codes, and final one is just the correct qr code scanned

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const checkAnswer = () => {
    if (inputValue === correctAnswers[puzzleNumber-1]) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
    }
  };

  const nextPuzzle = () => {
    setPuzzleNumber(puzzleNumber + 1);
    setInputValue('');
    setIsCorrect(null);
  };

  return (
    <div className="container">
      <h1>Puzzle #{puzzleNumber}</h1>
      {isCorrect === true ? (
        <div>
          <p>Correct</p>
          <button onClick={nextPuzzle}>Next Puzzle</button>
        </div>
      ) : (
        <div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Enter your answer"
          />
          <button onClick={checkAnswer}>Check Answer</button>
          {isCorrect === false && <p>Incorrect</p>}
        </div>
      )}
    </div>
  );
};

const App = () => {
  return (
    <div className="App">
      <AnswerChecker />
    </div>
  );
};

export default App;
