// RolePlayContext.js
import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
const RolePlayContext = createContext();

const RolePlayProvider = ({ children, exerciseId, exerciseTitle }) => {
   const [questions, setQuestions] = useState({});
   const [currentExerciseId, setCurrentExerciseId] = useState(exerciseId);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [score, setScore] = useState(0);
   const [selectedOptionID, setSelectedOptionID] = useState(null);
   const [isFinished, setIsFinished] = useState(false);
   const [showVideo, setShowVideo] = useState(true);
   const [showGame, setShowGame] = useState(false);
   const [playing, setPlaying] = useState(true); // State to manage playing prop
   const [userAnswers, setUserAnswers] = useState([]); // New state to store user answers
   const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
   const [isCorrect, setIsCorrect] = useState(false);
   const [playingAudio, setPlayingAudio] = useState(null);
   const [gameShown, setGameShown] = useState(false);
   const [attempt, setAttempt] = useState(0);

   // Get current question
   const currentQuestion = questions?.data?.[currentQuestionIndex];

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
         // denyButtonText: `Don't save`,
      }).then((result) => {
         /* Read more about isConfirmed, isDenied in the Docs */
         if (result.isConfirmed) {
            if (promptType === "handleRestart") {
               handleRestart();
            }
         }
      });
   };

   // Function to load questions from the API
   const fetcher = async () => {
      // await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await fetch(`/api/role-play-game/${currentExerciseId}`);
      const data = await res.json();
      setQuestions(data);
      return data;
   };

   // Randomize array
   function randomizeArray(arr) {
      return [...arr].sort(() => Math.random() - 0.5);
   }

   // Shuffle the questions and options
   const shuffleOptions = () => {
      const shuffledData = questions.data.map((question) => ({
         ...question,
         options: randomizeArray(question.options),
      }));

      setQuestions({ ...questions, data: shuffledData });
   };

   // Load questions from API and shuffle when the component mounts
   useEffect(() => {
      if (questions?.data?.length <= 0) {
         shuffleOptions();
      }
   }, [currentQuestionIndex, currentExerciseId, questions?.data]);

   useEffect(() => {
      if (isFinished) {
         const storedExercises = JSON.parse(localStorage.getItem("lessons_exercises"));
         const updatedExercises = [...storedExercises];
         const index = updatedExercises.findIndex((exercise) => exercise.name === exerciseTitle);
         updatedExercises[index].isFinished = true;
         localStorage.setItem("lessons_exercises", JSON.stringify(updatedExercises));
      }
   }, [isFinished]);

   // Handle option click
   const handleOptionSelect = (optionID) => {
      setSelectedOptionID(optionID);
      console.log("You selected option", optionID);
   };

   // Function to handle user selection
   // Main function to handle form submission
   const handleSubmit = () => {
      // Check if the selected answer is correct
      const isCorrect = checkAnswerIsCorrect(currentQuestion.correctOptionId, selectedOptionID);

      // Increment the attempt if the answer is incorrect
      if (!isCorrect) {
         setAttempt((prevAttempt) => prevAttempt + 1);
      }
      // Update the score if the answer is correct
      if (isCorrect) {
         updateScore();
         setIsCorrect(true);
         setShowCorrectAnswer(true);
      } else {
         // Check if the user has exceeded the maximum number of attempts
         if (attempt >= 0) {
            // Show correct answer and move to the next question
            setShowCorrectAnswer(true);
            setAttempt(0);
            setIsCorrect(false);
         } else {
            // Shuffle options for a new attempt
            shuffleOptions();
         }
      }

      // Get the selected option and add the user's answer to the userAnswers array
      const selectedOption = getSelectedOption(currentQuestion.options, selectedOptionID);
      addUserAnswer(selectedOption);
      setSelectedOptionID(null);
      // setShowCorrectAnswer(true);
   };

   // Function to check if the selected answer is correct
   const checkAnswerIsCorrect = (correctOptionId, selectedOptionID) => {
      return correctOptionId === selectedOptionID;
   };

   // Function to update the score if the answer is correct
   const updateScore = () => {
      setScore((prevScore) => prevScore + 1);
   };

   // Function to get the selected option from the options array
   const getSelectedOption = (options, selectedOptionID) => {
      return options.find((option) => option.id === selectedOptionID);
   };

   // Function to add the user's answer to the userAnswers array
   const addUserAnswer = (selectedOption) => {
      const userAnswerText = selectedOption ? selectedOption.text : "Unknown answer";

      setUserAnswers((prevAnswers) => {
         // Replace the previous answer for the current question
         const updatedAnswers = [...prevAnswers];
         updatedAnswers[currentQuestionIndex] = userAnswerText;
         return updatedAnswers;
      });
   };

   // Function to move to the next question and update game state
   const moveToNextQuestion = () => {
      // Check if the quiz is finished and update game state accordingly
      if (currentQuestionIndex >= questions.data.length - 1) {
         // setIsFinished(true);
         setPlaying(false);
         setShowGame(false);
         setGameShown(true);
      } else {
         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
         setPlaying(true);
         setShowGame(false);
         setShowCorrectAnswer(false);
      }
   };

   // Reset the game state
   const handleRestart = () => {
      fetcher();
      setCurrentQuestionIndex(0);
      setQuestions({});
      setScore(0);
      setPlaying(true);
      setShowVideo(true);
      setIsFinished(false);
      setSelectedOptionID(null);
      setUserAnswers([]);
      setShowCorrectAnswer(false);
      setIsCorrect(false);
      setShowGame(false);
      setGameShown(false);
      setCurrentExerciseId(exerciseId);
      setAttempt(0);
   };

   // Function to get the video pause/Options/currentQuestion time for the current question with optional Chaning
   const timeStamp = questions?.data?.[currentQuestionIndex]?.video?.pauseTime;
   const shuffledOptions = questions?.data?.[currentQuestionIndex]?.options;
   const dutchSentence = questions?.data?.[currentQuestionIndex]?.question;
   const correctOptionId = questions?.data?.[currentQuestionIndex]?.correctOptionId;
   const correctAnswer = questions?.data?.[currentQuestionIndex]?.options.find(
      (option) => option.id === correctOptionId
   )?.text;

   const returnAchievement = () => {
      const numberOfMistakes = questions?.data?.length - score;

      if (numberOfMistakes === 0) {
         return "🥇 Goud";
      } else if (numberOfMistakes === 1) {
         return "🥈 Zilver";
      } else if (numberOfMistakes === 2) {
         return "🥉 Brons";
      } else {
         return "No prize 🫡";
      }
   };

   const audioUrl = currentQuestion?.audioUrl;
   return (
      <RolePlayContext.Provider
         value={{
            questions,
            questionLength: questions?.data?.length,
            dutchSentence: questions[currentQuestionIndex],
            currentQuestionIndex,
            correctAnswer,
            score,
            timeStamp,
            isFinished,
            playing,
            showVideo,
            showGame,
            // this is options array for the CommonVideoPlayer Component
            optionsArray: shuffledOptions,
            dutchSentence,
            selectedOptionID,
            userAnswers,
            gameShown,
            // src,
            showCorrectAnswer,
            isCorrect,
            playingAudio,
            audioUrl,
            returnAchievement,
            setPlayingAudio,
            fetcher,
            moveToNextQuestion,
            handleOptionSelect,
            setShowGame,
            setShowVideo,
            setPlaying,
            handleSubmit,
            handlePrompt,
            handleRestart,
            setIsFinished,
         }}
      >
         {children}
      </RolePlayContext.Provider>
   );
};

export { RolePlayContext, RolePlayProvider };
