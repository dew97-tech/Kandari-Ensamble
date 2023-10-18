import React, { useContext } from "react";
import CommonVideoPlayer from "../components/CommonVideoPlayer";
import { DialogueAnimationContext } from "@/src/context/DialogueAnimationVideo";
import useSWR from "swr";
import FetchVideoSrc from "../components/FetchVideoSrc";
import ErrorComponent from "../../games/components/ErrorComponent";
import Confetti from "react-confetti";
import CongratulationsComponent from "../../games/components/Congratulations";
const StudyDialogueVideoPlayer = () => {
   const { isFinished } = useContext(DialogueAnimationContext);

   // Fetch video src from API
   const { data, error } = useSWR("VideoSrc", FetchVideoSrc);

   const videoSrc = data?.src; // Access the 'src' property
   // console.log('videoSrc', videoSrc);

   if (error) {
      return <ErrorComponent />;
   }

   return (
      <>
         {isFinished ? (
            <>
               <Confetti
                  duration={5000}
                  recycle={false}
                  numberOfPieces={2000}
               />
               <CongratulationsComponent />
            </>
         ) : (
            <CommonVideoPlayer
               context={DialogueAnimationContext}
               gameName='dialogue-animation-video'
               videoSrc={videoSrc}
            />
         )}
      </>
   );
};

export default StudyDialogueVideoPlayer;
