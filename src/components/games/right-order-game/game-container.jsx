// Common Components
import useSWR from "swr";
import ErrorComponent from "../components/ErrorComponent";
import LoadingComponent from "../components/LoadingComponent";
import Confetti from "react-confetti";
import CustomButton from "../components/CustomButton";
import PreviousAnswers from "../components/PreviousAnswers";
import GameOption from "../components/GameOption";
// Contexts Imports
import { useContext } from "react";
import { RightOrderExerciseContext } from "@/src/context/exercise-contexts/RightOrderContext";
// Exercise Components Imports
import GameTitle from "../components/game-title";
import DutchSentence from "../components/DutchSentence";
import { InstructionSentence } from "../components/InstructionSentence";
import AnswerBox from "./answer-box";
import NavLinks from "../../wrapper-components/navlinks";
const GameContainer = () => {
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
   } = useContext(RightOrderExerciseContext);
   const { isLoading, error } = useSWR("RightOrderGame", fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      revalidateOnReconnect: true,
   });
   if (error) {
      return <ErrorComponent />;
   }
   // if (isLoading) {
   // 	return (
   // 		<section className="course-area pt-50 pb-200 mb-200 mt-100 bone">
   // 			<div className="container">
   // 				<LoadingComponent />;
   // 			</div>
   // 		</section>
   // 	);
   // }

   const cardStyle = {
      backgroundColor: "rgba(245, 245, 245)",
      borderRadius: "1.2rem",
      padding: "1rem",
      minWidth: "50%",
   };
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
   const challengesCompleted = currentIndex === sentenceLength;
   return (
      <>
         {showConfetti && (
            <Confetti duration={3000} recycle={false} numberOfPieces={800} />
         )}
         <section className='course-area bone'>
            <div className='container'>
               {/* Passing gameTitle as Props */}
               <GameTitle title='Place in Right Order' />
               {isGameStarted ? (
                  <>
                     {!challengesCompleted && !isFinished ? (
                        <section className='bone pt-10 pb-50 d-flex justify-content-center'>
                           <div className='container'>
                              <div className='d-flex justify-content-center flex-nowrap'>
                                 <div
                                    className='mx-1 shadow-sm border border-secondary border-2'
                                    style={cardStyle}
                                 >
                                    <h3 className='text-start buff-text-color mb-20'>
                                       Question No : {currentIndex + 1}
                                    </h3>
                                    <DutchSentence {...{ dutchSentence }} />
                                    <hr className='border border-1 border-secondary opacity-25 mx-2 mt-0 mb-0 rounded' />
                                    <InstructionSentence
                                       marginTop={"mt-15"}
                                       marginBottom={"mb-15"}
                                       InstructionText={
                                          "Translate the sentence to French from the options below"
                                       }
                                    />
                                    <AnswerBox
                                       context={RightOrderExerciseContext}
                                    />
                                    <hr className='border border-1 border-secondary opacity-25 mt-10 mx-2 mb-0 rounded' />
                                    {/* Right Order Options */}
                                    <GameOption
                                       gameName={"right-order-game"}
                                       optionsArray={optionsArray}
                                       context={RightOrderExerciseContext}
                                    />
                                    <div className='text-center'>
                                       {renderSubmitButton()}
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </section>
                     ) : (
                        isFinished && (
                           <>
                              <div className='d-flex flex-column justify-content-end align-items-end'>
                                 <PreviousAnswers
                                    game={"RightOrderGame"}
                                    {...{
                                       previousAnswers,
                                       score,
                                       sentenceLength,
                                       sentences,
                                       currentExercise,
                                    }}
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
                        )
                     )}
                  </>
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
            </div>
         </section>
      </>
   );
};

export default GameContainer;
