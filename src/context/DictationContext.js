import React, { useEffect, useState } from 'react';
// import sentences from '@/src/data/dictation-game';
import Swal from 'sweetalert2';
const DictationGameContext = React.createContext();

const DictationGameProvider = ({ children,exerciseTitle }) => {
	const [sentences, setSentences] = useState([]);
	const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
	const [currentWordIndex, setCurrentWordIndex] = useState(0);
	// const [currentSentence, setCurrentSentence] = useState([]);
	const [currentSentence, setCurrentSentence] = useState({});
	const [isLoading, setIsLoading] = useState(true);
	const [showConfetti, setShowConfetti] = useState(false);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [isFinished, setIsFinished] = useState(false);
	const [isGameOver, setIsGameOver] = useState(false);
	const [isSequenceEnd, setIsSequenceEnd] = useState(false);
	const [showNextFrame, setShowNextFrame] = useState(false);
	const [playingAudio, setPlayingAudio] = useState(null);
	const [mistake, setMistake] = useState(0);
	const [score, setScore] = useState(0);
	const [feedbackMessage, setFeedbackMessage] = useState('');
	const [shuffledWords, setShuffledWords] = useState([]);
	const [answers, setAnswers] = useState([]);
	const [UserAnswers, setUserAnswers] = useState([]);
	const [showResult, setShowResult] = useState(false);
	const [heartEmojis, setHeartEmojis] = useState(['❤︎', '❤︎', '❤︎', '❤︎', '❤︎']);
	// Function to remove a heart emoji from the lifeline
	const removeHeart = () => {
		if (heartEmojis.length > 0) {
			const newHeartEmojis = [...heartEmojis];
			newHeartEmojis.pop();
			// newHeartEmojis.unshift('💔');
			setHeartEmojis(newHeartEmojis);
		} else {
			setFeedbackMessage('Game Over !');
			setIsFinished(true);
			setIsGameOver(true);
			setShowConfetti(false);
			setHeartEmojis(['❤︎', '❤︎', '❤︎', '❤︎', '❤︎']);
			setTimeout(() => {
				setFeedbackMessage('');
			}, 2000);
		}
	};
	const updateAnswer = (index, value) => {
		const newAnswers = [...answers];
		newAnswers[index] = value;
		setAnswers(newAnswers);
		// console.log(answers);
	};
	const handlePrompt = (title, text, iconType, promptType) => {
		Swal.fire({
			title: title,
			text: text,
			icon: iconType,
			color: 'darkslategray',
			background: '#f5f5f5',
			focusConfirm: false,
			returnFocus: false,
			cancelButtonColor: '#ff5c5c',
			showCancelButton: true,
			confirmButtonColor: '#82d995',
			confirmButtonText: 'Yes',
			// denyButtonText: `Don't save`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				if (promptType === 'handleSubmitAll') {
					handleSubmitAll();
				} else if (promptType === 'goNext') {
					goNext();
				}
			}
		});
	};
	const handleSubmitAll = () => {
		// Show confirmation prompt before submitting
		// Process and submit all answers for Frame 3

		answers.forEach((answer, index) => {
			const actualWord = shuffledWords[index].word;
			console.log('Correct Answer', actualWord);
			console.log('User Answer', answer);
			answer.toLowerCase() === actualWord.toLowerCase()
				? handleResult('correct', index)
				: handleResult('wrong', index);
		});
		setShowResult(true);

		// Process and submit all answers for Frame 2
	};

	const handleResult = (message, index) => {
		if (message === 'correct') {
			setScore(score + 1);
		}

		// setIsSubmitted(true);

		// Update setUserAnswers using a function
		setUserAnswers((prevUserAnswers) => {
			const newUserAnswers = [...prevUserAnswers];
			newUserAnswers[index] = message;
			return newUserAnswers;
		});

		// Log the current value of UserAnswers
	};

	const shuffleWords = (sentence) => {
		const newShuffledWords = sentence.words.sort(() => Math.random() - 0.5);
		setShuffledWords(newShuffledWords);
		console.log(newShuffledWords);
	};
	// Shuffle the words when the component mounts
	// Shuffle the words when sentences change
	useEffect(() => {
		if (sentences.length > 0) {
			setCurrentSentence(sentences[currentSentenceIndex]);
			shuffleWords(sentences[currentSentenceIndex]);
			console.log('sentences:', sentences);
			console.log('api resolved');
		}
	}, [sentences]);

	// Exercise Progress Checker
	useEffect(() => {
		if (isFinished) {
			const storedExercises = JSON.parse(localStorage.getItem('lessons_exercises'));
			const updatedExercises = [...storedExercises];
			const index = updatedExercises.findIndex((exercise) => exercise.name === exerciseTitle);
			updatedExercises[index].isFinished = true;
			localStorage.setItem('lessons_exercises', JSON.stringify(updatedExercises));
		}
	}, [isFinished]);

	const fetchData = async () => {
		setIsLoading(true);
		try {
			const res = await fetch('/api/dictation-memory-game');
			const data = await res.json();
			console.log(data);
			console.log(typeof data);
			setSentences(data);
		} catch (err) {
			console.error(err);
		} finally {
			setIsLoading(false);
		}
	};
	const handleGameStart = async () => {
		try {
			await fetchData();
			setIsGameStarted(true);
		} catch (err) {
			console.error(err);
		}
	};

	const handleNextButtonClick = () => {
		// Go to next sentence in the array
		if (currentSentenceIndex < sentences.length - 1) {
			setCurrentSentenceIndex(currentSentenceIndex + 1);
			setCurrentSentence(sentences[currentSentenceIndex + 1]);
			shuffleWords(sentences[currentSentenceIndex + 1]);
		} else {
			// alert('Game Over');
			setFeedbackMessage('Congratulations ! All challenges are completed');
			setIsFinished(true);
			setIsGameOver(false);
			setShowConfetti(true);
			setTimeout(() => {
				setFeedbackMessage('');
			}, 2000);
			// Show final score or option to play again
		}
	};

	// initialize the audio src
	const audioUrl = shuffledWords[currentWordIndex]
		? shuffledWords[currentWordIndex]?.audioUrl
		: null;

	const goNext = () => {
		if (currentSentence.words && currentSentence.words.length - 1 === currentWordIndex) {
			{
				// When a words array is finised traversing -> then we are reseting the word index to 0
				!isSequenceEnd &&
					(setShowNextFrame(true), setIsSequenceEnd(true), setCurrentWordIndex(0));
			}
		} else if (isSequenceEnd) {
			setShowResult(false);
			setAnswers([]);
			setUserAnswers([]);
			setIsSequenceEnd(false);
			setShowNextFrame(false);
			handleNextButtonClick();
		} else {
			setCurrentWordIndex(currentWordIndex + 1);
		}
	};

	const handleRestart = () => {
		setIsFinished(false);
		setShowConfetti(false);
		// setScore(0);
		setHeartEmojis(['❤︎', '❤︎', '❤︎', '❤︎', '❤︎']);
		setShowResult(false);
		setAnswers([]);
		setUserAnswers([]);
		setShowNextFrame(false);
		setIsSequenceEnd(false);
		setMistake(0);
		setIsGameOver(false);
		setCurrentSentenceIndex(0);
		setCurrentWordIndex(0);
		setIsGameStarted(false);
		setCurrentSentence(sentences[0]);
	};
	const monitorMistake = () => {
		console.log(mistake);
		if (mistake === 4) {
			setFeedbackMessage('Game Over !');
			setIsFinished(true);
			setIsGameOver(true);
			setShowConfetti(false);
			setTimeout(() => {
				setFeedbackMessage('');
			}, 2000);
		}
	};
	const handleWordClick = (word, type) => {
		// Find the word object based on the clicked word
		const wordObj = currentSentence.words.find((obj) => obj.word === word);
		// console.log(wordObj);
		if (wordObj) {
			const isCorrect =
				(type === 'oui' && wordObj.answer === 'oui') ||
				(type === 'non' && wordObj.answer === 'non');
			console.log(isCorrect);
			if (isCorrect) {
				setFeedbackMessage('Correct! Good Job');
				setTimeout(() => {
					setFeedbackMessage('');
				}, 1000);
				// Rest of the code
			} else {
				setFeedbackMessage('Sorry! Wrong Answer');
				setTimeout(() => {
					setFeedbackMessage('');
				}, 1000);
				setMistake(mistake + 1);
				removeHeart();
				// Highlight the word on the screen
				// Rest of the code
			}
		}

		monitorMistake();
		goNext();
	};

	return (
		<DictationGameContext.Provider
			value={{
				isGameOver,
				showNextFrame,
				mistake,
				isLoading,
				currentSentence,
				showConfetti,
				challengesCompleted: currentSentenceIndex === sentences.length,
				QuestionBankLen: sentences.length, // => because prompt words_array is the length of 4
				isGameStarted,
				isFinished,
				audioUrl,
				playingAudio,
				feedbackMessage,
				goNext,
				handleRestart,
				setPlayingAudio,
				handleNextButtonClick,
				handleWordClick,
				handleGameStart,
				goNext,
				word: shuffledWords[currentWordIndex]?.word,
				answers,
				UserAnswers,
				updateAnswer,
				currentWordIndex,
				shuffledWords,
				handlePrompt,
				showResult,
				isSequenceEnd,
				heartEmojis,
			}}
		>
			{children}
		</DictationGameContext.Provider>
	);
};
export { DictationGameProvider, DictationGameContext };
