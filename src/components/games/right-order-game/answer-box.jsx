import React, { useContext } from "react";

function AnswerBox({ context }) {
   const { userOrder, handleTryAgain, setUserOrder, setWrongOrder, dutchSentence } = useContext(context);
   const handleAddToOption = (word, WordIndex) => {
      setWrongOrder((prevWrongOrder) => {
         return [...prevWrongOrder, word];
      });
   };
   const handleRemoveFromAnswer = (word, WordIndex) => {
      console.log("The Clicked Words Index is", WordIndex);
      setUserOrder((prevUserOrder) => {
         return prevUserOrder.filter((_, index) => index !== WordIndex);
      });
      handleAddToOption(word, WordIndex);
   };
   const answerBoxStyle = {
      width: "100%",
      height: "auto",
      minHeight: "2.5rem",
      maxHeight: "4rem",
   };
   return (
      <>
         <div className='d-flex justify-content-start flex-wrap' style={answerBoxStyle}>
            {userOrder.map((word, index) => (
               <div key={index} onClick={() => handleRemoveFromAnswer(word, index)}>
                  <div className='col-12 mx-2'>
                     <h3 className='btn py-2 px-4 text-start border border-secondary border-3 rounded buff-text-color buff h3 my-1'>
                        {word}
                     </h3>
                  </div>
               </div>
            ))}
         </div>
      </>
   );
}

export default AnswerBox;
