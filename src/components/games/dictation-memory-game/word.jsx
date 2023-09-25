import React, { useContext } from "react";
import AudioPlayer from "../memory-games/audio-player";
import { DictationGameContext } from "@/src/context/DictationContext";

const Word = () => {
   const { word, audioUrl } = useContext(DictationGameContext);
   return (
      <>
         <div className="d-flex align-items-center justify-content-center mb-10 mx-3 rounded-4">
            <h2 className="buff-text-color buff px-3 rounded-3 border border-warning border-2 shadow-sm mb-0">
               {word}
            </h2>
            <AudioPlayer
               audioUrl={audioUrl}
               context={DictationGameContext}
               buttonSize={"btn-lg mx-2 px-3"}
            //    rounded={"rounded-5"}
            />
         </div>
      </>
   );
};

export default Word;
