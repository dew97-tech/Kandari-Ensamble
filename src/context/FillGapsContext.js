import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
// Create a context for the Fill Gaps game
const FillGapsContext = React.createContext();

// Define a provider component for the Fill Gaps game
const FillGapsProvider = ({ children, exerciseTitle, exerciseId }) => {
   // Define state variables for the Fill Gaps game
   const [sentences, setSentences] = useState([]);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [currentExerciseId, setCurrentExerciseId] = useState(exerciseId);
   const [currentQuestion, setCurrentQuestion] = useState([]);
   const [selectedOption, setSelectedOption] = useState(null);
   const [isSubmitted, setIsSubmitted] = useState(false);
   const [showConfetti, setShowConfetti] = useState(false);
   const [isFinished, setIsFinished] = useState(false);
   const [score, setScore] = useState(0);
   const [isLoading, setIsLoading] = useState(true);
   const [feedbackMessage, setFeedbackMessage] = useState("");
   const [isGameStarted, setIsGameStarted] = useState(false);
   const [showVideo, setShowVideo] = useState(true);
   const [showGame, setShowGame] = useState(false);
   const [playing, setPlaying] = useState(true); // State to manage playing prop
   const [userAnswers, setUserAnswers] = useState([]); // New state to store user answers
   const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
   const [isCorrect, setIsCorrect] = useState(false);
   const [playingAudio, setPlayingAudio] = useState(null);

   // Calculate the length of sentences array
   const QuestionBankLen = sentences?.data?.length;

   // handlePrompt function
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

   // Fetch data from API when component mounts
   // Function to load questions from the API
   const fetcher = async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(`/api/gaps-exercise-game/${currentExerciseId}`);
      const data = await res.json();
      setSentences(data);
      return data;
   };

   // Update current question when sentences or currentQuestionIndex changes
   useEffect(() => {
      if (sentences?.data?.length > 0) {
         setCurrentQuestion(sentences?.data?.[currentQuestionIndex]);
      }
   }, [sentences, currentQuestionIndex]);

   // Handle game start
   const handleGameStart = () => {
      setIsGameStarted(true);
   };

   // Get correct answer for current question
   const correctAns = currentQuestion ? currentQuestion.correctAns : null;

   // Handle option click
   const handleOptionClick = (option) => {
      setSelectedOption(option);
   };

   // Handle game restart
   const handleRestart = () => {
      setCurrentQuestionIndex(0);
      setScore(0);
      showFeedbackMessage("Game Restarted");
      setUserAnswers([]);
      setSelectedOption(null);
      setIsSubmitted(false);
      setIsFinished(false);
      setShowConfetti(false);
      setShowCorrectAnswer(false);
      setShowGame(false);
      setIsGameStarted(false);
      setPlaying(true);
      setShowVideo(true);
      setTimeout(() => {
         setFeedbackMessage("");
      }, 2000);
   };

   // Show feedback message for a given duration
   const showFeedbackMessage = (message) => {
      setFeedbackMessage(message);
      setTimeout(() => {
         setFeedbackMessage("");
      }, 2000);
   };

   // Handle correct answer logic
   const handleCorrectAnswer = () => {
      if (score < sentences?.data?.length) {
         setScore(score + 1);
      }
   };

   // Handle incorrect answer logic
   const handleIncorrectAnswer = () => {
      showFeedbackMessage("Incorrect, Please Try Again !");
   };
   // Inside the FillGapsProvider component
   const updatePreviousAnswer = (question, userAnswer, actualAnswer) => {
      // Create a new string by replacing ___ with the selected option
      const userAnswerSentence = question?.replace("___", userAnswer);

      // Create a new string by replacing ___ with the actual answer
      const actualAnswerSentence = question?.replace("___", actualAnswer);

      // Update userAnswers array with the full sentences
      setUserAnswers((prevUserAnswers) => [
         ...prevUserAnswers,
         { userAnswerSentence, actualAnswerSentence },
      ]);
   };

   // Function to move to the next question and update game state
   const moveToNextQuestion = () => {
      // Check if the quiz is finished and update game state accordingly
      if (currentQuestionIndex >= sentences?.data?.length - 1) {
         setIsFinished(true);
         setPlaying(false);
         setShowGame(false);
      } else {
         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
         setPlaying(true);
         setShowGame(false);
         setShowCorrectAnswer(false);
      }
   };

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

   // Handle form submission
   const handleSubmit = () => {
      if (selectedOption === correctAns) {
         handleCorrectAnswer();
         setIsCorrect(true);
      } else {
         handleIncorrectAnswer();
         setIsCorrect(false);
      }
      updatePreviousAnswer(
         currentQuestion.question,
         selectedOption,
         correctAns
      );
      setSelectedOption(null);
      setShowCorrectAnswer(true);
   };

   const timeStamp = currentQuestion?.video?.pauseTime;
   // console.log("Options array: ", currentQuestion?.options);
   // Return the Fill Gaps context provider
   return (
      <FillGapsContext.Provider
         value={{
            currentQuestionIndex,
            selectedOption,
            isSubmitted,
            currentQuestion,
            showConfetti,
            isFinished,
            score,
            feedbackMessage,
            isGameStarted,
            challengesCompleted: currentQuestionIndex === sentences.length, // Check if all questions have been answered
            sentenceLength: QuestionBankLen, // Length of sentences array
            // src,
            optionsArray: currentQuestion?.options,
            isCorrect,
            showVideo,
            showGame,
            playing,
            userAnswers,
            showCorrectAnswer,
            isLoading,
            timeStamp,
            dutchSentence: currentQuestion?.hintSentence,
            userAnswers,
            correctAnswer: currentQuestion?.question?.replace(
               "___",
               correctAns
            ),
            sentences,
            playingAudio,
            setPlayingAudio,
            // Functions
            fetcher,
            moveToNextQuestion,
            setPlaying,
            setShowGame,
            handleOptionClick,
            handleSubmit,
            handleRestart,
            handlePrompt,
            handleGameStart,
            setShowVideo,
         }}
      >
         {children}
      </FillGapsContext.Provider>
   );
};

export { FillGapsProvider, FillGapsContext };
