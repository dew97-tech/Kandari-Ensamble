import React, { useState } from "react";
import CustomButton from "./CustomButton";
import { MdOutlineCheck, MdClose, MdVolumeUp, MdOutlineMic } from "react-icons/md";
import AudioPlayer from "../memory-games/audio-player";
import VoiceRecorder from "./VoiceRecorder";

const PracticeComponent = ({ isCorrect, correctAnswer, onClickFunction, context, audioUrl }) => {
   // is MicAvailable is used to check whether the user has recorded the voice or not
   const [isMicAvailable, setIsMicAvailable] = useState(false);
   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
   const micHandler = () => {
      setIsMicAvailable(true);
   };
   console.log("Correct Answer:", correctAnswer);
   const result = isCorrect ? "Juist!" : "Onjuist!";
   const Icon = result === "Juist!" ? "✅" : "❌";
   const SpeakerIcon = MdVolumeUp;
   const MicIcon = MdOutlineMic;
   return (
      <>
         <div className='d-flex flex-column text-center'>
            <div className='d-flex justify-content-center'>
               <li className='py-2 px-3 rounded-2 h3 text-center'>
                  {Icon}
                  <span
                     className={`mx-1 mt-10 mb-10 ${result === "Juist!" ? "text-success" : "text-danger"}`}
                     style={{ fontSize: "24px" }}
                  >
                     {result}
                  </span>
               </li>
            </div>
            {isCorrect ? (
               <span className='buff-text-color mt-5 mb-20 h5' style={{ fontSize: "18px" }}>
                  {/* Lets practice the pronounciation */}
                  Oefen met de uitspraak
               </span>
            ) : (
               <span className='buff-text-color mt-5 mb-20 h5' style={{ fontSize: "18px" }}>
                  {/* Practice the correct pronounciation below */}
                  Oefen met de uitspraak hieronder
               </span>
            )}
            <div className='mb-10 text-center'>
               <span className='buff-text-color text-center px-3 py-2 mb-10 h3 rounded-3'>{correctAnswer}</span>

               <hr className='border border-1 border-secondary opacity-25 mt-10 mx-3 mb-0 rounded' />
               <li className='mt-10 mb-10 d-flex justify-content-center'>
                  <AudioPlayer
                     audioUrl={audioUrl ? audioUrl : "/assets/audio/audio_1.mp3"}
                     context={context}
                     setIsAudioPlaying={setIsAudioPlaying}
                  />
                  <VoiceRecorder micHandler={micHandler} isAudioPlaying={isAudioPlaying} />
               </li>
            </div>
         </div>
         <ul className='memory-game-color d-flex align-items-center justify-content-center'>
            <CustomButton
               onClick={onClickFunction}
               text={"Ga door"}
               borderColor={"success"}
               placeHolder={"Submit-Icon"}
               margin={"mx-0"}
            />
         </ul>
      </>
   );
};

export default React.memo(PracticeComponent);
