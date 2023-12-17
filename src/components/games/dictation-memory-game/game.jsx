import { useContext } from "react";
import Confetti from "react-confetti";
import GameTitle from "../components/game-title";
import GameBody from "../components/game-body";
import CustomButton from "../components/CustomButton";
import { DictationGameContext } from "@/src/context/DictationContext";
import GameContainer from "./game-container";
import NavLinks from "../../wrapper-components/navlinks";

const DictationMemoryGame = () => {
   const {
      currentSentence,
      score,
      goNext,
      showNextFrame,
      mistake,
      isGameOver,
      feedbackMessage,
      handleGameStart,
      showConfetti,
      isGameStarted,
      challengesCompleted,
      QuestionBankLen,
      isFinished,
      handleRestart,
      answers,
      UserAnswers,
      updateAnswer,
      currentWordIndex,
      shuffledWords,
      handlePrompt,
      showResult,
      isSequenceEnd,
      returnAchievement,
   } = useContext(DictationGameContext);
   // Handles Submit Alert Button Props
   const handleSubmitAll = () => {
      handlePrompt(
         "Do you want to submit the answers ?",
         "You won't be able to revert this!",
         "question",
         "handleSubmitAll"
      );
   };
   // Card Style
   const cardStyle = {
      backgroundColor: "rgba(245, 245, 245)",
      borderRadius: "1.2rem",
      padding: "1rem",
   };
   const renderGameBody = () => {
      return (
         <GameBody
            game={"dictation-game"}
            mistake={mistake}
            showNextFrame={showNextFrame}
            sentenceLength={QuestionBankLen}
            currentQuestion={currentSentence}
            answers={answers}
            currentWordIndex={currentWordIndex}
            UserAnswers={UserAnswers}
            updateAnswer={updateAnswer}
            // shuffledWords={shuffledWords}
            shuffledWords={shuffledWords.map((word) => word.word)}
            showResult={showResult}
         />
      );
   };
   // Submit Answer Section
   const renderSubmitButton = () => {
      return (
         <CustomButton
            onClick={handleSubmitAll}
            text={"Submit"}
            placeHolder={"Submit-Icon"}
            colorString={"buff py-2"}
            borderColor={"warning"}
         />
      );
   };
   // Proceed to Next Sequence Section
   const renderProceedButton = () => {
      return (
         <CustomButton
            onClick={goNext}
            text={"Proceed"}
            placeHolder={"Proceed-Icon"}
            iconText={"/assets/icons/fast-forward.gif"}
            colorString={"c-color-green py-2"}
            borderColor={"success"}
            isImageAvailable={true}
         />
      );
   };
   // Restart Game Section
   const renderGameOverSection = () => {
      return (
         <section className='tp-category-area bone bg-bottom grey-bg pt-50 pb-50 text-center'>
            <div className='section-title mb-30 memory-game-color'>
               <h3 className='buff-text-color display-4 mb-20'>
                  {isGameOver ? `Game Over ! Keep Practicing` : `Thanks for Playing ! Happy Learning`}
               </h3>
               <h3 className='buff-text-color display-4 mb-20'>Jouw Score: {returnAchievement()}</h3>
               <div className='d-flex justify-content-between'>
                  <CustomButton
                     onClick={handleRestart}
                     text={"Restart"}
                     placeHolder={"Restart-Icon"}
                     iconText={"/assets/icons/restart.gif"}
                     colorString={"bittersweet"}
                     borderColor={"danger"}
                     isImageAvailable={true}
                  />
                  <NavLinks />
               </div>
            </div>
         </section>
      );
   };
   // Start Game Section
   const renderGameStartSection = () => {
      return (
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
      );
   };

   return (
      <>
         {showConfetti && <Confetti duration={3000} recycle={false} numberOfPieces={1000} />}
         <section className='course-area pt-50 pb-200 bone'>
            <div className='container'>
               <GameTitle title='Dictation Memory Game' />
               {isGameStarted ? (
                  <>
                     {!challengesCompleted && !isFinished ? (
                        <section className='bone pt-10 pb-50 text-center'>
                           <div className='container pb-50'>
                              <div className='mx-1 shadow-sm border border-secondary border-2' style={cardStyle}>
                                 <GameContainer />
                                 {isSequenceEnd && showNextFrame && !showResult && renderSubmitButton()}
                                 {showResult && renderProceedButton()}
                              </div>
                           </div>
                        </section>
                     ) : (
                        renderGameOverSection()
                     )}
                  </>
               ) : (
                  renderGameStartSection()
               )}
            </div>
         </section>
      </>
   );
};

export default DictationMemoryGame;
