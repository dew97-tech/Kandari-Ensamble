import React, { useContext } from "react";
import { RolePlayContext } from "@/src/context/RolePlayContext";
import PreviousAnswers from "../../games/components/PreviousAnswers";
import Confetti from "react-confetti";
import VideoPlayer from "./VideoPlayer";
import CustomButton from "../../games/components/CustomButton";
import LoadingComponent from "../../games/components/LoadingComponent";
import ErrorComponent from "../../games/components/ErrorComponent";
import NavLinks from "../../wrapper-components/navlinks";
import useSWR from "swr";
import CongratulationsComponent from "../../games/components/Congratulations";
import GameTitle from "../../games/components/game-title";
const VideoGame = ({ exerciseTitle }) => {
   const { handlePrompt, isFinished, questionLength, score, userAnswers, questions, fetcher, returnAchievement } =
      useContext(RolePlayContext);
   const { data, error, isLoading } = useSWR("RolePlayGame", fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      revalidateOnMount: true,
   });
   if (error) {
      return <ErrorComponent />;
   }

   // if (isLoading || !data) {
   // 	return <LoadingComponent />;
   // }
   return (
      <div>
         {isFinished && <Confetti duration={3000} recycle={false} numberOfPieces={800} />}
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
                  <h1 className='text-start buff-text-color display-6'>Jouw Score: {returnAchievement()}</h1>
                  <PreviousAnswers
                     game={"RolePlayGame"}
                     previousAnswers={userAnswers}
                     score={score}
                     sentenceLength={questionLength}
                     sentences={questions}
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
