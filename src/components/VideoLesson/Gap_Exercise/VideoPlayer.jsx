import React from "react";
import { FillGapsContext } from "@/src/context/FillGapsContext";
import CommonVideoPlayer from "../components/CommonVideoPlayer";
import useSWR from "swr";
import FetchVideoSrc from "../components/FetchVideoSrc";
import ErrorComponent from "../../games/components/ErrorComponent";

const GapExerciseVideoPlayer = () => {
   // Fetch video src from API
   const { data, error } = useSWR("VideoSrc", FetchVideoSrc);
   const videoSrc = data?.src; // Access the 'src' property
   // console.log('videoSrc', videoSrc);
   if (error) {
      return <ErrorComponent />;
   }
   return (
      <CommonVideoPlayer
         context={FillGapsContext}
         gameName="gap-exercise"
         videoSrc={videoSrc}
      />
   );
};

export default GapExerciseVideoPlayer;
