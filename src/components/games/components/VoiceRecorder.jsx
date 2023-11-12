import React, { useState, useEffect } from "react";
import { useAudioRecorder } from "react-audio-voice-recorder";
import { ProgressBar } from "react-bootstrap";
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
   const [progress, setProgress] = useState(0);
   const recordDuration = 5000; // 5000 ms is the recording duration
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
         // set the timer to stop recording after 5 seconds === 5000 ms
         const timer = setTimeout(() => {
            stopRecording();
         }, recordDuration);
         return () => clearTimeout(timer);
      }
   }, [isRecording]);
   // Update the progress based on recordingTime
   useEffect(() => {
      setProgress((recordingTime / recordDuration) * 100); // 5000 ms is the recording duration
      // console.log(progress);
      // console.log(recordingTime);
   }, [recordingTime]);
   return (
      <>
         <div className='d-flex justify-content-center align-items-center'>
            <button
               className={`btn btn-md buff-text-color buff py-2 px-1 mx-1 ${
                  isPlaying || isAudioPlaying ? "disabled" : ""
               }`}
               onClick={isRecording ? stopRecording : startRecording}
               disabled={isAudioPlaying || isPlaying}
            >
               {isRecording ? (
                  <div className='d-flex flex-column'>
                     <StopIcon className='mx-1' size={20} />
                     {/* <b className='buff-text-color pt-0 pb-0 mt-0 mb-0'>
                        {(progress * 100) / 2} sec
                     </b> */}
                     <ProgressBar variant="success" animated striped now={recordingTime*25} />
                  </div>
               ) : (
                  <MicIcon className='mx-2' size={20} />
               )}
            </button>
            <button
               className={`btn btn-md buff-text-color light-blue-secondary py-2 px-1 mx-1 ${
                  isPlaying ? "disabled btn-secondary opacity-75" : ""
               }`}
               onClick={playRecording}
               disabled={!recordingBlob || isPlaying || isAudioPlaying}
            >
               <PlayIcon className='mx-2' size={20} />
            </button>
         </div>
      </>
   );
};

export default VoiceRecorder;
