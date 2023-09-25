import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";
import GameBody from "../../games/components/game-body";
import { useFullscreen } from "ahooks";
import { FaDoorOpen } from "react-icons/fa";
import LoadingComponent from "../../games/components/LoadingComponent";
import OffCanvas from "../../wrapper-components/off-canvas";
// import NavLinks from "../../wrapper-components/navlinks";
import CustomPlayIcon from "./CustomPlayIcon";

const CommonVideoPlayer = ({
   context,
   gameName,
   videoSrc,
   additionalOptions = {},
}) => {
   const {
      optionsArray,
      moveToNextQuestion,
      showCorrectAnswer,
      correctAnswer,
      timeStamp,
      handleSubmit,
      playing,
      setPlaying,
      showVideo,
      setShowVideo,
      setShowGame,
      showGame,
      // src,
      isCorrect,
      dutchSentence,
      // StudyDialogueContext,
      currentSlideStartTime,
      setIsFinished,
      moveNext,
   } = useContext(context);

   const videoPlayerContainerRef = useRef(null);
   const videoRef = useRef(null);
   const intervalRef = useRef(null);
   const [isLoading, setIsLoading] = useState(true);
   const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(
      videoPlayerContainerRef,
      {
         pageFullscreen: true,
      }
   );
   // SeekToStartTime is only for Study the Dialogue Exercise
   const seekToStartTime = () => {
      if (videoRef.current) {
         videoRef.current.seekTo(currentSlideStartTime, "seconds");
         console.log("seeking to start time", currentSlideStartTime);
         setPlaying(true); // Start playing after seeking
         setShowGame(false);
         clearInterval(intervalRef.current);
      }
   };
   const handleFinish = () => {
      setIsFinished(true);
      setShowVideo(false);
      setPlaying(false);
   };

   const handlePlay = () => {
      setPlaying(true);
      setIsLoading(false);
   };

   // Pause the video at the given time stamp and show the game component
   const pauseVideoAtTime = (time) => {
      const currentTime = videoRef?.current?.getCurrentTime();
      const roundedCurrentTime = Math.round(currentTime * 1000) / 1000; // Round to 3 decimal points
      if (gameName === "study-the-dialogue") {
         if (
            (videoRef.current && roundedCurrentTime === time) ||
            (roundedCurrentTime >= time && !showGame && playing)
         ) {
            console.log("pausing video at time", time);
            console.log("rounded Current Time", roundedCurrentTime);
            setPlaying(false);
            setShowGame(true);
            clearInterval(intervalRef.current);
         }
      } else {
         // console.log('pausing video at time', time);
         // console.log('rounded Current Time', roundedCurrentTime);
         if (
            (videoRef.current && roundedCurrentTime === time) ||
            (roundedCurrentTime >= time && !showGame && playing)
         ) {
            console.log("pausing video at time", time);
            console.log("rounded Current Time", roundedCurrentTime);
            setPlaying(false);
            setShowGame(true);
            clearInterval(intervalRef.current);
         }
      }
   };

   useEffect(() => {
      if (playing || showVideo) {
         enterFullscreen();
         const interval = setInterval(() => pauseVideoAtTime(timeStamp), 5);
         intervalRef.current = interval;
         return () => clearInterval(interval);
      }
      return () => {
         clearInterval(intervalRef.current);
      };
   }, [showVideo, playing, timeStamp]);

   return (
      <>
         {isLoading && <LoadingComponent />}
         <div ref={videoPlayerContainerRef} className="video-player-container">
            <div className="video-wrapper">
               {showVideo && isFullscreen && (
                  <>
                     <div className="lesson-path-button">
                        <OffCanvas />
                     </div>
                     <ReactPlayer
                        ref={videoRef}
                        className="video"
                        url={videoSrc}
                        playing={playing}
                        width="100%"
                        height="100%"
                        previewTabIndex={1}
                        nodownload="true"
                        playIcon={<CustomPlayIcon />}
                        light="/assets/img/banner/maison.jpg"
                        onReady={() => {
                           handlePlay();
                        }}
                        onEnded={() => {
                           handleFinish();
                        }}
                        fallback={<LoadingComponent />}
                     />
                  </>
               )}
            </div>

            <div
               className={`d-flex flex-column justify-content-center game-wrapper ${
                  showGame ? "show" : ""
               }`}
            >
               {isFullscreen && showGame && (
                  <>
                     <GameBody
                        context={context}
                        game={gameName}
                        optionsArray={optionsArray}
                        handleSubmit={handleSubmit}
                        showCorrectAnswer={showCorrectAnswer}
                        correctAnswer={correctAnswer}
                        moveToNextQuestion={moveToNextQuestion}
                        isCorrect={isCorrect}
                        dutchSentence={dutchSentence}
                        moveNext={moveNext}
                        movePrevious={seekToStartTime}
                        {...additionalOptions}
                     />
                  </>
               )}
            </div>
            <div className="toggle-fullscreen-button">
               <Link href="/">
                  <FaDoorOpen size={30} />
               </Link>
            </div>
         </div>
      </>
   );
};

export default React.memo(CommonVideoPlayer);
