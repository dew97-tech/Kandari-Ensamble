import { createContext, useState, useContext, useEffect } from "react";
import Swal from "sweetalert2";
const ExpressYourselfContext = createContext();

const ExpressYourselfProvider = ({ children, exerciseId, exerciseTitle }) => {
   const [questions, setQuestions] = useState([]);
   const [currentExerciseId, setCurrentExerciseId] = useState(exerciseId);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
   const [score, setScore] = useState(0);
   const [attempts, setAttempts] = useState(0);
   const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
   const [isFinished, setIsFinished] = useState(false);
   const [showVideo, setShowVideo] = useState(true);
   const [showGame, setShowGame] = useState(false);
   const [playing, setPlaying] = useState(true); // State to manage playing prop
   const [userAnswer, setUserAnswer] = useState("");
   const [recordUserAnswers, setRecordUserAnswers] = useState([]);
   const [isCorrect, setIsCorrect] = useState(false);
   const [playingAudio, setPlayingAudio] = useState(null);
   const [gameShown, setGameShown] = useState(false);
   const [inputBorderColor, setInputBorderColor] = useState("border-secondary");

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
      const res = await fetch(`/api/express-yourself-game/${currentExerciseId}`);
      const data = await res.json();
      setQuestions(data);
      return data;
   };

   const moveToNextQuestion = () => {
      // Checking if currentIndex is the last Index ? if yes then execute otherwise proceed to next Question
      if (currentQuestionIndex === questions?.data?.length - 1) {
         // setIsFinished(true);
         setGameShown(true);
         setPlaying(false);
      } else {
         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
         setPlaying(true);
      }
      setShowCorrectAnswer(false);
      setShowGame(false);
   };
   useEffect(() => {
      if (isFinished) {
         const storedExercises = JSON.parse(localStorage.getItem("lessons_exercises"));
         const updatedExercises = [...storedExercises];
         const index = updatedExercises.findIndex((exercise) => exercise.name === exerciseTitle);
         updatedExercises[index].isFinished = true;
         localStorage.setItem("lessons_exercises", JSON.stringify(updatedExercises));
      }
   }, [isFinished]);

   // Function to handle correct answer
   const handleCorrectAnswer = () => {
      setScore((prevScore) => prevScore + 1);
      setAttempts(0);
      setShowCorrectAnswer(true);
      setIsCorrect(true);
      setInputBorderColor("border-secondary");
   };

   // Function to handle incorrect answer
   const handleIncorrectAnswer = () => {
      setAttempts((prevAttempts) => prevAttempts + 1);
      setIsCorrect(false);
      if (attempts === 2) {
         setShowCorrectAnswer(true);
         setShowGame(true);
         setAttempts(0);
      }
      // If the answer is incorrect, set the input border color to "danger" (red)
      setInputBorderColor("border-danger wiggle");
      // Reset the input border color to "secondary" after 2 seconds
      setTimeout(() => {
         setInputBorderColor("border-secondary");
      }, 1000);
   };

   // Function to check the user's answer and record it
   const checkAnswer = (evaluateAnswer) => {
      const correctAnswer = questions?.data?.[currentQuestionIndex].correctAnswer.toLowerCase();
      if (evaluateAnswer?.toLowerCase() === correctAnswer) {
         // User's answer is correct
         handleCorrectAnswer();
      } else {
         // User's answer is incorrect
         handleIncorrectAnswer();
      }
      // Find the index of the previous answer for the current question
      const previousAnswerIndex = recordUserAnswers.findIndex((answer) => answer.id === currentQuestionIndex);
      // If the previous answer exists, update it; otherwise, add a new entry
      if (previousAnswerIndex >= 0) {
         const updatedAnswers = [...recordUserAnswers];
         updatedAnswers[previousAnswerIndex].userAnswer = evaluateAnswer;
         setRecordUserAnswers(updatedAnswers);
      } else {
         // user's answer and record it
         setRecordUserAnswers((prevRecordUserAnswers) => [
            ...prevRecordUserAnswers,
            {
               id: currentQuestionIndex,
               actualAnswer: correctAnswer,
               userAnswer: evaluateAnswer,
            },
         ]);
      }
      setUserAnswer("");
   };
   // handleSubmit function to just pass the value to checkAnswer
   const handleSubmit = (answer) => {
      checkAnswer(answer);
   };

   // Function to reset the game state to its initial values
   const handleRestart = () => {
      setCurrentExerciseId(exerciseId);
      // setQuestions([]);
      setCurrentQuestionIndex(0);
      setScore(0);
      setAttempts(0);
      setShowCorrectAnswer(false);
      setIsFinished(false);
      setShowVideo(true);
      setPlaying(true);
      setShowGame(false);
      setRecordUserAnswers([]);
      setIsCorrect(false);
      setGameShown(false);
      setInputBorderColor("border-secondary");
   };

   const timeStamp = currentQuestion?.video?.pauseTime;
   // ... You can add other necessary functions for game completion, etc.
   const returnAchievement = () => {
      const numberOfMistakes = questions?.data?.length - score;

      if (numberOfMistakes === 1) {
         return "🥇 Goud";
      } else if (numberOfMistakes === 2) {
         return "🥈 Zilver";
      } else if (numberOfMistakes === 3) {
         return "🥉 Brons";
      } else {
         return "No prize 🫡";
      }
   };
   const audioUrl = currentQuestion?.audioUrl;
   return (
      <ExpressYourselfContext.Provider
         value={{
            questions,
            currentQuestionIndex,
            dutchSentence: questions?.data?.[currentQuestionIndex]?.question,
            correctAnswer: questions?.data?.[currentQuestionIndex]?.correctAnswer,
            questionLength: questions?.data?.length,
            score,
            attempts,
            showCorrectAnswer,
            timeStamp,
            isFinished,
            inputBorderColor,
            audioUrl,
            // src,
            showVideo,
            showGame,
            playing,
            userAnswer,
            recordUserAnswers,
            isCorrect,
            playingAudio,
            gameShown,
            setIsFinished,
            returnAchievement,
            setPlayingAudio,
            fetcher,
            moveToNextQuestion,
            handleSubmit,
            setUserAnswer,
            setShowGame,
            setShowVideo,
            setPlaying,
            handlePrompt,
            checkAnswer,
            // ... Add other necessary values and functions for the context
         }}
      >
         {children}
      </ExpressYourselfContext.Provider>
   );
};

export { ExpressYourselfContext, ExpressYourselfProvider };
