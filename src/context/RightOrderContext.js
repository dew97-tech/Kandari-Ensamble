import React, { useState, useEffect, useMemo, useCallback } from "react";
import Swal from "sweetalert2";

const RightOrderContext = React.createContext();

const RightOrderProvider = ({ children, exerciseId, exerciseTitle }) => {
   const [exerciseData, setExerciseData] = useState({});
   const [currentExerciseId, setCurrentExerciseId] = useState(exerciseId);
   const [currentIndex, setCurrentIndex] = useState(0);
   const [correctOrder, setCorrectOrder] = useState([]);
   const [wrongOrder, setWrongOrder] = useState([]);
   const [userOrder, setUserOrder] = useState([]);
   const [score, setScore] = useState(0);
   const [feedbackMessage, setFeedbackMessage] = useState("");
   const [showConfetti, setShowConfetti] = useState(false);
   const [attempts, setAttempts] = useState(0);
   const [previousAnswers, setPreviousAnswers] = useState([]);
   const [isFinished, setIsFinished] = useState(false);
   const [isGameStarted, setIsGameStarted] = useState(false);
   const [showQuestion, setShowQuestion] = useState(false);
   const [showVideo, setShowVideo] = useState(true);
   const [showGame, setShowGame] = useState(false);
   const [playing, setPlaying] = useState(false);
   const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
   const [isCorrect, setIsCorrect] = useState(false);
   const [playingAudio, setPlayingAudio] = useState(null);

   const currentExercise = exerciseData;

   // const handlePlay = () => {
   //   setPlaying(true);
   // };
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
         confirmButtonText: "Yes",
      }).then((result) => {
         if (result.isConfirmed) {
            if (promptType === "handleSubmit") {
               handleSubmit();
            } else if (promptType === "handleRestart") {
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

   const fetcher = async () => {
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

   // Exercise Progress Checker
   useEffect(() => {
      if (isFinished) {
         const storedExercises = JSON.parse(
            localStorage.getItem("lessons_exercises")
         );
         const updatedExercises = [...storedExercises];
         const index = updatedExercises.findIndex(
            (exercise) => exercise.name === exerciseTitle
         );
         updatedExercises[index].isFinished = true;
         localStorage.setItem(
            "lessons_exercises",
            JSON.stringify(updatedExercises)
         );
      }
   }, [isFinished]);

   function arraysAreEqual(userOrder, correctOrder) {
      if (userOrder.length !== correctOrder.length) return false;

      const normalize = (str) =>
         str
            .toLowerCase()
            .replace(/[.,!?]/g, "")
            .trim();

      for (let i = 0; i < userOrder.length; i++) {
         if (normalize(userOrder[i]) !== normalize(correctOrder[i])) {
            return false;
         }
      }

      return true;
   }

   const handleTryAgain = () => {
      setAttempts(attempts + 1);
      setUserOrder([]);

      if (currentExercise && currentExercise.data.length > 0) {
         const exerciseItem = currentExercise.data[currentIndex];
         setWrongOrder(
            [...exerciseItem.wrongOrder].sort(() => Math.random() - 0.5)
         );
      }
      handleFeedbackMessage("");
      setShowConfetti(false);
   };

   const handleRestart = () => {
      setUserOrder([]);
      setIsFinished(false);
      if (currentExercise && currentExercise.data.length > 0) {
         const exerciseItem = currentExercise.data[currentIndex];
         setWrongOrder(
            [...exerciseItem.wrongOrder].sort(() => Math.random() - 0.5)
         );
      }
      setScore(0);
      setAttempts(0);
      handleFeedbackMessage("Game Restarted");
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
         setFeedbackMessage("");
      }, 1000);
   };

   const handleCorrectAnswer = () => {
      if (score < currentExercise.data.length) {
         setScore(score + 1);
         setShowCorrectAnswer(true);
      }

      handleFeedbackMessage("Correct, Good Job!");
   };

   const handleIncorrectAnswer = () => {
      handleFeedbackMessage("Incorrect, Please Try Again!");

      if (attempts < 2) {
         handleTryAgain();
      } else {
         setShowCorrectAnswer(true);
      }
   };

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

   const moveToNextQuestion = () => {
      if (currentIndex < currentExercise.data.length - 1 && attempts < 2) {
         console.log("Fired inside if statement");
         setCurrentIndex(currentIndex + 1);
         setPlaying(true);
         setShowGame(false);
         setUserOrder([]);
         setAttempts(0);
      } else if (
         currentIndex < currentExercise.data.length - 1 &&
         attempts >= 2
      ) {
         console.log("Fired inside else if statement");
         setCurrentIndex(currentIndex + 1);
         setPlaying(true);
         setShowGame(false);
         setUserOrder([]);
         setAttempts(0);
         handleFeedbackMessage("Incorrect, Moving on to the next challenge.");
      } else if (
         currentIndex === currentExercise.data.length - 1 &&
         attempts >= 2
      ) {
         console.log("Fired inside else if 2 statement");
         handleFeedbackMessage("Incorrect, Game Finished");
         setIsFinished(true);
         setPlaying(false);
         setShowGame(false);
      } else {
         console.log("Fired inside else statement");
         handleFeedbackMessage(
            "Congratulations! You Have Completed All The Challenges"
         );
         setShowConfetti(true);
         setIsFinished(true);
      }
      setShowCorrectAnswer(false);
   };

   const handleSubmit = () => {
      const item = currentExercise.data[currentIndex];
      if (arraysAreEqual(userOrder, item.correctOrder)) {
         console.log("You got it right!");
         handleCorrectAnswer();
         setIsCorrect(true);
      } else {
         handleIncorrectAnswer();
         setIsCorrect(false);
      }

      updatePreviousAnswer();
   };
   const handleFinish = () => {
      setIsFinished(true);
      setShowVideo(false);
      setPlaying(false);
   };

   const timeStamp = currentExerciseData?.video?.pauseTime;
   const returnAchievement = () => {
      const numberOfMistakes = currentExercise?.data?.length - score;

      if (numberOfMistakes === 0) {
         return "🥇 Gold";
      } else if (numberOfMistakes === 1) {
         return "🥈 Silver";
      } else if (numberOfMistakes === 2) {
         return "🥉 Bronze";
      } else {
         return "No prize 🫡";
      }
   };

   return (
      <RightOrderContext.Provider
         value={{
            exerciseData,
            currentExerciseId,
            currentIndex,
            correctOrder,
            dutchSentence: currentExerciseData?.hintSentence,
            correctAnswer: correctOrder.join(" "),
            userOrder,
            score,
            feedbackMessage,
            showConfetti,
            attempts,
            previousAnswers,
            isFinished,
            isGameStarted,
            sentenceLength: currentExercise?.data?.length,
            optionsArray: wrongOrder,
            currentVideo: currentExerciseData?.video,
            showQuestion,
            currentExercise,
            timeStamp,
            showVideo,
            playing,
            showGame,
            showCorrectAnswer,
            isCorrect,
            exerciseData,
            playingAudio,
            // handlePlay,
            returnAchievement,
            setPlayingAudio,
            handleFinish,
            fetcher,
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
            setCurrentExerciseId, // Added for exercise switching
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
      </RightOrderContext.Provider>
   );
};

export { RightOrderProvider, RightOrderContext };
