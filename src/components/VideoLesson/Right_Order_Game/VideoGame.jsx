import React, { useContext, useRef } from "react";
import { RightOrderContext } from "@/src/context/RightOrderContext";
import VideoPlayer from "./VideoPlayer";
import Confetti from "react-confetti";
import PreviousAnswers from "../../games/components/PreviousAnswers";
import CustomButton from "../../games/components/CustomButton";
import ErrorComponent from "../../games/components/ErrorComponent";
import NavLinks from "../../wrapper-components/navlinks";
import useSWR from "swr";
import CongratulationsComponent from "../../games/components/Congratulations";
import OffCanvas from "../../wrapper-components/off-canvas";
import GameTitle from "../../games/components/game-title";

const VideoGame = ({ exerciseTitle }) => {
   const {
      handlePrompt,
      isFinished,
      showConfetti,
      previousAnswers,
      score,
      sentenceLength,
      sentences,
      fetcher,
      currentExercise,
      returnAchievement,
   } = useContext(RightOrderContext);
   const { error } = useSWR("RightOrderGame", fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
   });
   if (error) {
      return <ErrorComponent />;
   }

   return (
      <div>
         {isFinished && (
            <Confetti duration={3000} recycle={false} numberOfPieces={2000}/>
         )}
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
               {/* <div>
                  <OffCanvas />
               </div> */}
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
               {/* <div className='d-flex justify-content-cetner'>
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
