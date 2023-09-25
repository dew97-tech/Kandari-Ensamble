import React, { useContext } from "react";
import { ExpressYourselfContext } from "@/src/context/ExpressYourselfContext";
import PreviousAnswers from "../../games/components/PreviousAnswers";
import Confetti from "react-confetti";
import VideoPlayer from "./VideoPlayer";
import CustomButton from "../../games/components/CustomButton";
import LoadingComponent from "../../games/components/LoadingComponent";
import ErrorComponent from "../../games/components/ErrorComponent";
import NavLinks from "../../wrapper-components/navlinks";
import useSWR from "swr";
const VideoGame = () => {
   // Context and state management
   const {
      isFinished,
      handlePrompt,
      recordUserAnswers,
      score,
      questionLength,
      fetcher,
   } = useContext(ExpressYourselfContext);
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
         {isFinished && (
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
                     game={"ExpressYourself"}
                     previousAnswers={recordUserAnswers}
                     score={score}
                     sentenceLength={questionLength}
                     // sentences={questions}
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
