import React, { useState, useContext } from "react";
import { ExpressYourselfContext } from "@/src/context/ExpressYourselfContext";
import CustomButton from "../components/CustomButton";

const InputSection = () => {
   const { userAnswer, setUserAnswer, handleSubmit, isCorrect, inputBorderColor } = useContext(ExpressYourselfContext);
   // const [inputBorderColor, setInputBorderColor] = useState("border-secondary");

   const handleFormSubmit = (e) => {
      e.preventDefault();
      handleSubmit(userAnswer);
   };

   return (
      <form onSubmit={handleFormSubmit}>
         <div className='d-flex flex-column justify-content-center align-items-center mb-25'>
            <div className='container-fluid text-center'>
               <input
                  type='text'
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  className={`form-control text-center ${inputBorderColor} border-3 rounded-3 buff-text-color shadow-sm my-1 py-2 h5`}
                  placeholder='Enter your answer here...'
                  autoComplete='off'
                  style={{ fontSize: "18px" }}
                  required
               />
            </div>
         </div>
         <ul className='memory-game-color d-flex align-items-center justify-content-center'>
            <CustomButton
               // onClick={handleFormSubmit}
               type='submit'
               text={"Proceed"}
               borderColor={"success"}
               placeHolder={"Submit-Icon"}
               margin={"mx-3"}
            />
         </ul>
      </form>
   );
};

export default InputSection;
