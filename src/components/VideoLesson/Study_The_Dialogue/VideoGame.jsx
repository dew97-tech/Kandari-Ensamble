import React, { useContext } from "react";
import { StudyDialogueContext } from "@/src/context/StudyDialogueContext";
// import PreviousAnswers from '../../games/components/PreviousAnswers';
import Confetti from "react-confetti";
import VideoPlayer from "./VideoPlayer";
import CustomButton from "../../games/components/CustomButton";
import GameTitle from "../../games/components/game-title";
import LoadingComponent from "../../games/components/LoadingComponent";
import ErrorComponent from "../../games/components/ErrorComponent";
import useSWR from "swr";
import CongratulationsComponent from "../../games/components/Congratulations";
const VideoGame = () => {
   const {
      handlePrompt,
      isFinished,
      questionLength,
      score,
      userAnswers,
      slides,
      fetcher,
   } = useContext(StudyDialogueContext);
   // we can use this fetcher function in other components as well
   const { data, error, isLoading } = useSWR("StudyTheDialogue", fetcher, {
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
         {isFinished && (
            <Confetti duration={3000} recycle={false} numberOfPieces={800} />
         )}
         {!isFinished ? (
            <>
               <section className="course-area pt-50 pb-200 mb-200 mt-100 bone">
                  <div className="container">
                     <VideoPlayer id="video-player" />
                  </div>
               </section>
            </>
         ) : (
            <>
               <CongratulationsComponent showOffCanvas={false} />

               {/* <CustomButton
						onClick={() => {
							handlePrompt(
								'Do you want to Restart the Game?',
								'Your all progress will be lost !!',
								'warning',
								'handleRestart'
							);
						}}
						text={'Restart'}
						placeHolder={'Restart-Icon'}
						iconText={'/assets/icons/restart.gif'}
						colorString={'bittersweet'}
						borderColor={'danger'}
						isImageAvailable={true}
					/> */}
            </>
         )}
      </div>
   );
};

export default VideoGame;
