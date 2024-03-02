// General Imports
import React from "react";
import Link from "next/link";
// Parent Components
import CustomButton from "./CustomButton";
import PracticeComponent from "./PracticeComponent";
import GameOption from "./GameOption";
// Gap-Exercise Imports
import Questions from "../gap-exercise/Questions";
import FillGapsOptions from "../gap-exercise/Options";
// Right-Order-Game Imports
import AnswerBox from "../right-order-game/answer-box";
import WordBox from "../right-order-game/WordBox";
// Dictatio-Memory-Game Imports
import GameContainer from "../dictation-memory-game/game-container";
// Role-Play Imports
import Options from "../role-play-game/Options";
// Express-Yourself Imports
import InputSection from "../express-yourself-game/InputSection";
import DutchSentence from "./DutchSentence";
import { InstructionSentence } from "./InstructionSentence";
// Study the Dialogue Box
import DialogueBox from "./dialogueBox";
// Sound Library Imports
import FrenchInputSection from "../sound-library-exercise/input-section";

const GameBody = ({
   context,
   game,
   optionsArray,
   handleSubmit,
   correctAnswer,
   moveToNextQuestion,
   showCorrectAnswer,
   isCorrect,
   dutchSentence,
   moveNext,
   movePrevious,
   toggleScreen,
   checkedItems,
   handlePrompt,
   showGame,
   audioUrl,
}) => {
   // Common Section for some specific Video Lesson games which includes Dutch Sentence and Instruction Sentence
   const renderCommonSections = (instructionText) => (
      <>
         <DutchSentence {...{ dutchSentence }} />
         <hr className='border border-1 border-secondary opacity-25 mx-2 mt-0 mb-0 rounded' />
         <InstructionSentence marginTop={"mt-15"} marginBottom={"mb-15"} InstructionText={instructionText} />
      </>
   );

   // Common Section for all games which includes Submit Button
   const renderSubmitButton = () => (
      <CustomButton
         onClick={() => {
            handleSubmit();
         }}
         text={"Verstuur"}
         borderColor={"success"}
         placeHolder={"Submit-Icon"}
         margin={"mx-2"}
      />
   );

   // Renders the PracticeComponent for showing correctness and moving to the next question
   const renderPracticeComponent = () => (
      <PracticeComponent
         context={context}
         isCorrect={isCorrect}
         correctAnswer={correctAnswer}
         onClickFunction={moveToNextQuestion}
         audioUrl={audioUrl}
      />
   );

   // Proceed to Next Sequence Section
   const renderProceedButton = (buttonText, isChecked) => {
      return (
         <CustomButton
            onClick={moveNext}
            text={buttonText}
            placeHolder={"Proceed-Icon"}
            iconText={"/assets/icons/fast-forward.gif"}
            colorString={"c-color-green py-2"}
            borderColor={"success"}
            isImageAvailable={true}
            disabled={!isChecked}
         />
      );
   };
   const renderPromptButton = (buttonText, isChecked, promptText) => {
      return (
         <CustomButton
            onClick={() => handlePrompt(promptText)}
            text={buttonText}
            placeHolder={"Proceed-Icon"}
            iconText={"/assets/icons/fast-forward.gif"}
            colorString={"c-color-green py-2"}
            borderColor={"success"}
            isImageAvailable={true}
            disabled={!isChecked}
         />
      );
   };
   const cardStyle = {
      backgroundColor: "rgba(245, 245, 245)",
      borderRadius: "1.2rem",
      padding: "1rem",
   };
   return (
      <div className='d-flex justify-content-center flex-nowrap'>
         <div className='mx-1 shadow-sm border border-secondary border-2' style={cardStyle}>
            {/* Gap-Exercise Game */}
            {game === "gap-exercise" && (
               <>
                  {showCorrectAnswer ? (
                     renderPracticeComponent()
                  ) : (
                     <>
                        {renderCommonSections("Klik het juiste woord aan")}
                        <Questions context={context} />
                        <hr className='border border-1 border-secondary opacity-25 mt-10 mx-2 mb-0 rounded' />
                        {/* Gap-Exercise Options */}
                        <GameOption gameName={game} optionsArray={optionsArray} context={context} />
                        <div className='text-center'>{renderSubmitButton()}</div>
                     </>
                  )}
               </>
            )}
            {/* Dictation Game */}
            {game === "dictation-game" && (
               <>
                  {/* {renderCommonSections()} */}
                  <GameContainer />
               </>
            )}
            {/* Role Play Game */}
            {game === "role-play-game" && (
               <>
                  {showCorrectAnswer ? (
                     renderPracticeComponent()
                  ) : (
                     <>
                        {renderCommonSections()}
                        {/* Role Play Options */}
                        <GameOption gameName={game} optionsArray={optionsArray} />
                        <div className='text-center'>{renderSubmitButton()}</div>
                     </>
                  )}
               </>
            )}
            {/* Express Yourself Game */}
            {game === "express-yourself-game" && (
               <>
                  {showCorrectAnswer ? (
                     renderPracticeComponent()
                  ) : (
                     <>
                        {renderCommonSections("Vertaal deze zin naar het Frans:")}
                        <div className='d-flex flex-column text-center'>
                           <InputSection />
                        </div>
                     </>
                  )}
               </>
            )}
            {/* Study The Game */}
            {game === "study-the-dialogue" && (
               <>
                  {/* as there is no DutchSentence in this exercise, so we are simply passing text as a prop of DutchSentence */}
                  <DutchSentence dutchSentence={"Zeg de vorige zin na"} />
                  <hr className='border border-1 border-secondary opacity-25 mx-2 mt-0 mb-0 rounded' />
                  <DialogueBox gameName={game} moveNext={moveNext} movePrevious={movePrevious} />
               </>
            )}
            {/* Sound Library Game */}
            {game === "sound-library" && (
               <>
                  <h2 className='text-center mb-0 buff-text-color'>Klankenbibliotheek</h2>
                  <hr className='border border-1 border-secondary opacity-25 mt-0 mb-0 rounded' />
                  <>
                     {toggleScreen ? (
                        <InstructionSentence
                           marginTop={"mt-15"}
                           marginBottom={"mb-20"}
                           InstructionText={"Select all the words you want to place in the sound library"}
                        />
                     ) : (
                        <InstructionSentence
                           marginTop={"mt-15"}
                           marginBottom={"mb-20"}
                           InstructionText={"Write the French Translation of the Dutch words below:"}
                        />
                     )}
                  </>

                  <FrenchInputSection />

                  <div className='text-start'>
                     {!toggleScreen ? (
                        <div className='mt-10 text-end mx-2'>{renderProceedButton("Verstuur", true)}</div>
                     ) : (
                        <div className='mt-10 text-end mx-2'>
                           {renderPromptButton(
                              "Add to Sound Library",
                              checkedItems.length > 0,
                              "RedirectToSoundLibrary"
                           )}
                        </div>
                     )}
                  </div>
               </>
            )}
            {/* Right Order Game */}
            {!game && (
               <>
                  {showCorrectAnswer ? (
                     renderPracticeComponent()
                  ) : (
                     <>
                        {showGame && (
                           <>
                              {renderCommonSections(
                                 "Vertaal de zin door de Franse woorden in juiste volgorde aan te klikken"
                              )}
                              <AnswerBox context={context} />
                              <hr className='border border-1 border-secondary opacity-25 mt-10 mx-2 mb-0 rounded' />
                              {/* Right Order Options */}
                              <GameOption gameName={"right-order-game"} optionsArray={optionsArray} context={context} />
                              <div className='text-center'>{renderSubmitButton()}</div>
                           </>
                        )}
                     </>
                  )}
               </>
            )}
         </div>
      </div>
   );
};

export default React.memo(GameBody);
