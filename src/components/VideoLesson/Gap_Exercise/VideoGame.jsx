import React, { useContext } from "react";
import { FillGapsContext } from "@/src/context/FillGapsContext";
import PreviousAnswers from "../../games/components/PreviousAnswers";
import Confetti from "react-confetti";
import VideoPlayer from "./VideoPlayer";
import CustomButton from "../../games/components/CustomButton";
import LoadingComponent from "../../games/components/LoadingComponent";
import ErrorComponent from "../../games/components/ErrorComponent";
import useSWR from "swr";
import NavLinks from "../../wrapper-components/navlinks";
import CongratulationsComponent from "../../games/components/Congratulations";
import GameTitle from "../../games/components/game-title";
const VideoGame = ({exerciseTitle}) => {
   const { isFinished, handlePrompt, userAnswers, score, sentenceLength, sentences, fetcher, returnAchievement } =
      useContext(FillGapsContext);
   // we can use this fetcher function in other components as well
   const { data, error, isLoading } = useSWR("GapExercise", fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
   });
   // if fetching is error then we will show error component
   if (error) {
      return <ErrorComponent />;
   }
   // if fetching is loading then we will show loading component
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
                  <h3 className='text-start buff-text-color display-6 mb-20'>Jouw Score: {returnAchievement()}</h3>
                  <PreviousAnswers
                     game={"GapExercise"}
                     previousAnswers={userAnswers}
                     score={score}
                     sentenceLength={sentenceLength}
                     sentences={sentences}
                  />
               </div> */}
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
         )}
      </div>
   );
};

export default VideoGame;
