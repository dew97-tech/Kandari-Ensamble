import React, { useState, useContext, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import ReactPlayer from "react-player/lazy";
import GameBody from "../../games/components/game-body";
import { useFullscreen, useDocumentVisibility, useSize } from "ahooks"; // Import the useDocumentVisibility hook
import { FaDoorOpen } from "react-icons/fa";
import LoadingComponent from "../../games/components/LoadingComponent";
import OffCanvas from "../../wrapper-components/off-canvas";
// import NavLinks from "../../wrapper-components/navlinks";
import CustomPlayIcon from "./CustomPlayIcon";
import ErrorComponent from "../../games/components/ErrorComponent";

const CommonVideoPlayer = ({ context, gameName, videoSrc, additionalOptions = {} }) => {
   // Document Visibility Hook for pausing the video when the tab is not active
   const documentVisibility = useDocumentVisibility();
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
      gameShown,
      // src,
      isCorrect,
      dutchSentence,
      // StudyDialogueContext,
      currentSlideStartTime,
      currentSlidePauseTime,
      setIsFinished,
      moveNext,
      audioUrl,
   } = useContext(context);

   const videoPlayerContainerRef = useRef(null);
   const videoRef = useRef(null);
   const intervalRef = useRef(null);
   const [isLoading, setIsLoading] = useState(true);
   const [showError, setShowError] = useState(false);
   const [isFullscreen, { enterFullscreen, exitFullscreen }] = useFullscreen(videoPlayerContainerRef, {
      pageFullscreen: true,
   });

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

   const handleError = () => {
      setPlaying(false);
      setIsLoading(false);
      setShowError(true);
   };

   const pauseVideoAtTime = (time) => {
      const currentTime = videoRef?.current?.getCurrentTime();
      const roundedCurrentTime = Math.round(currentTime * 1000) / 1000; // Round to 3 decimal points
      // const buffer = 0.001; // Adjust this value as needed
      if (gameName === "study-the-dialogue") {
         if ((videoRef.current && roundedCurrentTime >= time) || (roundedCurrentTime >= time && !showGame && playing)) {
            console.log("pausing video at time", time);
            console.log("rounded Current Time", roundedCurrentTime);
            setPlaying(false);
            setShowGame(true);
            cancelAnimationFrame(intervalRef.current);
         } else {
            intervalRef.current = requestAnimationFrame(() => pauseVideoAtTime(time));
         }
      } else {
         if (videoRef.current && roundedCurrentTime >= time && !showGame && playing && !gameShown) {
            console.log("pausing video at time", time);
            console.log("rounded Current Time", roundedCurrentTime);
            setPlaying(false);
            setShowGame(true);
            cancelAnimationFrame(intervalRef.current);
         } else {
            intervalRef.current = requestAnimationFrame(() => pauseVideoAtTime(time));
         }
      }
   };
   useEffect(() => {
      if (documentVisibility === "hidden" && !showGame) {
         // Page is not visible, pause the video immediately
         setPlaying(false);
      } else if (documentVisibility === "visible" && !showGame) {
         // Page is visible, play the video
         setPlaying(true);
      } else {
         // Page is visible but showGame is true, pause the video
         setPlaying(false);
      }
   }, [documentVisibility, showGame]);

   useEffect(() => {
      console.log("useEffect triggered"); // Added console log
      if (playing || showVideo) {
         enterFullscreen();
         intervalRef.current = requestAnimationFrame(() => pauseVideoAtTime(timeStamp));
      }
      return () => {
         cancelAnimationFrame(intervalRef.current);
      };
   }, [showVideo, timeStamp, playing, showGame]);

   // Check if videoSRC is loaded if not fire the ErrorComponent after sometime

   return (
      <>
         {isLoading && <LoadingComponent />}
         {showError && <ErrorComponent />}
         <div ref={videoPlayerContainerRef} className='video-player-container'>
            <div className='video-wrapper '>
               {showVideo && isFullscreen && (
                  <>
                     <div className='lesson-path-button'>
                        <OffCanvas />
                     </div>
                     <div>
                        <ReactPlayer
                           ref={videoRef}
                           className='video '
                           url={videoSrc}
                           playing={playing}
                           width='100%'
                           height='100%'
                           previewTabIndex={1}
                           nodownload='true'
                           playIcon={<CustomPlayIcon />}
                           light='/assets/img/banner/maison_thumbnail.png'
                           onReady={() => {
                              handlePlay();
                           }}
                           onEnded={() => {
                              handleFinish();
                           }}
                           onError={() => {
                              handleError();
                           }}
                           // fallback={<LoadingComponent />}
                        />
                     </div>
                  </>
               )}
            </div>

            <div className={`d-flex flex-column justify-content-center game-wrapper ${showGame ? "show" : ""}`}>
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
                        showGame={showGame}
                        audioUrl={audioUrl}
                        {...additionalOptions}
                     />
                  </>
               )}
            </div>
            <div className='toggle-fullscreen-button'>
               <Link href='/'>
                  <FaDoorOpen size={30} />
               </Link>
            </div>
         </div>
      </>
   );
};

export default React.memo(CommonVideoPlayer);
