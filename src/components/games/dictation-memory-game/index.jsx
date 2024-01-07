import React from "react";
import Game from "./game";
import { DictationGameProvider } from "@/src/context/DictationContext";

const DictationMemoryGame = ({ exerciseTitle }) => {
   return (
      <>
         <DictationGameProvider exerciseTitle={exerciseTitle}>
            <Game exerciseTitle={exerciseTitle} />
         </DictationGameProvider>
      </>
   );
};

export default DictationMemoryGame;
