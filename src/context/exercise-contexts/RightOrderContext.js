import { set } from 'lodash';
import React, { useState, useEffect, useMemo } from 'react';
import { useCallback } from 'react';
import Swal from 'sweetalert2';
// import sentences from '@/src/data/arrange-words-game';

const RightOrderExerciseContext = React.createContext();

const RightOrderExerciseProvider = ({ children, exerciseId, exerciseTitle }) => {
	const [exerciseData, setExerciseData] = useState({});
	const [currentExerciseId, setCurrentExerciseId] = useState(exerciseId);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [correctOrder, setCorrectOrder] = useState([]);
	const [wrongOrder, setWrongOrder] = useState([]);
	const [userOrder, setUserOrder] = useState([]);
	const [score, setScore] = useState(0);
	const [feedbackMessage, setFeedbackMessage] = useState('');
	const [showConfetti, setShowConfetti] = useState(false);
	const [attempts, setAttempts] = useState(0);
	const [previousAnswers, setPreviousAnswers] = useState([]);
	const [isFinished, setIsFinished] = useState(false);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [showQuestion, setShowQuestion] = useState(false);
	const [showVideo, setShowVideo] = useState(true);
	const [showGame, setShowGame] = useState(false);
	const [playing, setPlaying] = useState(true);
	const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
	const [isCorrect, setIsCorrect] = useState(false);

	const currentExercise = exerciseData;
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
				if (promptType === 'handleSubmit') {
					handleSubmit();
				} else if (promptType === 'handleRestart') {
					handleRestart();
				}
			}
		});
	};

	const currentExerciseData = useMemo(() => {
		if (currentExercise.data) {
			return currentExercise.data[currentIndex];
		}
		return null;
	}, [currentExercise, currentIndex]);

	const handleGameStart = () => {
		setIsGameStarted(true);
	};

	const addUserWord = (word) => {
		if (!showConfetti) {
			setUserOrder([...userOrder, word]);
		}
	};
	// Fetch data from API when component mounts
	const fetcher = async () => {
		// await new Promise((resolve) => setTimeout(resolve, 3000));
		const res = await fetch(`/api/right-order-game/${exerciseId}`);
		const data = await res.json();
		setExerciseData(data);
		return data;
	};

	useEffect(() => {
		// Fetch exercise data
		if (currentExercise.data) {
			// Set correct and wrong order
			const item = currentExercise.data[currentIndex];
			setCorrectOrder(item.correctOrder);
			setWrongOrder(item.wrongOrder);
		}
	}, [currentIndex, currentExercise.data]);

	function arraysAreEqual(userOrder, correctOrder) {
		if (userOrder.length !== correctOrder.length) return false;

		const normalize = (str) =>
			str
				.toLowerCase()
				.replace(/[.,!?]/g, '')
				.trim();

		for (let i = 0; i < userOrder.length; i++) {
			if (normalize(userOrder[i]) !== normalize(correctOrder[i])) {
				return false;
			}
		}

		return true;
	}

	// Handles the TryAgain
	const handleTryAgain = () => {
		setAttempts(attempts + 1);
		setUserOrder([]);
		setWrongOrder([...currentExerciseData.wrongOrder].sort(() => Math.random() - 0.5));
		handleFeedbackMessage('');
		setShowConfetti(false);
	};

	const handleRestart = () => {
		setUserOrder([]);
		setIsFinished(false);
		setWrongOrder([...currentExerciseData.wrongOrder].sort(() => Math.random() - 0.5));
		setScore(0);
		setAttempts(0);
		handleFeedbackMessage('Game Restarted');
		setCurrentIndex(0);
		setShowConfetti(false);
		setPlaying(true);
		setShowVideo(true);
		setShowGame(false);
		setShowCorrectAnswer(false);
		setIsCorrect(false);
	};

	const handleFeedbackMessage = (message) => {
		setFeedbackMessage(message);
		setTimeout(() => {
			setFeedbackMessage('');
		}, 1000);
	};

	// Function to handle correct user input
	const handleCorrectAnswer = () => {
		if (score < currentExercise.data.length) {
			setScore(score + 1);
			setShowCorrectAnswer(true);
			// Correct! Resume the video where it was paused
			// setPlaying(true);
			// setShowGame(false);
		}
		handleFeedbackMessage('Correct, Good Job!');
	};

	// Function to handle incorrect user input
	const handleIncorrectAnswer = () => {
		handleFeedbackMessage('Incorrect, Please Try Again!');
		if (attempts < 2) {
			handleTryAgain();
		} else {
			moveToNextQuestion();
		}
	};

	// Function to update or add the user's previous answer
	const updatePreviousAnswer = () => {
		const existingAnswerIndex = previousAnswers.findIndex(
			(answer) => answer.challengeIndex === currentIndex
		);

		if (existingAnswerIndex !== -1) {
			const updatedPreviousAnswers = [...previousAnswers];
			updatedPreviousAnswers[existingAnswerIndex].userAnswer = userOrder;
			setPreviousAnswers(updatedPreviousAnswers);
		} else {
			const updatedPreviousAnswers = [
				...previousAnswers,
				{ challengeIndex: currentIndex, userAnswer: userOrder },
			];
			setPreviousAnswers(updatedPreviousAnswers);
		}
	};

	// Function to handle moving to the next question
	const moveToNextQuestion = () => {
		// Move on to the next sentence
		if (currentIndex < currentExercise.data.length - 1 && attempts < 2) {
			setCurrentIndex(currentIndex + 1);
			setPlaying(true);
			setShowGame(false);
			setUserOrder([]);
			setAttempts(0);
		} else if (currentIndex < currentExercise.data.length - 1 && attempts >= 2) {
			setCurrentIndex(currentIndex + 1);
			// Incorrect! Resume the video where it was paused
			setPlaying(true);
			setShowGame(false);
			setUserOrder([]);
			setAttempts(0);
			handleFeedbackMessage('Incorrect, Moving on to the next challenge.');
		} else if (currentIndex === currentExercise.data.length - 1 && attempts >= 2) {
			handleFeedbackMessage('Incorrect, Game Finished');
			setIsFinished(true);
			// When the game is finished, pause the video and don't show the game!
			setPlaying(false);
			setShowGame(false);
		} else {
			handleFeedbackMessage('Congratulations! You Have Completed All The Challenges');
			setShowConfetti(true);
			setIsFinished(true);
		}
		setShowCorrectAnswer(false);
	};

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

	// Main handleSubmit function
	const handleSubmit = () => {
		const item = currentExercise.data[currentIndex];
		if (arraysAreEqual(userOrder, item.correctOrder)) {
			handleCorrectAnswer();
			moveToNextQuestion();
			setIsCorrect(true);
		} else {
			handleIncorrectAnswer();
			setIsCorrect(false);
		}
		updatePreviousAnswer();

		// Update or add the user's previous answer
	};

	return (
		<RightOrderExerciseContext.Provider
			value={{
				currentIndex,
				correctOrder,
				dutchSentence: currentExerciseData?.hintSentence,
				correctAnswer: currentExerciseData?.correctAnswer,
				userOrder,
				score,
				feedbackMessage,
				showConfetti,
				attempts,
				previousAnswers,
				isFinished,
				isGameStarted,
				sentenceLength: currentExercise?.data?.length,
				// this is options array for the CommonVideoPlayer Component
				optionsArray: wrongOrder,
				// currentVideo,
				showQuestion,
				// timeStamp,
				showVideo,
				currentExerciseId,
				currentExercise,
				fetcher,
				playing,
				showGame,
				showCorrectAnswer,
				isCorrect,
				moveToNextQuestion,
				setShowGame,
				setShowVideo,
				setPlaying,
				setShowQuestion,
				handleGameStart,
				setPreviousAnswers,
				setAttempts,
				setFeedbackMessage,
				setScore,
				setUserOrder,
				setCurrentIndex,
				setCorrectOrder,
				handleSubmit,
				addUserWord,
				handleTryAgain,
				handleRestart,
				handlePrompt,
				setShowConfetti,
				setWrongOrder,
			}}
		>
			{children}
		</RightOrderExerciseContext.Provider>
	);
};

