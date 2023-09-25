import React from 'react';

const GameTime = ({ activity, formatTime, totalTime }) => {
    return (
        <>
            <li className="buff rounded px-2 py-2 shadow-sm border border-2 border-warning">
                <span className="d-flex align-items-center justify-content-center px-2 mark shadow-sm rounded">
                    <img
                        src="/assets/icons/pocket-watch-noBg.gif"
                        alt="stopwatch icon"
                        width="30"
                        height="30"
                        className="mr-5 mb-1"
                    />
                    <h4 className="h5 buff-text-color mb-0">
                        {activity}: {formatTime(totalTime)}
                    </h4>
                </span>
            </li>
        </>
    );
};

export default GameTime;
