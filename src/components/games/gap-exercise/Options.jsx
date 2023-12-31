import { useContext } from "react";

const Options = ({ option, index, context }) => {
   const { selectedOption, handleOptionClick } = useContext(context);

   // Determine the button's class based on whether it's the selected option
   const buttonClass = selectedOption === option ? "buff border border-3 border-warning" : "card-color";

   return (
      <div className='mx-2 my-2'>
         <button
            key={index}
            className={`btn buff d-flex justify-content-start align-items-center flex-wrap text-center border border-secondary border-3 buff-text-color px-2 py-2 rounded ${buttonClass} shadow-sm`}
            onClick={() => handleOptionClick(option)}
         >
            <span className='buff-text-color h3 px-2 mb-0'>{option}</span>
         </button>
      </div>
   );
};

export default Options;
