import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./Question.css";
import { parseFromString } from "./helpers.js";

export default function Question(props) {
  const answersElements = props.answers.map(currentAnswer => (
    <button 
      className="option"
      style={{backgroundColor: currentAnswer.isSelected ? "#D6DBF5" : "transparent"}}
      isSelected={currentAnswer.isSelected} 
      isCorrect={currentAnswer.isCorrect}
      onClick={() => props.selectOption(currentAnswer.id, props.id)}
      id={currentAnswer.id}
    >
      {currentAnswer.answer}
    </button>
  ));

  return (
    <div className="questionContainer">
      <h3 className="question">{parseFromString(props.question)}</h3>
      <div className="options">{answersElements}</div>
      <hr></hr>
    </div>
  )
}
