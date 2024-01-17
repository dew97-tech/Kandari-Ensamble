// This context provides state and functions for managing the game logic and data.
// It includes a timer, game progress tracking, user answers, and fetching game data.

import React, { useState, useEffect, useRef } from "react";
import { useStopwatch } from "react-timer-hook";
import { shuffleArray } from "@/utils/shuffleArray";
import Swal from "sweetalert2";

const GameContext = React.createContext();

const GameProvider = ({ children, exerciseTitle }) => {
   // Timer state for studying phase
   const {
      totalSeconds: studyTotalSeconds,
      seconds: studySeconds,
      minutes: studyMinutes,
      hours: studyHours,
      isRunning: isStudyRunning,
      start: startStudy,
      pause: pauseStudy,
      reset: resetStudy,
   } = useStopwatch({ autoStart: false });

   // Timer state for playing phase
   const {
      totalSeconds: playTotalSeconds,
      seconds: playSeconds,
      minutes: playMinutes,
      hours: playHours,
      isRunning: isPlayRunning,
      start: startPlay,
      pause: pausePlay,
      reset: resetPlay,
   } = useStopwatch({ autoStart: false });

   const [shuffledGameData, setShuffledGameData] = useState([]);
   const [originalOrder, setOriginalOrder] = useState([]);
   const [currentCardIndex, setCurrentCardIndex] = useState(0);
   const [sentences, setSentences] = useState([]); // Array of sentences for the game
   const [isLoading, setIsLoading] = useState(true); // Loading state for fetching game data
   const [showTranslation, setShowTranslation] = useState(false); // State for showing/hiding translations
   const [playTime, setPlayTime] = useState(0); // Total play time in seconds
   const [studyTime, setStudyTime] = useState(0); // Total study time in seconds
   const [totalStudyTime, setTotalStudyTime] = useState(0); // Total accumulated study time
   const [totalPlayTime, setTotalPlayTime] = useState(0); // Total accumulated play time
   const [isGameFinished, setIsGameFinished] = useState(false); // State for game finish status
   const [showAll, setShowAll] = useState(false); // State for showing all answers
   const [isStudying, setIsStudying] = useState(false); // State for studying phase
   const [isPlaying, setIsPlaying] = useState(false); // State for playing phase
   const [UserAnswers, setUserAnswers] = useState([]); // Array of user answers
   const [result, setResult] = useState(""); // Result of each answer (correct/wrong)
   const [showResult, setShowResult] = useState(false); // State for showing answer result
   const [isSubmitted, setIsSubmitted] = useState(false); // State for answer submission status
   const [isGameStarted, setIsGameStarted] = useState(false); // State for game start status
   const [score, setScore] = useState(0); // User's score
   const [frame, setFrame] = useState(1); // Current game frame
   const [answers, setAnswers] = useState([]); // Array of user's answers
   const [playingAudio, setPlayingAudio] = useState(null); // Currently playing audio
   const [isFinished, setIsFinished] = useState(false); // State for game finish status
   const [isStudyTimerActive, setIsStudyTimerActive] = useState(false); // State for studying timer
   const [isPlayTimerActive, setIsPlayTimerActive] = useState(false); // State for playing timer
   const [isFrame4Finished, setIsFrame4Finished] = useState(false); // State for frame 4 finish status
   const [mistakes, setMistakes] = useState(0); // Number of mistakes

   // Function to get the current card
   const getCurrentCard = () => {
      if (currentCardIndex <= originalOrder.length - 1) {
         return originalOrder[currentCardIndex];
      }
   };
   // Function to move to the next card
   const nextCard = () => {
      // check if there is a next card
      if (currentCardIndex < originalOrder.length - 1) {
         // move to the next card
         setCurrentCardIndex((prevIndex) => prevIndex + 1);
      } else if (currentCardIndex === originalOrder.length - 1) {
         //  Now ckeck the answers
         handleSubmitAll();
         setIsFrame4Finished(true);
         setFrame(5);
      }
   };
   // Function to reset the game
   const resetGame = () => {
      setCurrentCardIndex(0);
   };
   // Function to toggle translation display
   const handleShowTranslation = () => {
      setShowTranslation(!showTranslation);
   };

   // Function to update user's answer
   const updateAnswer = (index, value) => {
      const newAnswers = [...answers];
      newAnswers[index] = value;
      setAnswers(newAnswers);
      // console.log(answers);
   };

   // Function to show a prompt dialog
   const handlePrompt = (title, text, iconType, promptType) => {
      Swal.fire({
         title: title,
         text: text,
         icon: iconType,
         color: "darkslategray",
         background: "#f5f5f5",
         focusConfirm: false,
         returnFocus: false,
         cancelButtonColor: "#ff5c5c",
         showCancelButton: true,
         confirmButtonColor: "#82d995",
         confirmButtonText: "Ja",
         cancelButtonText: "Nee",
      }).then((result) => {
         if (result.isConfirmed) {
            if (promptType === "handleBeginPlay" && isStudying && frame === 1) {
               handleBeginPlay();
            } else if (promptType === "handleSubmitAll") {
               handleSubmitAll();
            } else if (promptType === "handleRestart") {
               handleGameRestart();
            }
         }
      });
   };

   // Function to restart the game
   const handleGameRestart = () => {
      resetPlay(0, false);
      resetStudy(0, false);

      setMistakes(0);
      setIsGameStarted(false);
      setIsGameFinished(false);
      setIsFinished(false);
      setIsStudying(false);
      setIsPlaying(false);
      setIsStudyTimerActive(false);
      setIsPlayTimerActive(false);
      setIsSubmitted(false);
      setShowAll(false);
      setFrame(1);
      setResult("");
      setShowResult(false);
      setPlayingAudio(null);
      setScore(0);
      // setTotalStudyTime(0);
      // setTotalPlayTime(0);
      setAnswers(Array(sentences.length).fill(""));
      setUserAnswers([]);
      setIsFrame4Finished(false);
      setShuffledGameData([]);
      setOriginalOrder([]);
      setSentences([]);
      setCurrentCardIndex(0);
   };

   // Function to submit all answers
   const handleSubmitAll = () => {
      if (frame === 3) {
         // Process and submit all answers for Frame 3
         answers?.forEach((answer, index) => {
            const guessedWord = shuffledGameData[index]?.guessedWord;
            answer.toLowerCase() === guessedWord?.toLowerCase()
               ? handleResult("correct", index)
               : handleResult("wrong", index);
         });
      } else if (frame === 4) {
         // Process and submit all answers for Frame 4
         answers?.forEach((answer, index) => {
            const guessedWord = originalOrder[index]?.guessedWord;
            answer.toLowerCase() === guessedWord?.toLowerCase()
               ? handleResult("correct", index)
               : handleResult("wrong", index);
         });
      } else if (frame === 2) {
         // Process and submit all answers for Frame 2
         answers?.forEach((answer, index) => {
            const guessedWord = shuffledGameData[index]?.guessedWord;
            const guessedSubstring = guessedWord.substring(1);
            answer?.toLowerCase() === guessedSubstring?.toLowerCase()
               ? handleResult("correct", index)
               : handleResult("wrong", index);
         });
      }

      handleShowAll(); // Show the result of the game
      handleStopTimer(); // Pause the timer
   };

   // Function to handle the result of an answer
   const handleResult = (message, index) => {
      if (message === "correct") {
         setScore(score + 1);
      } else {
         frame >= 4 && setMistakes((prevMistake) => prevMistake + 1);
         console.log("mistakes", mistakes);
         console.log("frame", frame);
      }
      setResult(message);
      setShowResult(true);
      setIsSubmitted(true);

      setUserAnswers((prevUserAnswers) => {
         const newUserAnswers = [...prevUserAnswers];
         newUserAnswers[index] = message;
         return newUserAnswers;
      });
   };

   // Function to handle the beginning of the studying phase
   const handleBeginStudy = () => {
      setIsStudying(true);
      startStudy();
      // resetPlay();
   };

   // Function to handle the beginning of the playing phase
   const handleBeginPlay = () => {
      setIsGameFinished(false);
      setIsStudyTimerActive(false);
      setIsPlayTimerActive(true);
      setIsPlaying(true);
      setIsStudying(false);
      pauseStudy();
      if (isStudying && frame === 1) {
         setFrame(2);
      } else if (isGameFinished && frame === 2) {
         startPlay();
         setFrame(3);
         setUserAnswers([]);
         setAnswers(Array(sentences.length).fill(""));
      } else if (isGameFinished && frame === 3) {
         startPlay();
         pauseStudy();
         setFrame(4);
         setUserAnswers([]);
         setAnswers(Array(sentences.length).fill(""));
      } else {
         console.log("I am in the Finish Line");
         handleGameFinish();
      }
   };

   // Function to stop the timer
   const handleStopTimer = () => {
      if (!isFinished && isStudying) {
         pauseStudy();
      } else if (!isFinished && isPlaying) {
         pausePlay();
      } else if (frame === 5) {
         pauseStudy();
      } else {
         pausePlay();
         pauseStudy();
      }
   };

   // Function to show all answers
   const handleShowAll = () => {
      setShowAll(true);
      setIsGameFinished(true);
      setIsStudying(true);
      setIsPlaying(false);
      setIsStudyTimerActive(true);
      setIsPlayTimerActive(false);
   };

   // Function to handle the end of the game
   const handleGameFinish = () => {
      setIsPlaying(false);
      setIsStudying(false);
      // resetStudy();
      // resetPlay();
      setIsGameFinished(true);
      setIsFinished(true);
      setScore(0);
      setTotalStudyTime(0);
      setTotalPlayTime(0);
      setAnswers(Array(sentences.length).fill(""));
      setUserAnswers([]);
      setIsStudyTimerActive(false);
      setIsPlayTimerActive(false);
      setIsSubmitted(false);
      setShowAll(false);
      setFrame(1);
      setResult("");
      setShowResult(false);
      setPlayingAudio(null);
   };

   // Function to fetch game data
   const fetchData = async () => {
      setIsLoading(true);
      try {
         const res = await fetch("/api/memory-game-data");
         const data = await res.json();
         const originalOrder = data.map((item, index) => ({ ...item, originalIndex: index }));
         const shuffledData = shuffleArray(data);
         setShuffledGameData(shuffledData);
         setOriginalOrder(shuffleArray(originalOrder)); // Shuffle the original order of the data for Frame 4
         setSentences(shuffledData);
         // setAnswers(Array(shuffledData.length).fill(""));
      } catch (err) {
         console.log(err);
      } finally {
         setIsLoading(false);
      }
   };

   // Function to handle the start of the game
   const handleGameStart = async () => {
      try {
         await fetchData();
         // await shuffleGameData();
         setIsGameStarted(true);
         setAnswers(Array(sentences.length).fill(""));
      } catch (err) {
         console.log(err);
      }
   };

   // Function to format time in MM:SS format
   const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, "0")}:${remainingSeconds.toString().padStart(2, "0")}`;
   };

   // Return Achievements based on the totalStudyTime and TotalPlayTime
   const returnAchievement = () => {
      console.log("Total Mistakes in Frame 4", mistakes);
      // Minimum study and play times in seconds
      const MINIMUM_STUDY_TIME = 90; // 1 minute 30 seconds
      const MINIMUM_PLAY_TIME = 90; // 1 minute 30 seconds

      // Minimum study and play times for silver and gold achievements in seconds
      const MINIMUM_SILVER_GOLD_STUDY_TIME = 105; // 1 minute 45 seconds
      const MINIMUM_SILVER_GOLD_PLAY_TIME = 105; // 1 minute 45 seconds

      // Minimum study and play times for bronze achievement in seconds
      const MINIMUM_BRONZE_STUDY_TIME = 120; // 2 minutes
      const MINIMUM_BRONZE_PLAY_TIME = 120; // 2 minutes

      // Penalty for each mistake in seconds
      const MISTAKE_PENALTY = 15; // 15 seconds;

      // Calculate total study time with penalty
      const totalStudyTimeWithPenalty = studyTotalSeconds + mistakes * MISTAKE_PENALTY;

      // Check for achievements based on total study time and play time
      if (totalStudyTimeWithPenalty <= MINIMUM_STUDY_TIME && playTotalSeconds <= MINIMUM_PLAY_TIME) {
         return `Goud 🥇`; // Gold achievement
      } else if (
         totalStudyTimeWithPenalty <= MINIMUM_SILVER_GOLD_STUDY_TIME &&
         playTotalSeconds <= MINIMUM_SILVER_GOLD_PLAY_TIME
      ) {
         return `Zilver 🥈`; // Silver achievement
      } else if (
         totalStudyTimeWithPenalty <= MINIMUM_BRONZE_STUDY_TIME &&
         playTotalSeconds <= MINIMUM_BRONZE_PLAY_TIME
      ) {
         return `Bronze 🥉`; // Bronze achievement
      } else {
         return `geen medaille 😔`; // No achievements
      }
   };

   // Call handleBeginStudy after isGameStarted has been updated
   useEffect(() => {
      if (isGameStarted) {
         handleBeginStudy();
      }
   }, [isGameStarted]);

   // Start the timer based on the current phase and game status
   useEffect(() => {
      if (isStudying && isGameFinished && isStudyTimerActive && frame !== 5) {
         startStudy();
      } else if (isPlaying && !isGameFinished && isPlayTimerActive) {
         startPlay();
      }
   }, [isStudying, isPlaying, isGameFinished, isStudyTimerActive, isPlayTimerActive]);

   // Update exercise progress in local storage when the game is finished
   useEffect(() => {
      if (isGameFinished) {
         const storedExercises = JSON.parse(localStorage.getItem("lessons_exercises"));
         const updatedExercises = [...storedExercises];
         const index = updatedExercises.findIndex((exercise) => exercise.name === exerciseTitle);
         updatedExercises[index].isFinished = true;
         localStorage.setItem("lessons_exercises", JSON.stringify(updatedExercises));
      }
   }, [isGameFinished]);

   //   Current AudioURL from the currentCard
   const currentAudio = shuffledGameData[currentCardIndex]?.audioUrl;
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
            studyTotalSeconds,
            playTotalSeconds,
            // Frame 4 necessary States and Functions
            shuffledGameData,
            originalOrder,
            currentCard: getCurrentCard(),
            nextCard,
            resetGame,
            isFrame4Finished,
            currentCardIndex,
            currentAudio,
            returnAchievement,
            mistakes,
         }}
      >
         {children}
      </GameContext.Provider>
   );
};

export { GameProvider, GameContext };