export { RightOrderExerciseProvider, RightOrderExerciseContext };
// this code saved for future reference more refactored version is used above
// const handleSubmit = () => {
//     if (arraysAreEqual(userOrder, correctOrder)) {
//         if (score < sentences.length) {
//             setScore(score + 1);
//             //Correct ! So Playing the video where it was paused
//             setPlaying(true);
//             setShowGame(false);
//         }
//         handleFeedbackMessage('Correct, Good Job !');

//         // Move on to the next sentence
//         if (currentIndex < sentences.length - 1) {
//             setCurrentIndex(currentIndex + 1);
//             // setCorrectOrder(sentences[currentIndex].correctOrder);
//             setUserOrder([]);
//             setAttempts(0);
//         } else {
//             handleFeedbackMessage(
//                 'Congratulations! You Have Completed All The Challenges'
//             );
//             setShowConfetti(true);
//             setIsFinished(true);
//         }
//     } else {
//         // console.log(correctOrder);
//         // console.log(userOrder);

//         handleFeedbackMessage('Incorrect, Please Try Again !');
//         handleTryAgain();
//         if (currentIndex < sentences.length - 1 && attempts >= 2) {
//             setCurrentIndex(currentIndex + 1);
//             setAttempts(0); // Reset attempts for next challenge
//             setUserOrder([]);
//             // Wrong ! So Playing the video where it was paused
//             setPlaying(true);
//             setShowGame(false);
//             handleFeedbackMessage('Incorrect,Moving on to next challenge.');
//         } else if (currentIndex === sentences.length - 1 && attempts >= 2) {
//             handleFeedbackMessage('Incorrect,Game Finished');
//             setIsFinished(true);
//             // When Game Finished setting , pause the video and dont show the game !
//             setPlaying(false);
//             setShowGame(false);
//         }
//     }
//     // This Below part is for Previous Answer Part ->PreviousAnswer(Component)
//     // Check if there is already a previous answer for this challenge
//     const existingAnswerIndex = previousAnswers.findIndex(
//         (answer) => answer.challengeIndex === currentIndex
//     );

//     // If there is an existing answer, update it with the latest one
//     if (existingAnswerIndex !== -1) {
//         const updatedPreviousAnswers = [...previousAnswers];
//         updatedPreviousAnswers[existingAnswerIndex].userAnswer = userOrder;
//         setPreviousAnswers(updatedPreviousAnswers);
//     } else {
//         // Otherwise add new entry to previous answers
//         const updatedPreviousAnswers = [
//             ...previousAnswers,
//             { challengeIndex: currentIndex, userAnswer: userOrder },
//         ];

//         setPreviousAnswers(updatedPreviousAnswers);
//     }
// };
