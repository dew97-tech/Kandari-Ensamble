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
      totalStudyTime,
      handleBeginStudy,
      isStudying,
      isPlaying,
      handleBeginPlay,
      totalPlayTime,
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
   } = useContext(GameContext);

   // create a memoized version of the shuffled data:
   const shuffledGameData = useMemo(() => {
      if (sentences.length > 0) {
         return sentences.sort(() => Math.random() - 0.5);
      }
      return [];
   }, [sentences]);

   return (
      <>
         <section className='container bone'>
            <div className='container col-xl-9 col-lg-10 col-md-12 col-sm-12 p-1'>
               {/* Passing gameTitle as Props */}
               <GameTitle title={exerciseTitle} />
               {isFinished && (
                  <>
                     <Confetti duration={5000} recycle={false} numberOfPieces={2000}/>
                     <CongratulationsComponent showOffCanvas={false} />
                  </>
               )}
               {isGameStarted ? (
                  <div className='d-flex align-items-center justify-content-between mx-1 mb-15'>
                     {(isStudying || isPlaying) && (
                        <>
                           <GameTime activity={"Leertijd"} totalTime={totalStudyTime} {...{ formatTime }} />
                           <GameTime activity={"Speeltijd"} totalTime={totalPlayTime} {...{ formatTime }} />
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
                        {shuffledGameData.map(
                           (item, index) =>
                              (isStudying || isPlaying) && (
                                 <Col xl={4} lg={4} md={4} sm={4} xs={12}>
                                    <GameCard
                                       key={item.id}
                                       serial={index}
                                       gameLanguage={item.gameLanguage}
                                       img={item.img}
                                       no_img={item.no_img}
                                       guessedWord={item.guessedWord}
                                       dutchTranslation={item.translation?.dutch}
                                       englishTranslation={item.translation?.english}
                                       data_length={sentences.length}
                                       audioUrl={item.audioUrl}
                                       answers={answers[index]}
                                       setAnswers={(value) => updateAnswer(index, value)}
                                       UserAnswers={UserAnswers}
                                       frame={frame}
                                       showFrame3={showFrame3}
                                    />
                                 </Col>
                              )
                        )}
                     </Row>
                  </Container>
               </GameCardProvider>

               {/* Rendering Only if Studying or Playing -> one of them its true ,then it will execute */}
               {(isStudying || isPlaying) && (
                  <div className='memory-game-color d-flex align-items-center justify-content-end'>
                     {isPlaying && !isGameFinished && (
                        <>
                           {(frame === 2 || frame === 3 || frame === 4) && (
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
               )}
            </div>
         </section>
      </>
   );
};

export default Game;
