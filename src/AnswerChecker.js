import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './App.css';

const { hints } = require('./hints.js')
const correctAnswers = ["6014", "3781", "5396", "7149", "6128", "1649", "2853"];
const correctAnswersText = ["six zero one four", "three seven eight one", "five three nine six", "seven one four nine", "six one two eight", "one six four nine", "two eight five three"]
const wrongResponse = ["Incorrect", "Wrong", "Nope", "Try Again", "That didn't work", "False", "Not Right"]

const AnswerChecker = () => {

  const [showHint, setShowHint] = useState(false); // when next puzzle or prev puzzle is pressed, we need to setShowHint(false) and setHintNum(0)
  const [hintNum, setHintNum] = useState(0);
  const [numOfHints, setNumOfHints] = useState(3);

  const onNextPrevClicked = () => {
      setShowHint(false)
      setHintNum(0)
  }

  const toggleHint = () => {
    setShowHint(!showHint)
  }

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

  const nextHint = () => {
    setHintNum(hintNum + 1)
  }

  const prevHint = () => {
    setHintNum(hintNum - 1)
  }

  const nextPuzzle = () => {
    navigate(`/${parseInt(puzzleNumber, 10) + 1}`);
    onNextPrevClicked();
    var hintsArray = hints[puzzleNumber]
    setNumOfHints(hints[puzzleNumber].length)
  };

  const prevPuzzle = () => {
    navigate(`/${parseInt(puzzleNumber, 10) - 1}`);
    onNextPrevClicked();
    var hintsArray = hints[puzzleNumber]
    setNumOfHints(hints[puzzleNumber].length) 
  };

  return (
    <div>
        <div className="container">
        <h1>Puzzle #{puzzleNumber}</h1>
        {isCorrect === true ? (
            <div>
              {puzzleIndex === 3 ? (
                <p>Correct! You may now enter the second room and access the contents of puzzle #{puzzleIndex + 2}</p>
              ) : (
                <p>Correct! You may now access the contents of puzzle #{puzzleIndex + 2}</p>
              )}
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
                <p>For the final puzzle, you will need to scan the correct QR code. Only one code is correct.</p>
                </>
            )}
            </div>
        )}
        </div>
        <div className='lower--container'>
          
          <div className='hint--container'>
              <div className="hint--button--container">
                  <button className="hint--button" onClick={toggleHint}>
                      {showHint ? ("Hide ") : ("Show ")}
                      {hintNum == (hints[puzzleNumber].length - 1) ? ( // if equals number of hints - 1
                          "Solution"
                      ) : (
                            "Hint #" + (hintNum + 1).toString()
                      )} 
                  </button>      
              </div>
              <div className='hint--text-container'>
                  { showHint ? (
                      <div className='hint--text'>{
                        hintNum === (hints[puzzleNumber].length - 1) ? ( // number of hints - 1 (length of current hints array) tracked on puzzle changed
                          "Solution: " + hints[puzzleNumber][hintNum]
                        ) : (
                          "Hint #" + (hintNum + 1) + ": " + hints[puzzleNumber][hintNum]
                        )}
                        </div> 
                  ) : (
                      <div></div>
                  )}
              </div>
          </div>
          <div className='hint--button--container'>
            {hintNum === 0 ? ( // if it is on the first, can't go previous
                <div>
                    <button onClick={nextHint}>Next Hint</button>
                </div>
            ) : (
                hintNum === (hints[puzzleNumber].length - 1) ? ( // if equal to number of hints - 1
                    <div>
                        <button onClick={prevHint}>Previous Hint</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={prevHint}>Previous Hint</button>
                        <button onClick={nextHint}>Next Hint {hintNum === (hints[puzzleNumber].length - 2) ? " (Solution)" : ("")}</button> {/* if equal to number of hints - 2 */}
                    </div>
                )
            )}
          </div>
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