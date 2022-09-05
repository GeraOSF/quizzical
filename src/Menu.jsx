import "./Menu.css";

export default function Menu(props) {
  return (
    <div className="menu">
      <h1 className="menu__title">Quizzical</h1>
      <h4 className="menu__description">A fun quiz game to put your knowledge to the test!</h4>
      <button onClick={props.startQuiz} className="menu__startButton buttonSolid">Start quiz</button>
    </div>
  );
}
