// External Libraries
import useSWR from "swr";
import { motion } from "framer-motion";
import { useContext } from "react";

// Components
import ErrorComponent from "../components/ErrorComponent";
import Confetti from "react-confetti";
import CustomButton from "../components/CustomButton";
import PreviousAnswers from "../components/PreviousAnswers";
import GameOption from "../components/GameOption";
import GameTitle from "../components/game-title";
import DutchSentence from "../components/DutchSentence";
import { InstructionSentence } from "../components/InstructionSentence";
import AnswerBox from "./answer-box";
import NavLinks from "../../wrapper-components/navlinks";
import PracticeComponent from "../components/PracticeComponent";

// Contexts
import { RightOrderExerciseContext } from "@/src/context/exercise-contexts/RightOrderContext";
import CongratulationsComponent from "../components/Congratulations";

const GameContainer = ({ exerciseTitle }) => {
   // Destructuring values from the RightOrderExerciseContext
   const {
      isGameStarted,
      handleGameStart,
      showConfetti,
      sentences,
      currentExercise,
      currentIndex,
      isFinished,
      handlePrompt,
      dutchSentence,
      optionsArray,
      handleSubmit,
      previousAnswers,
      score,
      sentenceLength,
      fetcher,
      returnAchievement,
      borderColor,
      showCorrectAnswer,
      moveToNextQuestion,
      isCorrect,
      correctAnswer,
      audioUrl,
   } = useContext(RightOrderExerciseContext);

   // Checking if all challenges are completed
   const challengesCompleted = score === sentenceLength;

   // Fetching error from useSWR hook
   const { error } = useSWR("RightOrderGame", fetcher);

   // If there is an error in fetching the data
   if (error) {
      return <ErrorComponent />;
   }

   // Style object for the card
   const cardStyle = {
      backgroundColor: "rgba(245, 245, 245)",
      borderRadius: "1.2rem",
      padding: "1rem",
      minWidth: "50%",
   };

   // Function to render the Submit button
   const renderSubmitButton = () => (
      <CustomButton
         onClick={handleSubmit}
         text={"Ga Door"}
         borderColor={"success"}
         placeHolder={"Submit-Icon"}
         margin={"mx-2"}
      />
   );

   // Function to render the question
   const renderQuestion = () => (
      <>
         {/* <h3 className='text-start buff-text-color mb-20'>Question No : {currentIndex + 1}</h3> */}
         <DutchSentence {...{ dutchSentence }} />
         <hr className='border border-1 border-secondary opacity-25 mx-2 mt-0 mb-0 rounded' />
         <InstructionSentence
            marginTop={"mt-15"}
            marginBottom={"mb-15"}
            InstructionText={"Vertaal de zin door de Franse woorden in juiste volgorde aan te klikken"}
         />
         <AnswerBox context={RightOrderExerciseContext} />
         <hr className='border border-1 border-secondary opacity-25 mt-10 mx-2 mb-0 rounded' />
         {/* Right Order Options */}
         <GameOption gameName={"right-order-game"} optionsArray={optionsArray} context={RightOrderExerciseContext} />
         <div className='text-center'>{renderSubmitButton()}</div>
      </>
   );

   // Function to render the practice component
   const renderPracticeComponent = () => (
      <motion.div
         initial={{ opacity: 0, y: -10 }}
         animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
         exit={{ opacity: 0, y: -10 }}
      >
         <PracticeComponent
            context={RightOrderExerciseContext}
            isCorrect={isCorrect}
            correctAnswer={correctAnswer}
            onClickFunction={moveToNextQuestion}
            audioUrl={audioUrl}
         />
      </motion.div>
   );

   // Function to render the game in progress
   const renderGameInProgress = () => (
      <section className='bone pt-10 pb-50 d-flex justify-content-center'>
         <div className='container'>
            <div className='d-flex justify-content-center flex-nowrap'>
               <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className={`mx-1 shadow-sm border ${borderColor} border-1`}
                  style={cardStyle}
               >
                  {showCorrectAnswer ? renderPracticeComponent() : renderQuestion()}
               </motion.div>
            </div>
         </div>
      </section>
   );

   // Function to render the game finished
   const renderGameFinished = () => (
      <>
         <div className='d-flex flex-column justify-content-center align-self-center'>
            <CongratulationsComponent
               showOffCanvas={true}
               returnAchievement={returnAchievement}
               showScore={true}
               handlePrompt={handlePrompt}
            />
            {/* <h3 className='text-center buff-text-color'>Jouw Score: {returnAchievement()}</h3> */}
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
         {/* <div className='d-flex justify-content-between'>
            <CustomButton
               onClick={() => {
                  handlePrompt(
                     "Do you want to Restart the Game?",
                     "Your all progress will be lost !!",
                     "warning",
                     "handleRestart"
                  );
               }}
               text={"Restart"}
               placeHolder={"Restart-Icon"}
               iconText={"/assets/icons/restart.gif"}
               colorString={"bittersweet"}
               borderColor={"danger"}
               isImageAvailable={true}
            />

            <NavLinks />
         </div> */}
      </>
   );

   // Function to render the game not started
   const renderGameNotStarted = () => (
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

   // Function to render the game content based on the game state
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

   // Main component render
   return (
      <>
         {isFinished && <Confetti duration={3000} recycle={false} numberOfPieces={1000} />}
         <section className='course-area pb-50 bone'>
            <div className='container'>
               <GameTitle title={exerciseTitle} />
               {renderGameContent()}
            </div>
         </section>
      </>
   );
};

export default GameContainer;
