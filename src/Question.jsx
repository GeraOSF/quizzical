import "./Question.css";
import { parseFromString, getButtonStyles } from "./helpers";

export default function Question(props) {
  const answersElements = props.answers.map(currentAnswer => {
    return (
      <button 
        className="option"
        style={getButtonStyles(props.gameOver, currentAnswer.isSelected, currentAnswer.isCorrect)}
        isSelected={currentAnswer.isSelected} 
        isCorrect={currentAnswer.isCorrect}
        onClick={() => props.selectOption(currentAnswer.id, props.id)}
        id={currentAnswer.id}
        key={currentAnswer.id}
      >
        {currentAnswer.answer}
      </button>
    );
  });

  return (
    <>
      <h3 className="question">{parseFromString(props.question)}</h3>
      <div className="options">
        {answersElements}
        {props.resultLogo}
      </div>
      <hr />
    </>
  );
}
