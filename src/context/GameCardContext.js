// WE ARE ALSO IMPORTING THE GameContext TO ACCESS THE FUNCTIONS AS WELL
// FOR GAME_CARD_CONTEXT , IT WILL BE COMBINED VERSION OF GameContext

import React, { useState, useContext, useEffect } from "react";
import { GameContext } from "./GameContext";

const GameCardContext = React.createContext();

const GameCardProvider = ({ children }) => {
   const {
      handleStartTimer,
      handleStopTimer,
      isStudying,
      isPlaying,
      setIsPlaying,
      UserAnswers,
      setUserAnswers,
      game_data_length,
      showAll,
      isGameFinished,
      result,
      showResult,
      frame,
      isFinished,
      shuffledGameData,
      currentCard,
      nextCard,
      resetGame,
      isFrame4Finished,
      originalOrder,
      currentCardIndex,
      currentAudio,
   } = useContext(GameContext);

   const [modalIsOpen, setModalIsOpen] = useState(false);

   const handleMic = () => {
      alert("MICROPHONE NEEDS TO BE CONNECTED");
   };

   const handleCloseModal = () => {
      setModalIsOpen(false);
   };
   return (
      <GameCardContext.Provider
         value={{
            handleStartTimer,
            handleStopTimer,
            isPlaying,
            setIsPlaying,
            handleMic,
            handleCloseModal,
            modalIsOpen,
            isStudying,
            UserAnswers,
            setUserAnswers,
            game_data_length,
            showAll,
            result,
            showResult,
            isGameFinished,
            frame,
            isFinished,
            shuffledGameData,
            originalOrder,
            currentCard,
            nextCard,
            resetGame,
            isFrame4Finished,
            currentCardIndex,
            currentAudio,
         }}
      >
         {children}
      </GameCardContext.Provider>
   );
};
export { GameCardProvider, GameCardContext };
