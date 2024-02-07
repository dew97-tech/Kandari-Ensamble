import React, { useEffect, useState } from "react";
// import sentences from '@/src/data/dictation-game';
import Swal from "sweetalert2";
const DictationGameContext = React.createContext();

const DictationGameProvider = ({ children, exerciseTitle }) => {
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
   const [feedbackMessage, setFeedbackMessage] = useState("");
   const [shuffledWords, setShuffledWords] = useState([]);
   const [answers, setAnswers] = useState([]);
   const [UserAnswers, setUserAnswers] = useState([]);
   const [showResult, setShowResult] = useState(false);
   const [heartEmojis, setHeartEmojis] = useState(["❤︎", "❤︎", "❤︎", "❤︎", "❤︎"]);
   // States for True False Component
   const [isCorrect, setIsCorrect] = useState(null);
   const [selectedOption, setSelectedOption] = useState(null);
   const [isSelectionMade, setIsSelectionMade] = useState(false);
   const [countdown, setCountdown] = useState(null); // Starting countdown from 4
   // Options Array of Answers with Correct Answer and Wrong Answer
   const [options, setOptions] = useState([]);
   // const [wordIndex, setWordIndex] = useState(0);
   const [word, setWord] = useState("");
   // Function to remove a heart emoji from the lifeline
   const removeHeart = () => {
      if (heartEmojis.length - 1 > 0) {
         setHeartEmojis((prevHeartEmojis) => {
            const newHeartEmojis = [...prevHeartEmojis];
            newHeartEmojis.pop();
            // newHeartEmojis.unshift('💔');
            return newHeartEmojis;
         });
      } else {
         console.log("Game Over");
         setFeedbackMessage("Game Over !");
         setIsFinished(true);
         setIsGameOver(true);
         setShowConfetti(false);
         // setHeartEmojis(["❤︎", "❤︎", "❤︎", "❤︎", "❤︎"]);
         setTimeout(() => {
            setFeedbackMessage("");
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
         /* Read more about isConfirmed, isDenied below */
         if (result.isConfirmed) {
            if (promptType === "handleSubmitAll") {
               handleSubmitAll();
            } else if (promptType === "goNext") {
               goNext();
            }
         }
      });
   };
   const handleSubmitAll = () => {
      var mistakes = 0;
      let score = 0;
      const wordTotal = currentSentence?.words;

      // If there are answers, compare them with the correct answers from the backend
      if (answers.length > 0) {
         console.log("Answer:", answers);
         for (let count = 0; count < wordTotal.length; count++) {
            // Find the correct answer for the current word
            const correctAnswer = wordTotal[count].answer.find((ans) => ans.isCorrect).text;

            if (answers[count].toLowerCase() === correctAnswer.toLowerCase()) {
               handleResult("correct", count);
               score += 1;
            } else {
               handleResult("wrong", count);
               mistakes += 1;
            }
         }
      } else {
         // If there are no answers, every word in the current sentence is a mistake
         mistakes += currentSentence?.words?.length || 0;
      }
      console.log("Mistakes:", mistakes);

      // Remove hearts based on the number of mistakes
      for (let i = 0; i < mistakes; i++) {
         removeHeart();
         if (mistakes >= 4) {
            setFeedbackMessage("Game Over !");
            setIsFinished(true);
            setIsGameOver(true);
            setShowConfetti(false);
            setTimeout(() => {
               setFeedbackMessage("");
            }, 2000);
         }
      }

      setShowResult(true);
      setMistake((prevMistake) => prevMistake + mistakes);
      setScore((prevScore) => prevScore + score);
   };

   const handleResult = (message, index) => {
      if (message === "correct") {
         // setScore(score + 1);
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
         // shuffleWords(sentences[currentSentenceIndex]);
         setWord(sentences[currentSentenceIndex].words[currentWordIndex].word);
         // Assuming you want to populate options with the answers of the current word pair
         const currentWordAnswers = sentences[currentSentenceIndex].words[currentWordIndex].answer;

         setOptions(currentWordAnswers);
         // setAnswers(Array(sentences[currentSentenceIndex].words[currentWordIndex].length).fill(""));
         // console.log("options:", currentWordAnswers);
         // console.log("sentences:", sentences);
         // console.log("api resolved");
      }
   }, [sentences, currentSentenceIndex, currentWordIndex]);

   // Exercise Progress Checker
   useEffect(() => {
      if (isFinished) {
         const storedExercises = JSON.parse(localStorage.getItem("lessons_exercises"));
         const updatedExercises = [...storedExercises];
         const index = updatedExercises.findIndex((exercise) => exercise.name === exerciseTitle);
         updatedExercises[index].isFinished = true;
         localStorage.setItem("lessons_exercises", JSON.stringify(updatedExercises));
      }
   }, [isFinished]);

   const fetchData = async () => {
      setIsLoading(true);
      try {
         const res = await fetch("/api/dictation-memory-game");
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
         // setCurrentSentenceIndex(currentSentenceIndex + 1);
         setCurrentSentence(sentences[currentSentenceIndex + 1]);
         shuffleWords(sentences[currentSentenceIndex + 1]);
         // Move on to the next sentence index
         setCurrentSentenceIndex(currentSentenceIndex + 1);
         setCurrentWordIndex(0); // Reset word index to 0 for the new sentence
         setIsSequenceEnd(false);
      } else {
         // alert('Game Over');
         setFeedbackMessage("Congratulations ! All challenges are completed");
         setIsFinished(true);
         setIsGameOver(false);
         setShowConfetti(true);
         setTimeout(() => {
            setFeedbackMessage("");
         }, 2000);
         // Show final score or option to play again
      }
   };

   // Get the AudioURL
   const audioUrl = currentSentence?.words?.[currentWordIndex]?.audioUrl;

   const goNext = () => {
      if (currentSentence.words && currentSentence.words.length - 1 === currentWordIndex && !isSequenceEnd) {
         // When a words array is finished traversing -> then we are resetting the word index to 0
         !isSequenceEnd && (setShowNextFrame(true), setIsSequenceEnd(true));
         // setShowNextFrame(true);
         // console.log("i am in if condition");
      } else if (isSequenceEnd) {
         // console.log("i am in else if condition");
         setShowResult(false);
         setAnswers([]);
         setUserAnswers([]);
         setIsSequenceEnd(false);
         setShowNextFrame(false);
         handleNextButtonClick();
      } else {
         // console.log("i am in else condition");
         setCurrentWordIndex(currentWordIndex + 1);
      }
   };

   const handleRestart = () => {
      setIsFinished(false);
      setShowConfetti(false);
      setScore(0);
      setHeartEmojis(["❤︎", "❤︎", "❤︎", "❤︎", "❤︎"]);
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
      setWord([]);
      setOptions([]);
      setShuffledWords([]);
      setFeedbackMessage("");
   };
   const monitorMistake = () => {
      console.log(mistake);
      if (mistake === 4) {
         setFeedbackMessage("Game Over !");
         setIsFinished(true);
         setIsGameOver(true);
         setShowConfetti(false);
         setTimeout(() => {
            setFeedbackMessage("");
         }, 2000);
      }
   };
   let timeoutId = null;
   const handleWordClick = (word, optionText) => {
      // Find the correct word object based on the clicked word
      const wordObj = currentSentence.words.find((wordObj) => wordObj.word === word);
      // console.log("Filtered Word Object", wordObj);
      if (wordObj) {
         // Check if the selected optionText is the correct word
         const isCorrect = wordObj.answer.find((answer) => answer.text === optionText).isCorrect;

         setIsCorrect(isCorrect);

         if (isCorrect) {
            setFeedbackMessage("Correct! Good Job");
            timeoutId = setTimeout(() => {
               setFeedbackMessage("");
               setIsCorrect(null);
               if (timeoutId) {
                  clearTimeout(timeoutId);
               }
            }, 3000);
            // Rest of the code
         } else {
            setFeedbackMessage("Sorry! Wrong Answer");
            timeoutId = setTimeout(() => {
               setFeedbackMessage("");
               setIsCorrect(null);
               if (timeoutId) {
                  clearTimeout(timeoutId);
               }
            }, 3000);
         }
      }

      // Clear the timeout if it exists
      if (timeoutId) {
         clearTimeout(timeoutId);
      }

      const startCountdown = () => {
         setCountdown(3); // Reset countdown for each question
         // setShowNextFrame(true);
         const intervalId = setInterval(() => {
            setCountdown((prevCount) => {
               if (prevCount > 1) {
                  return prevCount - 1;
               } else {
                  clearInterval(intervalId);
                  setCountdown(null);
                  goNext(); // Move to the next question after countdown finishes
                  setIsCorrect(null);
                  setSelectedOption(null);
                  setIsSelectionMade(false);
                  return 4; // Reset countdown after finishing
               }
            });
         }, 1000); // Update countdown every second
      };
      startCountdown();
   };

   const returnAchievement = () => {
      console.log(score);
      if (score >= 4) {
         return "🥇";
      } else if (score === 3) {
         return "🥈";
      } else if (score === 2) {
         return "🥉";
      } else {
         return "No prize 🫡";
      }
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
            currentSentenceIndex,
            goNext,
            handleRestart,
            setPlayingAudio,
            handleNextButtonClick,
            handleWordClick,
            handleGameStart,
            goNext,
            returnAchievement,
            // word: shuffledWords[currentWordIndex]?.word,
            word,
            answers,
            UserAnswers,
            updateAnswer,
            currentWordIndex,
            shuffledWords,
            handlePrompt,
            showResult,
            isSequenceEnd,
            heartEmojis,
            options,
            isGameOver,
            isCorrect,
            selectedOption,
            setSelectedOption,
            isSelectionMade,
            setIsSelectionMade,
            timeoutId,
            countdown,
         }}
      >
         {children}
      </DictationGameContext.Provider>
   );
};
export { DictationGameProvider, DictationGameContext };
