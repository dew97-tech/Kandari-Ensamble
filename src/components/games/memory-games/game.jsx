import React, { useContext, useMemo } from "react";
import our_game_data from "@/src/data/memory-game-data";
import GameTitle from "../components/game-title";
import GameTime from "../components/game-time";
import GameCard from "../components/game-card";
import CustomButton from "../components/CustomButton";
import { GameContext } from "@/src/context/GameContext";
import { GameCardProvider } from "@/src/context/GameCardContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Confetti from "react-confetti";
import CongratulationsComponent from "../components/Congratulations";

const Game = ({ exerciseTitle }) => {
   const {
      sentences,
      isStudying,
      isPlaying,
      handleBeginPlay,
      answers,
      handleSubmitAll,
      updateAnswer,
      UserAnswers,
      isGameFinished,
      isGameStarted,
      handleGameStart,
      formatTime,
      frame,
      showFrame3,
      handlePrompt,
      isFinished,
      studyTotalSeconds,
      playTotalSeconds,
      shuffledGameData,
      currentCard,
      originalOrder,
      nextCard,
      resetGame,
      isFrame4Finished,
      currentCardIndex,
      returnAchievement,
      mistakes,
   } = useContext(GameContext);

   // create a memoized version of the shuffled data:
   const randomizedGameData = useMemo(() => {
      if (sentences.length > 0) {
         return sentences.sort(() => Math.random() - 0.5);
      }
      return [];
   }, [sentences]);
   // Extracted function to provide common props to GameCard
   function cardProps(item, index) {
      const shuffledData = frame >= 4 ? originalOrder[index] : shuffledGameData[index];
      // const shuffledData = shuffledGameData[index];

      return {
         serial: index,
         gameLanguage: shuffledData?.gameLanguage,
         img: shuffledData?.img,
         no_img: shuffledData?.no_img,
         guessedWord: shuffledData?.guessedWord,
         dutchTranslation: shuffledData?.translation?.dutch,
         englishTranslation: shuffledData?.translation?.english,
         data_length: sentences?.length,
         audioUrl: shuffledData?.audioUrl,
         answers: answers[index],
         setAnswers: (value) => updateAnswer(index, value),
         UserAnswers: UserAnswers,
         frame: frame,
         showFrame3: showFrame3,
      };
   }

   return (
      <>
         <section className='container bone'>
            <div className='container col-xl-9 col-lg-10 col-md-12 col-sm-12 p-1'>
               {/* Passing gameTitle as Props */}
               <GameTitle title={exerciseTitle} />
               {isFinished && (
                  <>
                     <div className='d-flex align-items-center justify-content-between mx-1 mb-15'>
                        <GameTime activity={"Leertijd"} totalTime={studyTotalSeconds} {...{ formatTime }} />
                        <GameTime activity={"Speeltijd"} totalTime={playTotalSeconds} {...{ formatTime }} />
                     </div>
                     <Confetti duration={3000} recycle={false} numberOfPieces={3000} />
                     <CongratulationsComponent
                        showOffCanvas={false}
                        handlePrompt={handlePrompt}
                        showScore={true}
                        returnAchievement={returnAchievement}
                        mistakes={mistakes}
                     />
                  </>
               )}
               {isGameStarted ? (
                  <div className='d-flex align-items-center justify-content-between mx-1 mb-15'>
                     {(isStudying || isPlaying) && (
                        <>
                           <GameTime activity={"Leertijd"} totalTime={studyTotalSeconds} {...{ formatTime }} />
                           <GameTime activity={"Speeltijd"} totalTime={playTotalSeconds} {...{ formatTime }} />
                        </>
                     )}
                  </div>
               ) : (
                  <ul className='memory-game-color d-flex align-items-center justify-content-center'>
                     <CustomButton
                        onClick={handleGameStart}
                        text={"Start Game"}
                        placeHolder={"StartGame-Icon"}
                        colorString={"light-green py-3"}
                        borderColor={"success"}
                        fontSize={"h3"}
                     />
                  </ul>
               )}
               <GameCardProvider>
                  <Container className='col-xl-12 col-lg-12 col-md-12 col-sm-12'>
                     <Row>
                        {frame !== 4 ? (
                           // Render GameCard for frames 1 to 3
                           shuffledGameData.map(
                              (item, index) =>
                                 (isStudying || isPlaying) && (
                                    <Col xl={4} lg={4} md={4} sm={4} xs={12} key={index}>
                                       <GameCard {...cardProps(item, index)} />
                                    </Col>
                                 )
                           )
                        ) : (
                           // Render GameCard for frame 4
                           <>
                              {isFrame4Finished
                                 ? // Render GameCard for frame 4 when finished
                                   originalOrder.map(
                                      (item, index) =>
                                         (isStudying || isPlaying) && (
                                            <Col xl={4} lg={4} md={4} sm={4} xs={12} key={index}>
                                               <GameCard {...cardProps(item, index)} />
                                            </Col>
                                         )
                                   )
                                 : // Render GameCard for frame 4 while playing
                                   isPlaying &&
                                   currentCard && (
                                      <div className='d-flex align-items-center justify-content-center'>
                                         <Col xl={8} lg={8} md={12} sm={12} xs={12} key={currentCardIndex}>
                                            <GameCard
                                               {...cardProps(currentCard, currentCardIndex)}
                                               isFrame4Finished={isFrame4Finished}
                                            />
                                         </Col>
                                      </div>
                                   )}
                           </>
                        )}
                     </Row>
                  </Container>
               </GameCardProvider>
               {/* Rendering Only if Studying or Playing -> one of them its true ,then it will execute */}
               {(isStudying || isPlaying) && (
                  <>
                     <div className='memory-game-color d-flex align-items-center justify-content-end'>
                        {isPlaying && !isGameFinished && (
                           <>
                              {(frame === 2 || frame === 3) && (
                                 <CustomButton
                                    onClick={() => {
                                       handleSubmitAll();
                                    }}
                                    text={"Verstuur"}
                                    placeHolder={"Submit-Icon"}
                                    colorString={"buff py-2"}
                                    borderColor={"warning"}
                                 />
                              )}
                           </>
                        )}
                        {(!isPlaying || isGameFinished) && (
                           <CustomButton
                              onClick={() => {
                                 isStudying && frame === 1
                                    ? handlePrompt("Ben je klaar met leren ?", "", "question", "handleBeginPlay")
                                    : handleBeginPlay();
                              }}
                              text={"Ga door"}
                              placeHolder={"Proceed-Icon"}
                              iconText={"/assets/icons/fast-forward.gif"}
                              colorString={"c-color-green py-2"}
                              borderColor={"success"}
                              isImageAvailable={true}
                           />
                        )}
                     </div>
                     <div className='memory-game-color d-flex align-items-center justify-content-center'>
                        {frame === 4 && (
                           <CustomButton
                              onClick={() => {
                                 nextCard();
                              }}
                              text={"Volgende"}
                              placeHolder={"Next-Icon"}
                              colorString={"buff py-2"}
                              borderColor={"warning"}
                           />
                        )}
                     </div>
                  </>
               )}
            </div>
         </section>
      </>
   );
};

export default Game;
