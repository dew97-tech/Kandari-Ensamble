import React, { useContext, useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { DictationGameContext } from "@/src/context/DictationContext";

const TrueFalse = () => {
   const {
      handleWordClick,
      word,
      options,
      isCorrect,
      clearTimeout,
      selectedOption,
      setSelectedOption,
      isSelectionMade,
      setIsSelectionMade,
      timeoutId,
   } = useContext(DictationGameContext);

   const handleClick = (optionText) => {
      setSelectedOption(optionText);
      handleWordClick(word, optionText);
      setIsSelectionMade(true);
   };

   return (
      <>
         <div className='d-flex align-items-center justify-content-center mx-3 mb-2'>
            {options.map((option, index) => {
               let buttonClass = "btn btn-md buff-text-color border-1 px-4 py-2 mx-2 shadow-sm fs-4 text-capitalize";

               if (isSelectionMade) {
                  if (selectedOption === option.text) {
                     buttonClass += isCorrect
                        ? "btn btn-md light-green border-success fw-bolder fs-2 text-capitalize"
                        : "btn btn-md bittersweet buff-text-color border-danger fw-bolder fs-2 text-capitalize";
                  } else {
                     buttonClass += isCorrect
                        ? "btn btn-md bittersweet buff-text-color border-danger fw-bolder fs-2 text-capitalize"
                        : "btn btn-md light-green border-success fw-bolder fs-2 text-capitalize";
                  }
               } else {
                  buttonClass += " buff border-warning";
               }

               return (
                  <button
                     key={index}
                     className={buttonClass}
                     onClick={() => handleClick(option.text)}
                     disabled={isSelectionMade}
                  >
                     {option.text}
                     {timeoutId}
                  </button>
               );
            })}
         </div>
      </>
   );
};

export default TrueFalse;

{
   /* <div className='d-flex align-items-center justify-content-center mx-3'>
{options.map((option, index) => (
   <CustomButton
      key={index} // Assuming options don't have unique IDs
      onClick={() => handleWordClick(word, option.text)}
      text={option.text}
      colorString={"btn btn-md buff"}
      borderColor={"warning"}
      fontSize={"fs-4"}
   />
))}
</div> */
}
