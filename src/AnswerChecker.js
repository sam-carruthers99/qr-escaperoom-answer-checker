import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

const correctAnswers = ["6014", "3781", "5396", "7149", "6128", "1649", "2853"];
const wrongResponse = ["Incorrect", "Wrong", "Nope", "Try Again", "That didn't work"]


const AnswerChecker = () => {
  const { puzzleNumber } = useParams();
  const navigate = useNavigate();
  const puzzleIndex = parseInt(puzzleNumber, 10) - 1;

  const [inputValue, setInputValue] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [wrongText, setWrongText] = useState("Incorrect");

  useEffect(() => {
    setInputValue('');
    setIsCorrect(null);
  }, [puzzleNumber]);

  useEffect(() => {
    if (puzzleIndex < 0 || puzzleIndex > correctAnswers.length) {
      navigate("/1");
    } else {
      setInputValue('');
      setIsCorrect(null);
    }
  }, [puzzleNumber, navigate, puzzleIndex]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const checkAnswer = () => {
    if (inputValue === correctAnswers[puzzleIndex]) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      setWrongText(wrongResponse[Math.floor(Math.random()*wrongResponse.length)])
    }
  };

  const nextPuzzle = () => {
    navigate(`/${parseInt(puzzleNumber, 10) + 1}`);
  };

  return (
    <div className="container">
      <h1>Puzzle #{puzzleNumber}</h1>
      {isCorrect === true ? (
        <div>
          <p>Correct! You may now access the contents of puzzle #{puzzleIndex + 2}</p>
          <button onClick={nextPuzzle}>Next Puzzle</button>
        </div>
      ) : (
        <div>
          {puzzleIndex < correctAnswers.length ? (
            <>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter your answer"
              />
              <button onClick={checkAnswer}>Check Answer</button>
              {isCorrect === false && <p className="wrong">{wrongText}</p>}
            </>
          ) : (
            <>
              <p>For the final puzzle, you will need to scan the correct QR code. You have one chance to scan the correct code.</p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AnswerChecker;