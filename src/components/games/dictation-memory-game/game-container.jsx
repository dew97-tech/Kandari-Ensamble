import { useContext, useState } from "react";
import Word from "../dictation-memory-game/word";
import TrueFalse from "../dictation-memory-game/true-false";
import Memorize from "../dictation-memory-game/memorize";
import { DictationGameContext } from "@/src/context/DictationContext";
import Lifeline from "../components/lifeline";
import GameHint from "./game-hint";
const GameContainer = () => {
   const {
      currentSentence,
      showNextFrame,
      answers,
      UserAnswers,
      updateAnswer,
      currentWordIndex,
      shuffledWords,
      showResult,
      mistake,
      sentenceLength,
      word,
      currentSentenceIndex,
   } = useContext(DictationGameContext);
   return (
      <>
         <div className='d-flex align-items-center justify-content-between mb-30'>
            <div className='mb-2'>
               <h3 className='px-2 py-1 buff-text-color card-color'>Level: {currentSentenceIndex + 1}</h3>
               <hr className='border-bottom border-secondary opacity-25 mx-1 mt-0 pt-0 mb-0 rounded' />
            </div>
            <h3 className='px-2 py-2 border border-warning border-2 rounded shadow-sm buff-text-color buff'>
               <Lifeline context={DictationGameContext} />
            </h3>
         </div>
         {showNextFrame ? (
            currentSentence?.words.map((wordObj, index) => (
               <Memorize
                  key={index}
                  word={wordObj.word}
                  serial={index}
                  answers={answers[index]}
                  setAnswers={(value) => updateAnswer(index, value)}
                  UserAnswers={UserAnswers}
               />
            ))
         ) : (
            <>
               <Word />
               <TrueFalse />
               <GameHint />
            </>
         )}
      </>
   );
};

export default GameContainer;
