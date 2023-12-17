import React, { useContext } from "react";
import { ExpressYourselfContext } from "@/src/context/ExpressYourselfContext";
import PreviousAnswers from "../../games/components/PreviousAnswers";
import Confetti from "react-confetti";
import VideoPlayer from "./VideoPlayer";
import CustomButton from "../../games/components/CustomButton";
import LoadingComponent from "../../games/components/LoadingComponent";
import ErrorComponent from "../../games/components/ErrorComponent";
import NavLinks from "../../wrapper-components/navlinks";
import CongratulationsComponent from "../../games/components/Congratulations";
import GameTitle from "../../games/components/game-title";
import useSWR from "swr";
const VideoGame = ({exerciseTitle}) => {
   // Context and state management
   const { isFinished, handlePrompt, recordUserAnswers, score, questionLength, fetcher, returnAchievement } =
      useContext(ExpressYourselfContext);
   const { data, error, isLoading } = useSWR("ExpressYourself", fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
   });
   if (error) {
      return <ErrorComponent />;
   }

   // if (isLoading || !data) {
   // 	return <LoadingComponent />;
   // }
   return (
      <div>
         {isFinished && <Confetti duration={3000} recycle={false} numberOfPieces={1000} />}
         {!isFinished ? (
            <>
               <section className='course-area bone'>
                  <div className='container'>
                     <VideoPlayer id='video-player' />
                  </div>
               </section>
            </>
         ) : (
            <>
               <div className='d-flex flex-column justify-content-center align-self-center'>
                  <GameTitle title={exerciseTitle} />
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
               {/* <div className='d-flex flex-column justify-content-center align-self-center'>
                  <h3 className='text-start buff-text-color display-6 mb-20'>Jouw Score: {returnAchievement()}</h3>
                  <PreviousAnswers
                     game={"ExpressYourself"}
                     previousAnswers={recordUserAnswers}
                     score={score}
                     sentenceLength={questionLength}
                     // sentences={questions}
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
               </div> */}
            </>
         )}
      </div>
   );
};

export default VideoGame;
