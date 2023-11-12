import React from "react";
import FillGapsOptions from "../gap-exercise/Options";
import Options from "../role-play-game/Options";
import WordBox from "../right-order-game/WordBox";
// ... Import other options components for different games

const GameOption = ({ gameName, optionsArray, context }) => {
   let randomizedOptions = optionsArray?.sort(() => Math.random() - 0.5);
   switch (gameName) {
      case "gap-exercise":
         return (
            <div className='d-flex flex-column mt-10 mb-20 text-start'>
               <h5
                  className='buff-text-color mt-10 mb-5'
                  style={{ fontSize: "18px" }}
               >
                  Word Options :
               </h5>
               <div className='d-flex justify-content-center flex-wrap'>
                  {randomizedOptions?.map((option, index) => (
                     <FillGapsOptions
                        key={index}
                        option={option}
                        index={index}
                        context={context}
                     />
                  ))}
               </div>
            </div>
         );
      case "role-play-game":
         return (
            <div className='d-flex flex-column mt-10 mb-20 text-center'>
               <h5
                  className='buff-text-color mt-10 mb-5'
                  style={{ fontSize: "18px" }}
               >
                  Choose the correct option :
               </h5>
               {randomizedOptions?.map((option, index) => (
                  <Options key={index} option={option} index={index} />
               ))}
            </div>
         );
      case "right-order-game":
         return (
            <div className='d-flex flex-column mt-10 mb-20 text-start'>
               <h5
                  className='buff-text-color mt-10 mb-6'
                  style={{ fontSize: "18px" }}
               >
                  Word Options :
               </h5>
               <div className='d-flex justify-content-center flex-wrap'>
                  {randomizedOptions?.map((option, index) => (
                     <WordBox
                        context={context}
                        key={index}
                        word={option}
                        index={index}
                     />
                  ))}
               </div>
            </div>
         );
      // Add more cases for other games
      default:
         return null;
   }
};

export default React.memo(GameOption);
