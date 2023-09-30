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
                           className="buff-text-color h5 text-center mb-1"
                        >
                           Your answer was right !
                        </p>
                        <div className="text-center">
                           <li className="text-success text-center h4 px-2">
                              {/* &#10003; {answers} */}
                              <MdOutlineCheck className="mx-1 mt-0 mb-1" />
                              {frame === 2 &&
                                 guessedWord?.charAt(0).toUpperCase()}
                              {answers?.toLowerCase()}
                              <hr className="mt-1 mb-0 mx-4 rounded-2 border-2 light-green" />
                           </li>
                        </div>
                        <div className="d-flex align-items-center justify-content-center mt-0 pt-0">
                           {frame === 4 && (
                              <>
                                 <div className="d-flex align-items-center justify-content-end">
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
                           className="buff-text-color h5 text-center mb-1"
                        >
                           Your answer was wrong !
                        </p>
                        <div className="text-center">
                           <li className="text-danger text-center h4 px-2">
                              {/* &#10003; {answers} */}
                              <MdClose className="mx-1 mt-0 mb-1" />
                              {frame === 2 &&
                                 guessedWord?.charAt(0).toUpperCase()}
                              {answers?.toLowerCase()}
                              <hr className="mt-1 mb-0 mx-4 rounded-2 border-2 text-danger" />
                           </li>
                        </div>
                        <div className="memory-game-color  d-flex align-items-center justify-content-evenly">
                           
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
