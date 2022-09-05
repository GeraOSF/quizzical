import { useState } from "react";
import Confetti from "react-confetti";
import Menu from "./Menu";
import Question from "./Question";
import Footer from "./Footer";
import { getNewQuizData } from "./helpers";
import "./App.css";

export default function App() {
  const [gametime, setGametime] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  
  function startGame() {
    getNewQuizData().then(dataArray => setQuestionsData(dataArray));
    setGametime(true);
    setGameOver(false);
  }

  function selectOption(answerId, questionId) {
    if (gameOver) return;
    setQuestionsData(prevQuestions => {
      return prevQuestions.map(currentQuestion => {
        if (currentQuestion.id === questionId) {
          let isAnsweredCorrectly = false;
          const newAnswers = currentQuestion.answers.map(currentAnswer => {
            if (currentAnswer.id === answerId) {
              if (currentAnswer.isCorrect) isAnsweredCorrectly = true;
              return { ...currentAnswer, isSelected: true };
            }
            return { ...currentAnswer, isSelected: false };
          });
          return {
            ...currentQuestion, 
            answers: newAnswers, 
            isAnsweredCorrectly
          };
        }
        return currentQuestion;
      });
    });
  }

  function checkAnswers() {
    setGameOver(true);
    let count = 0;
    questionsData.forEach(questionData => {
      questionData.answers.forEach(answer => {
        if (answer.isSelected && answer.isCorrect) count++;
      });
    });
    setCorrectAnswersCount(count);
  }

  const questions = questionsData.map((currentQuestion) => {
    const resultLogo = gameOver && (
      currentQuestion.isAnsweredCorrectly
      ? <i className="fa-solid fa-circle-check" />
      : <i className="fa-solid fa-circle-xmark" />
    );
    return (
      <Question
        question={currentQuestion.question} 
        answers={currentQuestion.answers}
        selectOption={selectOption}
        gameOver={gameOver}
        resultLogo={resultLogo}
        id={currentQuestion.id}
        key={currentQuestion.id}
      />
    );
  });

  return (
    <>
      {
        gameOver && correctAnswersCount === questionsData.length && <Confetti />
      }
      <main>
        {
        !gametime
        ? <Menu startQuiz={startGame} />
        : (
          <>
            <div className="questions">
              {questions}
            </div>
          {
          gameOver 
          ? (
            <>
              <h3 className="scoreText">You scored {correctAnswersCount}/{questionsData.length} correct answers</h3>
              <button className="buttonSolid playAgain__button" onClick={startGame}>Play again</button>
            </>
          )
          : <button className="buttonSolid" onClick={checkAnswers}>Check answers</button>
          }
          </>
        )
        }
        <img className="img--blueBlob" src="/blob-blue.png" alt="Blue blob" />
        <img className="img--yellowBlob" src="/blob-yellow.png" alt="Yellow blob" />
      </main>
      <Footer />
    </>
  );
}
