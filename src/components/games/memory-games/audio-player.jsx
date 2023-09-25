import React, { useState, useContext, useEffect, useRef } from "react";
import { MdVolumeUp, MdPause } from "react-icons/md";

const AudioPlayer = ({
   audioUrl,
   context,
   rounded,
   buttonSize,
   setIsAudioPlaying,
}) => {
   const { playingAudio, setPlayingAudio } = useContext(context);
   // Create a reference to the audio element
   const audioRef = useRef(null);
   // State to track if the current sound is playing
   const [isSoundPlaying, setIsSoundPlaying] = useState(false);

   // Add an event listener for when the audio playback ends
   useEffect(() => {
      const audio = audioRef.current;
      const handleEnded = () => {
         setIsSoundPlaying(false);
         setIsAudioPlaying ? setIsAudioPlaying(false) : null;
         if (playingAudio === audio) setPlayingAudio(null);
      };

      audio.addEventListener("ended", handleEnded);
      // Cleanup function to remove the event listener
      return () => audio.removeEventListener("ended", handleEnded);
   }, [playingAudio]);

   // Function to handle play and pause behavior of the audio element
   const handleSound = () => {
      const audio = audioRef.current;
      if (playingAudio === audio) {
         stopAndReset(audio);
      } else {
         if (playingAudio) stopAndReset(playingAudio);
         play(audio);
         setIsAudioPlaying ? setIsAudioPlaying(true) : null;
      }
   };
   // Function to stop and reset the given audio element
   const stopAndReset = (audioElement) => {
      audioElement.pause();
      audioElement.currentTime = 0;
      setIsSoundPlaying(false);
      setPlayingAudio(null);
      setIsAudioPlaying ? setIsAudioPlaying(false) : null;
   };
   // Function to play the given audio element
   const play = (audioElement) => {
      audioElement.play();
      setIsSoundPlaying(true);
      setPlayingAudio(audioElement);
   };

   return (
      <div>
         {/* Audio control button */}
         <button
            type="button"
            className={`btn btn-md mx-1 py-2  ${
               playingAudio === audioRef.current && isSoundPlaying
                  ? "bittersweet"
                  : "light-blue-secondary"
            } ${rounded ? rounded : "rounded"} 
                ${buttonSize ? buttonSize : "btn"} shadow-sm buff-text-color`}
            onClick={handleSound}
         >
            {playingAudio === audioRef.current && isSoundPlaying ? (
               <MdPause size={20} />
            ) : (
               <MdVolumeUp size={20} />
            )}
         </button>
         {/* Audio element */}
         <audio src={audioUrl} ref={audioRef} />
      </div>
   );
};

export default AudioPlayer;
