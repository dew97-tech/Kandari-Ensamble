import React, { useState, useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import {
   MdOutlineMic,
   MdOutlinePlayCircleFilled,
   MdOutlineStopCircle,
} from "react-icons/md";

const VoiceRecorder = ({ micHandler, isAudioPlaying }) => {
   const MicIcon = MdOutlineMic;
   const StopIcon = MdOutlineStopCircle;
   const PlayIcon = MdOutlinePlayCircleFilled;
   const {
      startRecording,
      stopRecording,
      recordingBlob,
      isRecording,
      recordingTime,
   } = useAudioRecorder(
      {
         noiseSuppression: true,
         echoCancellation: true,
      },
      (err) => micHandler()
   );
   const [isPlaying, setIsPlaying] = useState(false);
   const [recordedBlob, setRecordedBlob] = useState(null);

   const handleRecordingComplete = (blob) => {
      setRecordedBlob(blob);
   };
   const playRecording = () => {
      if (recordingBlob) {
         const audio = new Audio(URL.createObjectURL(recordingBlob));

         audio.addEventListener("play", () => {
            setIsPlaying(true);
         });

         audio.addEventListener("ended", () => {
            setIsPlaying(false);
         });

         if (!audio.paused) {
            audio.currentTime = 0;
         }
         audio.play();
      }
   };

   useEffect(() => {
      if (recordingTime === 0 && !isRecording) {
         setRecordedBlob(null);
      }
   }, [recordingTime]);

   // useEffect(() => {
   // 	if (!isRecording) {
   // 		window.alert('Microphone not connected or not accessible.');
   // 	}
   // }, [isRecording]);

   useEffect(() => {
      if (isRecording) {
         const timer = setTimeout(() => {
            stopRecording();
         }, 3000);
         return () => clearTimeout(timer);
      }
   }, [isRecording]);
   return (
      <div className="d-flex justify-content-center align-items-center">
         <button
            className={`btn btn-md buff-text-color buff py-2 px-1 mx-1 ${
               isPlaying || isAudioPlaying ? "disabled" : ""
            }`}
            onClick={isRecording ? stopRecording : startRecording}
            disabled={isAudioPlaying || isPlaying}
         >
            {isRecording ? (
               <StopIcon className="mx-2" size={20} />
            ) : (
               <MicIcon className="mx-2" size={20} />
            )}
         </button>
         <button
            className={`btn btn-md buff-text-color light-blue-secondary py-2 px-1 mx-1 ${
               isPlaying ? "disabled btn-secondary opacity-75" : ""
            }`}
            onClick={playRecording}
            disabled={!recordingBlob || isPlaying || isAudioPlaying}
         >
            <PlayIcon className="mx-2" size={20} />
         </button>
      </div>
   );
};

export default VoiceRecorder;
