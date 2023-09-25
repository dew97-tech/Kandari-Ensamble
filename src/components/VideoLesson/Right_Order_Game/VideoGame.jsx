import React, { useContext } from "react";
import { RightOrderContext } from "@/src/context/RightOrderContext";
import VideoPlayer from "./VideoPlayer";
import Confetti from "react-confetti";
import PreviousAnswers from "../../games/components/PreviousAnswers";
import CustomButton from "../../games/components/CustomButton";
import ErrorComponent from "../../games/components/ErrorComponent";
import NavLinks from "../../wrapper-components/navlinks";
import useSWR from "swr";
const VideoGame = () => {
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
   } = useContext(RightOrderContext);
   const { error } = useSWR("RightOrderGame", fetcher, {
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateOnMount: true,
      revalidateOnReconnect: false,
   });
   if (error) {
      return <ErrorComponent />;
   }

   return (
      <div>
         {showConfetti && (
            <Confetti duration={3000} recycle={false} numberOfPieces={800} />
         )}
         {!isFinished ? (
            <>
               <section className="course-area bone">
                  <div className="container">
                     <VideoPlayer id="video-player" />
                  </div>
               </section>
            </>
         ) : (
            <>
               <div className="d-flex flex-column justify-content-end align-items-end">
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
      </div>
   );
};

export default VideoGame;
