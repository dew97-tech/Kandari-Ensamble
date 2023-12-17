import { useContext } from "react";

const Questions = ({ context }) => {
   const { currentQuestion, selectedOption, textColor } = useContext(context);

   // Replace the placeholder '___' in the question with the selected option
   const questionText = currentQuestion?.question?.replace("___", selectedOption || "___");

   return (
      <div className='mx-2 text-center'>
         <h2 className={`${textColor} mb-0`}>{questionText}</h2>
      </div>
   );
};

export default Questions;
