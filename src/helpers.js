import { v4 as uuidv4 } from "uuid";

// Parsing with DOMParser
export function parseFromString(input) {
	const parser = new DOMParser();
	return parser.parseFromString(input, "text/html").body.firstChild.textContent;
}

export function getButtonStyles(gameOver, isSelected, isCorrect) {
	// Default styles
	const styles = {
		backgroundColor: "transparent",
		borderColor: "#4d5b9e",
		color: "#293264",
	};

	// Styles when selected and the game is not over
	if (isSelected) {
		styles.backgroundColor = "#D6DBF5";
		styles.borderColor = "#D6DBF5";
	}

	// Styles when game is over
	if (gameOver) {
		styles.borderColor = "#777E9E";
		styles.color = "#777E9E";
		if (isCorrect) {
			styles.backgroundColor = "#94D7A2";
			styles.borderColor = "#94D7A2";
			styles.color = "#293264";
		}
		if (isSelected && !isCorrect) {
			styles.backgroundColor = "#F8BCBC";
			styles.borderColor = "#F8BCBC";
		}
	}

	return styles;
}

export function getNewQuizData() {
	return fetch(
		"https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
	)
		.then((response) => response.json())
		.then((response) => {
			const arr = [...response.results];
			return arr.map((questionData) => {
				const { correct_answer, incorrect_answers, question } = questionData;
				const answers = makeOptionsArray(correct_answer, incorrect_answers);
				return {
					question,
					answers,
					isAnsweredCorrectly: false,
					id: uuidv4(),
				};
			});
		});
}

function makeOptionsArray(correctAns, wrongAns) {
	const correctAnswer = {
		answer: correctAns,
		isCorrect: true,
		isSelected: false,
		id: uuidv4(),
	};
	const wrongAnswers = wrongAns.map((currentAns) => {
		return {
			answer: currentAns,
			isCorrect: false,
			isSelected: false,
			id: uuidv4(),
		};
	});
	const arr = wrongAnswers.map((currentAns) => {
		return { ...currentAns, answer: parseFromString(currentAns.answer) };
	});
	const index = Math.floor(Math.random() * (arr.length + 1));
	arr.splice(index, 0, correctAnswer);
	return arr;
}
