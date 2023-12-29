import React, { useContext } from "react";
import GameImage from "./game-image";
import Frame2 from "../memory-games/Frame2";
import Frame3 from "../memory-games/Frame3";
import Frame4 from "../memory-games/Frame4";
import { GameCardContext } from "@/src/context/GameCardContext";
import GamePreview from "./game-preview";
import { GameContext } from "@/src/context/GameContext";
import GameResult from "../memory-games/game-result";
import Image from "next/image";

const GameCard = ({
   // serial,
   img,
   audioUrl,
   no_img,
   guessedWord,
   dutchTranslation,
   englishTranslation,
   answers,
   setAnswers,
   UserAnswers,
   serial,
   isFrame4Finished,
}) => {
   const { handleResult, isPlaying, showAll, shuffledGameData, currentCard, nextCard, resetGame, getCurrentAudioURL } =
      useContext(GameCardContext);
   const { handleStopTimer, isGameFinished, frame } = useContext(GameContext);

   const imageContainerSize = {
      objectFit: "cover",
      width: "100%",
      maxHeight: "10rem",
      minHeight: "5rem",
      marginBottom: "0.1rem",
   };
   const frame4ContainerSize = {
      objectFit: "cover",
      width: "100%",
      display: "grid",
      placeItems: "center",
      maxHeight: "24rem",
      minHeight: "20rem",
      // marginBottom: "0.1rem",
   };
   const cardBodyStyle = {
      // minHeight: "5rem",
      // vertical align center with Grid
      // display: "grid",
      // placeItems: "center",
   };

   const renderGameLogic = () => {
      if (isPlaying && !isGameFinished) {
         if (frame === 2) {
            return (
               <Frame2
                  key={serial}
                  guessedWord={guessedWord}
                  handleStopTimer={handleStopTimer}
                  handleResult={handleResult}
                  answers={answers}
                  setAnswers={setAnswers}
               />
            );
         } else if (frame === 3) {
            return (
               <Frame3
                  key={serial}
                  guessedWord={guessedWord}
                  handleStopTimer={handleStopTimer}
                  handleResult={handleResult}
                  answers={answers}
                  setAnswers={setAnswers}
               />
            );
         } else if (frame === 4) {
            return (
               <Frame4
                  key={serial}
                  guessedWord={guessedWord}
                  handleStopTimer={handleStopTimer}
                  handleResult={handleResult}
                  answers={answers}
                  setAnswers={setAnswers}
               />
            );
         }
      } else if (!isPlaying && !showAll) {
         return (
            <GamePreview
               key={serial}
               guessedWord={guessedWord}
               englishTranslation={englishTranslation}
               dutchTranslation={dutchTranslation}
               audioUrl={audioUrl}
            />
         );
      } else if (showAll && isGameFinished) {
         return (
            <GameResult
               guessedWord={guessedWord}
               result={UserAnswers[serial]}
               answers={answers}
               serial={serial}
               audioUrl={audioUrl}
            />
         );
      }
   };

   return (
      <div key={serial} className='mb-3'>
         <div className=''>
            <div className='card pb-0 pt-0 mb-5'>
               {img && (
                  <Image
                     src={img}
                     width={640}
                     height={640}
                     style={!isFrame4Finished && frame === 4 ? frame4ContainerSize : imageContainerSize}
                     className='card-img-top'
                     alt={`${img}`}
                  />
               )}
               <div className='card-body py-2 pr-0 pl-0 shadow-sm' style={cardBodyStyle}>
                  {renderGameLogic()}
               </div>
            </div>
         </div>
      </div>
   );
};

export default GameCard;
