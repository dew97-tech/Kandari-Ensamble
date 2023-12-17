import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useLocalStorage } from "@/hooks/useLocalStorage";
// Create a context for the Fill Gaps game
const FillGapsExerciseContext = React.createContext();

// Define a provider component for the Fill Gaps game
const FillGapsExerciseProvider = ({ children, exerciseTitle, exerciseId }) => {
   const { getItem, setItem } = useLocalStorage("lessons_exercises");
   // Define state variables for the Fill Gaps game
   const [sentences, setSentences] = useState([]);
   const [currentExerciseId, setCurrentExerciseId] = useState(exerciseId);
   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
   const [textColor, setTextColor] = useState("buff-text-color");
   const [playingAudio, setPlayingAudio] = useState(null);
   const [mistake, setMistake] = useState(0); // State to track the number of mistakes for the current question

   // Video source URL
   // const src = 'https://res.cloudinary.com/debhfgo5p/video/upload/v1689683156/maison.mp4';

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
   useEffect(() => {
      const fetchData = async () => {
         setIsLoading(true);
         try {
            const res = await fetch(`/api/gaps-exercise-game/${currentExerciseId}`);
            const data = await res.json();
            setSentences(data);
         } catch (err) {
            console.error(err);
         } finally {
            setIsLoading(false);
         }
      };
      fetchData();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   // Update current question when sentences or currentQuestionIndex changes
   useEffect(() => {
      if (sentences?.data?.length > 0) {
         setCurrentQuestion(sentences?.data?.[currentQuestionIndex]);
      }
   }, [sentences, currentQuestionIndex]);

   // Exercise Progress Checker
   useEffect(() => {
      if (isFinished) {
         const storedExercises = getItem();
         const updatedExercises = [...storedExercises];
         const index = updatedExercises.findIndex((exercise) => exercise.name === exerciseTitle);
         updatedExercises[index].isFinished = true;
         setItem(updatedExercises);
      }
   }, [isFinished]);

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
      setMistake(0);
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
         console.log("score increased");
      }
   };

   // Handle incorrect answer logic
   const handleIncorrectAnswer = () => {
      setTextColor("text-danger wiggle");
      setTimeout(() => {
         setTextColor("buff-text-color");
      }, 1000);
      showFeedbackMessage("Incorrect, Please Try Again !");
   };
   // Inside the FillGapsExerciseProvider component
   const updatePreviousAnswer = (index, userAnswer) => {
      setUserAnswers((prevUserAnswers) => {
         // If we don't have an entry for this index yet, create a new one.
         if (!prevUserAnswers[index]) {
            return [...prevUserAnswers, createAnswerEntry(currentQuestion.question, userAnswer)];
         }

         // Otherwise, update the existing entry.
         return prevUserAnswers.map((answer, i) =>
            i === index ? createAnswerEntry(answer.question, userAnswer) : answer
         );
      });
   };
   // Helper function to create an answer entry object
   const createAnswerEntry = (questionTemplate, userSelectedOption) => ({
      question: questionTemplate,
      userAnswerSentence: questionTemplate.replace("___", userSelectedOption),
      actualAnswerSentence: questionTemplate.replace("___", correctAns),
   });

   const moveToNextQuestion = () => {
      setMistake(0); // Reset mistake count for a new question
      // Check if the quiz is finished and update game state accordingly
      if (currentQuestionIndex >= sentences?.data?.length - 1) {
         setIsFinished(true);
         setPlaying(false);
         // setShowGame(false);
         // setShowCorrectAnswer(false);
      } else {
         setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
         setPlaying(true);
         // setShowGame(false);
         // setShowCorrectAnswer(false);
      }
      setShowGame(false);
      setShowCorrectAnswer(false);
   };

   // Handle form submission
   const handleSubmit = () => {
      const isAnswerCorrect = selectedOption === correctAns;
      setIsCorrect(isAnswerCorrect);

      if (isAnswerCorrect) {
         handleCorrectAnswer();
         setShowCorrectAnswer(true);
         setMistake(0); // Reset mistakes since the answer is correct
      } else {
         const newMistakeCount = mistake + 1;
         setMistake(newMistakeCount);

         if (newMistakeCount > 2) {
            setShowCorrectAnswer(true);
            setMistake(0); // Prepare for the next question
         } else {
            handleIncorrectAnswer();
            setShowCorrectAnswer(false);
         }
      }

      // Always update previous answers regardless of whether it's correct or not
      updatePreviousAnswer(currentQuestionIndex, selectedOption);

      setSelectedOption(null);
   };

   const timeStamp = currentQuestion?.video?.pauseTime;

   const returnAchievement = () => {
      const numberOfMistakes = QuestionBankLen - score;

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
   // Return the Fill Gaps context provider
   return (
      <FillGapsExerciseContext.Provider
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
            challengesCompleted: currentQuestionIndex === sentences?.data?.length, // Check if all questions have been answered
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
            correctAnswer: currentQuestion?.question?.replace("___", correctAns),
            sentences,
            textColor,
            playingAudio,
            // Setters
            setPlayingAudio,
            // Functions
            returnAchievement,
            moveToNextQuestion,
            setPlaying,
            setShowGame,
            handleOptionClick,
            handleSubmit,
            handleRestart,
            handlePrompt,
            handleGameStart,
         }}
      >
         {children}
      </FillGapsExerciseContext.Provider>
   );
};

export { FillGapsExerciseProvider, FillGapsExerciseContext };
