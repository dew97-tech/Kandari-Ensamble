import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const VisualMemoryGameContext = React.createContext();

const VisualMemoryGameProvider = ({ children, exerciseTitle }) => {
   const [selectedCards, setSelectedCards] = useState([]);
   const [glowingCards, setGlowingCards] = useState([]);
   const [isMatch, setIsMatch] = useState(false);
   const [isGlowing, setIsGlowing] = useState(false);
   const [isGameStarted, setIsGameStarted] = useState(false);
   const [gameData, setGameData] = useState([]);
   const [isLoading, setIsLoading] = useState(true);
   const [level, setLevel] = useState(3); // Level refers to how many tiles are glow up in the Game ?
   const [heartMistakeCount, setHeartMistakeCount] = useState(0);
   const [sequenceCount, setSequenceCount] = useState(1);
   const [isLevelUpdated, setIsLevelUpdated] = useState(false); // New state variable
   const [isSequenceUpdated, setIsSequenceUpdated] = useState(false); // New state variable
   const [isGameOver, setIsGameOver] = useState(false);
   const [isGameFinished, setIsGameFinished] = useState(false);
   const [heartEmojis, setHeartEmojis] = useState(["❤︎", "❤︎", "❤︎"]);

   const levels = [
      { levelObj: 6, speed: 950 },
      { levelObj: 7, speed: 900 },
      { levelObj: 8, speed: 850 },
      { levelObj: 9, speed: 800 },
      { levelObj: 10, speed: 750 },
      { levelObj: 11, speed: 700 },
      { levelObj: 12, speed: 650 },
      { levelObj: 13, speed: 600 },
      { levelObj: 14, speed: 550 },
      { levelObj: 15, speed: 500 },
   ];
   // Function to remove a heart emoji from the lifeline
   const removeHeart = () => {
      if (heartEmojis.length > 0) {
         const newHeartEmojis = [...heartEmojis];
         newHeartEmojis.pop();
         // newHeartEmojis.unshift('♡');
         setHeartEmojis(newHeartEmojis);
      } else {
         setIsGameOver(true);
         setHeartEmojis(["❤︎", "❤︎", "❤︎"]);
      }
   };

   const handleMistake = () => {
      if (heartMistakeCount === 2) {
         setIsGameOver(true);
      } else {
         // Decrease level if it's not already at the minimum level (3 in this case)
         setLevel((prevLevel) => (level === 3 ? prevLevel : prevLevel - 1));

         // Increment mistake count
         setHeartMistakeCount(heartMistakeCount + 1); // Increment heart mistake count

         // Reset sequence count, selected cards, and update flags
         setSequenceCount(1);
         setSelectedCards([]);
         setIsSequenceUpdated(true);
         setIsLevelUpdated(true);
      }
   };

   const handleComplexity = () => {
      const glowCount = getGlowingCount();

      const newGlowingCards = [];

      while (newGlowingCards.length < glowCount) {
         const randomIndex = Math.floor(Math.random() * gameData.length);
         const lastGlowingIndex = newGlowingCards[newGlowingCards.length - 1];
         if (newGlowingCards.length === 0 || randomIndex !== lastGlowingIndex) {
            if (
               sequenceCount > 0 &&
               newGlowingCards.length > sequenceCount &&
               newGlowingCards[newGlowingCards.length - sequenceCount - 1] ===
                  randomIndex
            ) {
               continue;
            }
            newGlowingCards.push(randomIndex);
         }
      }

      return newGlowingCards;
   };

   const handlePrompt = (title, text, iconType, time, promptType) => {
      Swal.fire({
         icon: iconType,
         title,
         text,
         showConfirmButton: true,
         confirmButtonColor: "#87b0e6",
         allowOutsideClick: false,
         allowEscapeKey: false,
      }).then((result) => {
         if (result.isConfirmed) {
            switch (promptType) {
               case "handleMistake":
                  // console.log('I fired inside Mistake');
                  handleMistake();
                  removeHeart();
                  break;
               case "startGame":
                  if (sequenceCount === 0) {
                     // console.log('My level is:', level);
                     level === 15
                        ? setIsGameFinished(true)
                        : (setSequenceCount(1),
                          setLevel((prevLevel) => prevLevel + 1),
                          console.log("Level Incremented"));
                  } else {
                     // console.log('I am fired inside the else');
                     setSequenceCount(
                        (prevSequenceCount) => prevSequenceCount - 1
                     );
                  }

                  // Update flags
                  setIsSequenceUpdated(true);
                  setIsLevelUpdated(true);
                  break;
               default:
                  // console.log('User did not click OK');
                  break;
            }
         }
      });
   };

   const getGlowingCount = () => {
      return level;
   };

   const startGame = () => {
      setSelectedCards([]);
      setIsMatch(false);
      setIsGlowing(true);

      const newGlowingCards = handleComplexity();
      const currentLevel = level;
      const speed =
         levels.find((level) => level.levelObj === currentLevel)?.speed || 1000;

      let currentIndex = 0;
      const intervalId = setInterval(() => {
         setSelectedCards([newGlowingCards[currentIndex]]);
         currentIndex++;

         if (currentIndex >= newGlowingCards.length) {
            clearInterval(intervalId);
            setTimeout(() => {
               setSelectedCards([]);
               setIsGlowing(false);
            }, 1000);
         }
      }, speed);

      console.log("Glowed Tiles were : ", newGlowingCards);
      setGlowingCards(newGlowingCards);
   };

   const fetchData = async () => {
      setIsLoading(true);
      try {
         const res = await fetch("/api/visual-memory-game");
         const data = await res.json();
         setGameData(data);
      } catch (err) {
         console.log(err);
      } finally {
         setIsLoading(false);
      }
   };

   useEffect(() => {
      if (isGameStarted) {
         startGame();
      }
   }, [isGameStarted]);

   useEffect(() => {
      if (isLevelUpdated) {
         startGame();
         setIsLevelUpdated(false);
         setIsSequenceUpdated(false);
      }
      // console.log('I am fired inside USEEFFECT');
   }, [isLevelUpdated, isSequenceUpdated]);

   // Exercise Progress Checker
   useEffect(() => {
      if (isGameFinished) {
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
   }, [isGameFinished]);

   const handleGameStart = async () => {
      try {
         await fetchData();
         setIsGameStarted(true);
      } catch (err) {
         console.log(err);
      }
   };

   const handleCardClick = (index) => {
      if (isMatch) return;

      if (!glowingCards.includes(index)) {
         handlePrompt(
            "Try again !",
            "It was not part of the sequence.",
            "error",
            "800",
            "handleMistake"
         );
         return;
      }

      // if (selectedCards.includes(index) || selectedCards.indexOf(index) !== -1) {
      //     handlePrompt(
      //         'Duplicate Card !',
      //         'Please choose different card',
      //         'warning',
      //         '1000'
      //         // 'none'
      //     );
      //     return;
      // }

      setSelectedCards([...selectedCards, index]);

      if (selectedCards.length === glowingCards.length - 1 && !isMatch) {
         // Fixed to use length of glowingCards
         const isMatching =
            level >= 6 && sequenceCount === 0 // Check if the current level is less than 6
               ? selectedCards.every(
                    (selectedCard, index) =>
                       selectedCard ===
                       glowingCards[glowingCards.length - 1 - index]
                 )
               : selectedCards.every(
                    (selectedCard, index) =>
                       selectedCard === glowingCards[index]
                 );
         setIsMatch(isMatching);

         if (isMatching) {
            setTimeout(() => {
               setSelectedCards(glowingCards);
               handlePrompt(
                  "Congratulations!",
                  `${
                     level >= 6 && sequenceCount === 1
                        ? "Now answer in opposite order"
                        : "Your answer was correct"
                  }`,
                  "success",
                  "1000",
                  "startGame"
               );
            }, 200);
         } else {
            handlePrompt(
               "Incorrect !",
               "Your sequence was wrong ",
               "error",
               "1000",
               "handleMistake"
            );
         }
      }
   };
   const returnAchievement = () => {
      if (level >= 6) {
         return "🥇 Gold";
      } else if (level === 5) {
         return "🥈 Silver";
      } else if (level === 4) {
         return "🥉 Bronze";
      } else if (level === 3) {
         return "No prize 🫡";
      }
   };

   return (
      <VisualMemoryGameContext.Provider
         value={{
            isGameFinished,
            isGameStarted,
            glowingCards,
            isMatch,
            selectedCards,
            isGlowing,
            isLoading,
            gameData,
            level,
            heartMistakeCount,
            isGameOver,
            setLevel,
            handleGameStart,
            handleCardClick,
            returnAchievement,
            heartEmojis,
         }}
      >
         {children}
      </VisualMemoryGameContext.Provider>
   );
};

export { VisualMemoryGameProvider, VisualMemoryGameContext };
