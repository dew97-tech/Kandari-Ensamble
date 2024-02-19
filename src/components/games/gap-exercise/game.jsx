// React and Context Imports
import { useContext } from "react";
import { FillGapsExerciseContext } from "@/src/context/exercise-contexts/FillGapsContext";
// Animation Imports
import { motion } from "framer-motion";
// Component Imports
import CustomButton from "../components/CustomButton";
import PracticeComponent from "../components/PracticeComponent";
import DutchSentence from "../components/DutchSentence";
import GameTitle from "../components/game-title";
import GameOption from "../components/GameOption";
import { InstructionSentence } from "../components/InstructionSentence";
import PreviousAnswers from "../components/PreviousAnswers";
import CongratulationsComponent from "../components/Congratulations";
// Game Specific Imports
import Questions from "./Questions";
// Navigation Imports
import NavLinks from "../../wrapper-components/navlinks";
// External Library Imports
import Confetti from "react-confetti";

const Game = ({ exerciseTitle }) => {
   const context = useContext(FillGapsExerciseContext);

   // Game state values
   const { isGameStarted, isFinished, challengesCompleted, showCorrectAnswer, isCorrect } = context;

   // Game data values
   const {
      optionsArray,
      dutchSentence,
      currentQuestionIndex,
      userAnswers,
      sentenceLength,
      sentences,
      correctAnswer,
      score,
      audioUrl,
   } = context;

   // Game action functions
   const { handleSubmit, handlePrompt, handleGameStart, moveToNextQuestion } = context;

   // Game utility functions
   const { returnAchievement, borderColor } = context;
   const renderSubmitButton = () => (
      <CustomButton
         onClick={() => {
            handleSubmit();
         }}
         text={"Ga Door"}
         borderColor={"success"}
         placeHolder={"Submit-Icon"}
         margin={"mx-2"}
      />
   );
   const renderPracticeComponent = () => (
      <motion.div
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
         exit={{ opacity: 0, y: -10 }}
      >
         <PracticeComponent
            context={FillGapsExerciseContext}
            isCorrect={isCorrect}
            correctAnswer={correctAnswer}
            onClickFunction={moveToNextQuestion}
            audioUrl={audioUrl}
         />
      </motion.div>
   );
   const renderGameContent = () => {
      if (isGameStarted) {
         if (!challengesCompleted && !isFinished) {
            return renderGameInProgress();
         } else {
            return renderGameFinished();
         }
      } else {
         return renderGameNotStarted();
      }
   };
   const renderGameInProgress = () => (
      <section className='bone pt-10 pb-50 text-center'>
         <div className='container'>
            <div className='d-flex justify-content-center flex-nowrap'>
               <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mx-1 shadow-sm border border-secondary border-1`}
                  style={cardStyle}
               >
                  {showCorrectAnswer ? renderPracticeComponent() : renderQuestion()}
               </motion.div>
            </div>
         </div>
      </section>
   );
   const renderQuestion = () => (
      <>
         {/* <h3 className='text-start buff-text-color mb-20'>Question No : {currentQuestionIndex + 1}</h3> */}
         <DutchSentence {...{ dutchSentence }} />
         <hr className='border border-1 border-secondary opacity-25 mx-2 mt-0 mb-0 rounded' />
         <InstructionSentence
            marginTop='mt-15'
            marginBottom='mb-15'
            InstructionText='Fill the gap with the correct options below'
         />
         <Questions context={FillGapsExerciseContext} />
         <hr className='border border-1 border-secondary opacity-25 mt-10 mx-2 mb-0 rounded' />
         <GameOption gameName='gap-exercise' optionsArray={optionsArray} context={FillGapsExerciseContext} />
         <div className='text-center'>{renderSubmitButton()}</div>
      </>
   );
   const renderGameFinished = () => (
      <>
         {/* <div className='d-flex flex-column justify-content-end align-self-center'>
            <h3 className='text-start buff-text-color display-6 mb-20'>Jouw Score: {returnAchievement()}</h3>
            <PreviousAnswers
               game='GapExercise'
               previousAnswers={userAnswers}
               score={score}
               sentenceLength={sentenceLength}
               sentences={sentences}
            />
         </div>
         <div className='d-flex justify-content-between'>
            <CustomButton
               onClick={() => {
                  handlePrompt(
                     "Do you want to Restart the Game?",
                     "Your all progress will be lost !!",
                     "warning",
                     "handleRestart"
                  );
               }}
               text='Restart'
               placeHolder='Restart-Icon'
               iconText='/assets/icons/restart.gif'
               colorString='bittersweet'
               borderColor='danger'
               isImageAvailable={true}
            />
            <NavLinks />
         </div> */}
         <div className='d-flex flex-column justify-content-center align-self-center'>
            <CongratulationsComponent
               showOffCanvas={true}
               returnAchievement={returnAchievement}
               showScore={true}
               handlePrompt={handlePrompt}
            />
            {/* <h3 className='text-center buff-text-color display-6 mb-20'>Jouw Score: {returnAchievement()}</h3> */}
            {/* <PreviousAnswers
                     game={"RightOrderGame"}
                     {...{
                        previousAnswers,
                        score,
                        sentenceLength,
                        sentences,
                        currentExercise,
                     }}
                  /> */}
         </div>
      </>
   );
   const renderGameNotStarted = () => (
      <ul className='memory-game-color d-flex align-items-center justify-content-center'>
         <CustomButton
            onClick={handleGameStart}
            text='Start Game'
            placeHolder='StartGame-Icon'
            colorString='light-green py-3'
            borderColor='success'
            fontSize='h3'
         />
      </ul>
   );
   const cardStyle = {
      backgroundColor: "rgba(245, 245, 245)",
      borderRadius: "1.2rem",
      padding: "1rem",
      minWidth: "50%",
   };
   return (
      <>
         {isFinished && <Confetti duration={3000} recycle={false} numberOfPieces={1000} />}
         <section className='course-area pb-50 bone'>
            <div className='container'>
               {/* Passing gameTitle as Props */}
               <GameTitle title={exerciseTitle} />
               {renderGameContent()}
            </div>
         </section>
      </>
   );
};

export default Game;
