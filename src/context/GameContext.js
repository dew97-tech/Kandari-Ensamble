import React, { useState, useEffect, useRef } from 'react';
// import sentences from '@/src/data/memory-game-data';
import Swal from 'sweetalert2';
const GameContext = React.createContext();

const GameProvider = ({ children, exerciseTitle }) => {
	const intervalRef = useRef(null);
	const [sentences, setSentences] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [showTranslation, setShowTranslation] = useState(false);
	const [playTime, setPlayTime] = useState(0);
	const [studyTime, setStudyTime] = useState(0);
	const [totalStudyTime, setTotalStudyTime] = useState(0);
	const [totalPlayTime, setTotalPlayTime] = useState(0);
	const [isGameFinished, setIsGameFinished] = useState(false);
	const [showAll, setShowAll] = useState(false);
	const [isStudying, setIsStudying] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [UserAnswers, setUserAnswers] = useState([]);
	const [result, setResult] = useState('');
	const [showResult, setShowResult] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isGameStarted, setIsGameStarted] = useState(false);
	const [score, setScore] = useState(0);
	const [frame, setFrame] = useState(1);
	// const [answers, setAnswers] = useState(Array(sentences.length).fill(''));
	const [answers, setAnswers] = useState([]);
	const [playingAudio, setPlayingAudio] = useState(null);
	const [isFinished, setIsFinished] = useState(false);

	const handleShowTranslation = () => {
		setShowTranslation(!showTranslation);
	};

	const updateAnswer = (index, value) => {
		const newAnswers = [...answers];
		newAnswers[index] = value;
		setAnswers(newAnswers);
		console.log(answers);
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
			confirmButtonText: 'Ja',
			cancelButtonText: 'Nee',
			// denyButtonText: `Don't save`,
		}).then((result) => {
			/* Read more about isConfirmed, isDenied below */
			if (result.isConfirmed) {
				if (promptType === 'handleBeginPlay' && isStudying && frame === 1) {
					handleBeginPlay();
				} else if (promptType === 'handleSubmitAll') {
					handleSubmitAll();
				}
			}
		});
	};
	const handleSubmitAll = () => {
		// Show confirmation prompt before submitting
		// Process and submit all answers for Frame 3
		if (frame === 3 || frame === 4) {
			answers?.forEach((answer, index) => {
				const guessedWord = sentences[index].guessedWord;
				console.log('Correct Answer', guessedWord);
				console.log('User Answer', answer);
				answer.toLowerCase() === guessedWord.toLowerCase()
					? handleResult('correct', index)
					: handleResult('wrong', index);
			});
		}
		// Process and submit all answers for Frame 2
		else if (frame === 2) {
			answers?.forEach((answer, index) => {
				const guessedWord = sentences[index]?.guessedWord;
				const guessedSubstring = guessedWord.substring(1); // Get substring of guessed word starting from index 1
				console.log('Correct Answer', guessedSubstring);
				console.log('User Answer', answer);
				answer?.toLowerCase() === guessedSubstring?.toLowerCase()
					? handleResult('correct', index)
					: handleResult('wrong', index);
			});
		}

		handleShowAll();
		// Stop the timer after submitting all answers
		handleStopTimer();
	};

	const handleResult = (message, index) => {
		if (message === 'correct') {
			setScore(score + 1);
		}
		setResult(message);
		setShowResult(true);
		setIsSubmitted(true);

		// Update setUserAnswers using a function
		setUserAnswers((prevUserAnswers) => {
			const newUserAnswers = [...prevUserAnswers];
			newUserAnswers[index] = message;
			return newUserAnswers;
		});

		// Log the current value of UserAnswers
		// console.log('Current User Answers:', UserAnswers);
	};

	const handleBeginStudy = () => {
		setIsStudying(true);
		handleStartTimer();
	};
	const handleBeginPlay = () => {
		if (isStudying && frame === 1) {
			setIsStudying(false);
			setIsPlaying(true);
			setPlayTime(Date.now());
			setFrame(2);
		} else if (isGameFinished && frame === 2) {
			setIsGameFinished(false);
			setIsPlaying(true);
			setFrame(3);
			setUserAnswers([]);
			setAnswers(Array(sentences.length).fill(''));
		} else if (isGameFinished && frame === 3) {
			setIsGameFinished(false);
			setIsPlaying(true);
			setFrame(4);
			setUserAnswers([]);
			setAnswers(Array(sentences.length).fill(''));
		} else {
			console.log('I am in the Finish Line');
			handleGameFinish();
		}
	};
	const handleStartTimer = () => {
		if (!isStudying) {
			setStudyTime(Date.now());
		}
	};

	const handleStopTimer = () => {
		// setIsStudying(true);
		setIsGameFinished(true);
		// i am empting the answers array when game is finished for Frame 2
		// if (frame === 2) {
		// }
	};
	const fetchData = async () => {
		setIsLoading(true);
		try {
			const res = await fetch('/api/memory-game-data');
			const data = await res.json();
			setSentences(data);
		} catch (err) {
			console.log(err);
		} finally {
			setIsLoading(false); // Set loading state to false after setting game data
		}
	};
	const handleGameStart = async () => {
		try {
			await fetchData();
			setIsGameStarted(true);
			setAnswers(Array(sentences.length).fill(''));
		} catch (err) {
			console.log(err);
		}
	};
	const handleShowAll = () => {
		setShowAll(true);
	};
	// Converts the second to Minutes and return MM:SS format
	const formatTime = (seconds) => {
		const minutes = Math.floor(seconds / 60);
		const remainingSeconds = seconds % 60;
		return `${minutes.toString().padStart(2, '0')}:${remainingSeconds
			.toString()
			.padStart(2, '0')}`;
	};

	// we're using a useEffect hook to call the handleBeginStudy function after isGameStarted has been updated.
	// This ensures that handleBeginStudy is only called after the data has been fetched and stored in the sentences state.
	useEffect(() => {
		if (isGameStarted) {
			handleBeginStudy();
		}
	}, [isGameStarted]);

	useEffect(() => {
		if (isStudying && studyTime !== 0 && !isGameFinished) {
			intervalRef.current = setInterval(() => {
				const elapsedTimeInSeconds = Math.floor((Date.now() - studyTime) / 1000);
				setTotalStudyTime(totalStudyTime + elapsedTimeInSeconds);
				setStudyTime(Date.now());
			}, 1000);
		} else if (isPlaying && playTime !== 0 && !isGameFinished) {
			intervalRef.current = setInterval(() => {
				const elapsedTimeInSeconds = Math.floor((Date.now() - playTime) / 1000);
				setTotalPlayTime(totalPlayTime + elapsedTimeInSeconds);
				setPlayTime(Date.now());
			}, 1000);
		}
		return () => clearInterval(intervalRef.current);
	}, [studyTime, totalStudyTime, totalPlayTime, isGameFinished, isStudying, playTime]);

	// Exercise Progress Checker
	useEffect(() => {
		if (isGameFinished) {
			const storedExercises = JSON.parse(localStorage.getItem('lessons_exercises'));
			const updatedExercises = [...storedExercises];
			const index = updatedExercises.findIndex((exercise) => exercise.name === exerciseTitle);
			updatedExercises[index].isFinished = true;
			localStorage.setItem('lessons_exercises', JSON.stringify(updatedExercises));
		}
	}, [isGameFinished]);
	// Call this function when the game is finished
	const handleGameFinish = () => {
		setIsPlaying(false);
		setIsGameFinished(true);
		setIsFinished(true);
		setScore(0);
		setTotalStudyTime(0);
		setTotalPlayTime(0);
		setAnswers(Array(sentences.length).fill(''));
		setUserAnswers([]);
	};

	return (
		<GameContext.Provider
			value={{
				sentences,
				showTranslation,
				setShowTranslation,
				playTime,
				isStudying,
				result,
				showResult,
				handleSubmitAll,
				answers,
				setAnswers,
				updateAnswer,
				isSubmitted,
				setPlayTime,
				totalStudyTime,
				setTotalStudyTime,
				handleShowTranslation,
				isGameStarted,
				handleStartTimer,
				handleStopTimer,
				handleGameFinish,
				isGameFinished,
				handleBeginPlay,
				handleBeginStudy,
				UserAnswers,
				isFinished,
				setUserAnswers,
				isPlaying,
				totalPlayTime,
				setIsPlaying,
				game_data_length: sentences.length,
				handleShowAll,
				showAll,
				setShowAll,
				handleResult,
				handleGameStart,
				formatTime,
				frame,
				playingAudio,
				setPlayingAudio,
				handlePrompt,
			}}
		>
			{children}
		</GameContext.Provider>
	);
};

export { GameProvider, GameContext };
