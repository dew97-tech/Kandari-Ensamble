import { useContext } from "react";
const Lifeline = ({ context }) => {
   const { heartEmojis } = useContext(context);
   return (
      <div className="px-2 py-1 rounded-2 shadow-sm mark fixed">
         {/* Render the heart emojis */}
         {heartEmojis?.map((emoji, index) => (
            <span key={index}>{emoji} </span>
         ))}
      </div>
   );
};

export default Lifeline;
