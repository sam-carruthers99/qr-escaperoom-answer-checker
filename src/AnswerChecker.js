import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

const correctAnswers = ["6014", "3781", "5396", "7149", "6128", "1649", "2853"];
const correctAnswersText = ["six zero one four", "three seven eight one", "five three nine six", "seven one four nine", "six one two eight", "one six four nine", "two eight five three"]
const wrongResponse = ["Incorrect", "Wrong", "Nope", "Try Again", "That didn't work", "False"]


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
    var lowercase = inputValue.toLowerCase()
    if (inputValue === correctAnswers[puzzleIndex] || lowercase === correctAnswersText[puzzleIndex]) {
      setIsCorrect(true);
    } else {
      setIsCorrect(false);
      var newText = wrongResponse[Math.floor(Math.random()*wrongResponse.length)];
      while(newText == wrongText)
        var newText = wrongResponse[Math.floor(Math.random()*wrongResponse.length)];
      setWrongText(newText) // just makes sure that the response when you get incorrect changes, to have feedback on whether or not you pressed the button
      setInputValue('')
    }
  };

  const nextPuzzle = () => {
    navigate(`/${parseInt(puzzleNumber, 10) + 1}`);
  };

  const prevPuzzle = () => {
    navigate(`/${parseInt(puzzleNumber, 10) - 1}`);
  };

  return (
    <div>
        <div className="container">
        <h1>Puzzle #{puzzleNumber}</h1>
        {isCorrect === true ? (
            <div>
            <p>Correct! You may now access the contents of puzzle #{puzzleIndex + 2}</p>
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
        {puzzleIndex === 0 ? ( // if it is on the first, can't go previous
            <div className="secondContainer">
                <button onClick={nextPuzzle}>Next Puzzle</button>
            </div>
        ) : (
            puzzleIndex === 7 ? ( // if on the last, can't go next
                <div className="secondContainer">
                    <button onClick={prevPuzzle}>Previous Puzzle</button>
                </div>
            ) : (
                <div className="secondContainer">
                    <button onClick={prevPuzzle}>Previous Puzzle</button>
                    <button onClick={nextPuzzle}>Next Puzzle</button>
                </div>
            )
        )}
        
    </div>
  );
};

export default AnswerChecker;