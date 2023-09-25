import { useContext, useState } from 'react';
import { DictationGameContext } from '@/src/context/DictationContext';

const GameHint = () => {
    const { showNextFrame, word } = useContext(DictationGameContext);
    const [showHint, setShowHint] = useState(false);
    return (
        <div className="d-flex justify-content-end">
            {!showNextFrame && (
                <>
                    <span
                        className={`btn btn-sm buff-text-color card-color h5 mr-10 border-bottom py-2 px-2 border-secondary rounded-2 shadow-sm card-color ${
                            showHint ? 'd-none' : ''
                        }`}
                        onClick={() => {
                            setShowHint(true);
                            setTimeout(() => setShowHint(false), 1000);
                        }}>
                        Want help ?
                    </span>
                    <h4
                        className={`buff-text-color border border-secondary px-2 py-2 rounded buff ${
                            showHint ? '' : 'd-none'
                        }`}>
                        {word}
                    </h4>
                </>
            )}
        </div>
    );
};

export default GameHint;
