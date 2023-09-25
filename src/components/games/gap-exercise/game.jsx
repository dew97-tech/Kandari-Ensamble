// Context Imports
import { useContext } from "react";
import { FillGapsExerciseContext } from "@/src/context/exercise-contexts/FillGapsContext";
// Common Components Imports
import CustomButton from "../components/CustomButton";
import Confetti from "react-confetti";
import DutchSentence from "../components/DutchSentence";
import GameTitle from "../components/game-title";
import GameOption from "../components/GameOption";
import { InstructionSentence } from "../components/InstructionSentence";
import PreviousAnswers from "../components/PreviousAnswers";
// Gap Exercise Imports
import Questions from "./Questions";
import NavLinks from "../../wrapper-components/navlinks";

const Game = () => {
   const {
      optionsArray,
      handleSubmit,
      handlePrompt,
      challengesCompleted,
      isFinished,
      score,
      QuestionBankLen,
      isGameStarted,
      handleGameStart,
      dutchSentence,
      currentQuestionIndex,
      userAnswers,
      sentenceLength,
      sentences,
   } = useContext(FillGapsExerciseContext);
   const renderSubmitButton = () => (
      <CustomButton
         onClick={() => {
            handleSubmit();
         }}
         text={"Submit"}
         borderColor={"success"}
         placeHolder={"Submit-Icon"}
         margin={"mx-2"}
      />
   );
   const cardStyle = {
      backgroundColor: "rgba(245, 245, 245)",
      borderRadius: "1.2rem",
      padding: "1rem",
   };
   return (
      <>
         {isFinished && (
            <Confetti duration={3000} recycle={false} numberOfPieces={800} />
         )}
         <section className="course-area pb-200 bone">
            <div className="container">
               {/* Passing gameTitle as Props */}
               <GameTitle title="Gaps Exercise" />
               {isGameStarted ? (
                  <>
                     {!challengesCompleted && !isFinished ? (
                        <section className="bone pt-10 pb-50 text-center">
                           <div className="container">
                              <div className="d-flex justify-content-center flex-nowrap">
                                 <div
                                    className="mx-1 shadow-sm border border-secondary border-1"
                                    style={cardStyle}
                                 >
                                    <h3 className="text-start buff-text-color mb-20">
                                       Question No : {currentQuestionIndex + 1}
                                    </h3>
                                    {/* Render Common Components */}
                                    <DutchSentence {...{ dutchSentence }} />
                                    <hr className="border border-1 border-secondary opacity-25 mx-2 mt-0 mb-0 rounded" />
                                    <InstructionSentence
                                       marginTop={"mt-15"}
                                       marginBottom={"mb-15"}
                                       InstructionText={
                                          "Fill the gap with the correct options below"
                                       }
                                    />
                                    <Questions
                                       context={FillGapsExerciseContext}
                                    />
                                    <hr className="border border-1 border-secondary opacity-25 mt-10 mx-2 mb-0 rounded" />
                                    {/* Gap-Exercise Options */}
                                    <GameOption
                                       gameName={"gap-exercise"}
                                       optionsArray={optionsArray}
                                       context={FillGapsExerciseContext}
                                    />
                                    <div className="text-center">
                                       {renderSubmitButton()}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </section>
                     ) : (
                        <>
                           <div className="d-flex flex-column justify-content-end align-items-end">
                              <PreviousAnswers
                                 game={"GapExercise"}
                                 previousAnswers={userAnswers}
                                 score={score}
                                 sentenceLength={sentenceLength}
                                 sentences={sentences}
                              />
                           </div>
                           <div className="d-flex justify-content-between">
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
                           </div>
                        </>
                     )}
                  </>
               ) : (
                  <ul className="memory-game-color d-flex align-items-center justify-content-center">
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
            </div>
         </section>
      </>
   );
};

export default Game;
// Fill the Gaps with Appropriate Word
