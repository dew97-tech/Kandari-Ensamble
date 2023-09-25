import { useContext } from 'react';
import { DictationGameContext } from '@/src/context/DictationContext';
const Lifeline = () => {
    const { heartEmojis } = useContext(DictationGameContext);
    return (
        <div className="px-5 py-2 rounded-2 shadow-sm card-color">
            {/* Render the heart emojis */}
            {heartEmojis.map((emoji, index) => (
                <span key={index}>{emoji} </span>
            ))}
        </div>
    );
};

export default Lifeline;
