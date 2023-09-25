import React, { useContext, useState } from "react";
import { GameCardContext } from "../../../context/GameCardContext";
import { GameContext } from "@/src/context/GameContext";
import { MdMic, MdOutlineCheck, MdClose } from "react-icons/md";
import AudioPlayer from "./audio-player";
import VoiceRecorder from "../components/VoiceRecorder";

const GameResult = ({ index, result, answers, audioUrl, guessedWord }) => {
   const { showAll, isGameFinished, frame, handleMic } =
      useContext(GameCardContext);

   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
   const [isMicAvailable, setIsMicAvailable] = useState(false);
   const micHandler = () => {
      setIsMicAvailable(true);
   };
   return (
      <>
         <div>
            {showAll && isGameFinished && (
               <ul key={index} className="memory-game-color">
                  {result === "correct" ? (
                     <div className="my-1">
                        <p
                           id="guessword"
                           name="guessword"
                           className="buff-text-color h5 text-center mb-0 py-1"
                        >
                           Your answer was right !
                        </p>
                        <div className="d-flex align-items-center justify-content-evenly mt-0 pt-0">
                           <li
                              type="button"
                              className="btn light-green ml-10 py-2 px-2 my-1 border border- border-success rounded-1 shadow-sm "
                           >
                              {/* &#10003; {answers} */}
                              <MdOutlineCheck className="mr-1 mt-0 mb-1" />
                              {frame === 2 &&
                                 guessedWord.charAt(0).toUpperCase()}
                              {answers.toLowerCase()}
                              {/* {guessedWord.charAt(0).toUpperCase()}{answers} */}
                           </li>
                           {frame === 4 && (
                              <>
                                 <div className="d-flex justify-content-end">
                                    <AudioPlayer
                                       audioUrl={"/assets/audio/sample_1.mp3"}
                                       context={GameContext}
                                       setIsAudioPlaying={setIsAudioPlaying}
                                    />
                                    <VoiceRecorder
                                       micHandler={micHandler}
                                       isAudioPlaying={isAudioPlaying}
                                    />
                                 </div>
                              </>
                           )}
                        </div>
                     </div>
                  ) : (
                     <div className="my-1">
                        <p
                           id="guessword"
                           name="guessword "
                           className="buff-text-color h5 text-center mb-0 py-1"
                        >
                           Your answer was wrong !
                        </p>
                        <div className="memory-game-color  d-flex align-items-center justify-content-evenly">
                           <li
                              type="button"
                              className="btn bittersweet ml-10 py-2 my-1 border border-1 border-danger rounded-1 shadow-sm"
                           >
                              {/* &#10003; {answers} */}
                              <MdClose className="mx-1 mt-0 mb-1" />
                              {frame === 2 &&
                                 guessedWord.charAt(0).toUpperCase()}
                              {answers?.toLowerCase()}
                           </li>
                           {frame === 4 && (
                              <>
                                 <div className="d-flex justify-content-end">
                                    <AudioPlayer
                                       audioUrl={"/assets/audio/sample_1.mp3"}
                                       context={GameContext}
                                       setIsAudioPlaying={setIsAudioPlaying}
                                    />
                                    <VoiceRecorder
                                       micHandler={micHandler}
                                       isAudioPlaying={isAudioPlaying}
                                    />
                                 </div>
                              </>
                           )}
                        </div>
                     </div>
                  )}
               </ul>
            )}
         </div>
      </>
   );
};

export default GameResult;
