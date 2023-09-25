import React from 'react';
import Options from '../gap-exercise/Options';
import WordBox from '../right-order-game/WordBox';
// import TrueFalse from '../dictation-memory-game/true-false';

const GameFooter = ({ game, optionsArray }) => {
    return (
        <>
            {/* Gap-Exercise */}
            {game === 'gap-exercise' && (
                <div className="d-flex flex-sm-column flex-md-column row mt-40">
                    <h4 className="buff-text-color mb-20">Choose the correct option</h4>
                    <div className="d-flex align-items-center justify-content-center flex-wrap">
                        {optionsArray.map((option, index) => (
                            <Options option={option} index={index} />
                        ))}
                    </div>
                </div>
            )}

            {/* Dictation-Game */}
            {/* {game === 'dictation-game' && <TrueFalse />} */}

            {/* Right-Order-Game */}
            {!game && (
                <div className="row mt-40">
                    <h4 className="buff-text-color mb-20">
                        Choose the correct option in appropriate order
                    </h4>
                    {optionsArray.map((word, index) => (
                        <WordBox key={index} word={word} index={index} />
                        ))}
                </div>
            )}
        </>
    );
};

export default GameFooter;

{/* Passing only unique Values in OptionsArray For Right Order Game */}