import { v4 as uuidv4 } from "uuid";

// Parsing with DOMParser
export function parseFromString(input) {
	const parser = new DOMParser();
	return parser.parseFromString(input, "text/html").body.firstChild.textContent;
}

export function makeOptionsArray(correctAns, wrongAns) {
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
