import React, { useContext } from "react";
import AudioPlayer from "../memory-games/audio-player";
import { DictationGameContext } from "@/src/context/DictationContext";

const Word = () => {
   const { word, audioUrl } = useContext(DictationGameContext);
   return (
      <>
         <div className='d-flex align-items-center justify-content-center mb-20'>
            <h2 className='buff-text-color card-color px-3 py-2 rounded-3 border border-secondary border-2 shadow-sm mb-0 me-3'>
               {word}
            </h2>
            <AudioPlayer
               audioUrl={decodeURIComponent(audioUrl)}
               context={DictationGameContext}
               buttonSize={"btn-lg px-3 py-3"}
               iconSize={"2rem"}
               //    rounded={"rounded-5"}
            />
         </div>
      </>
   );
};

export default Word;
