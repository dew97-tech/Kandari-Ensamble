import { useContext, useState } from "react";
import { DictationGameContext } from "@/src/context/DictationContext";

const GameHint = () => {
   const { showNextFrame, word, countdown } = useContext(DictationGameContext);
   const [showHint, setShowHint] = useState(false);

   return (
      <div className='d-flex justify-content-end'>
         {countdown !== null && (
            <div className='countdown'>
               <span className='buff-text-color card-color px-2 py-2 fs-4 fw-semibold rounded'>
                  Next Question in : {countdown}s
               </span>
            </div>
         )}
      </div>
   );
};

export default GameHint;
