import { useState, useEffect } from "react";
import Menu from "./Menu";
import Question from "./Question";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import { makeOptionsArray } from "./helpers";

export default function App() {
  const [gametime, setGametime] = useState(false);
  const [questionsData, setQuestionsData] = useState([]);
  
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5&type=multiple")
    .then(response => response.json())
    .then(response => {
      const arr = [...response.results];
      return arr.map(questionData => {
        const {correct_answer, incorrect_answers, question} = questionData;
        const answers = makeOptionsArray(correct_answer, incorrect_answers);
        return {
            question,
            answers,
            id: uuidv4()
          }
        });
      })
      .then(dataArray => setQuestionsData(dataArray));
  }, []);

  function selectOption(answerId, questionId) {
    setQuestionsData(prevQuestions => {
      return prevQuestions.map(currentQuestion => {
        if (currentQuestion.id === questionId) {
          const newAnswers = currentQuestion.answers.map(currentAnswer => {
            if (currentAnswer.id === answerId) {
              return {...currentAnswer, isSelected: true}
            }
            return {...currentAnswer, isSelected: false};
          });
          return {...currentQuestion, answers: newAnswers}
        }
        return currentQuestion;
      });
    });
  }

  const questions = questionsData.map((currQuestion) => {
    return  <Question 
      question={currQuestion.question} 
      answers={currQuestion.answers}
      selectOption={selectOption}
      id={currQuestion.id}
      key={currQuestion.id}
      />
  });

  return (
    <>
    <main>
      {
        !gametime ?
        <Menu startQuiz={() => setGametime(true)}/> :
        <>
        <div className="questions">
          {questions}
        </div>
        <button className="buttonSolid">Check answers</button>
        </>
      }
    </main>
    <img className="img--blueBlob" src="/blob-blue.png" alt="Blob image" />
    <img className="img--yellowBlob" src="/blob-yellow.png" alt="Blob image" />
    </>
  )
}
