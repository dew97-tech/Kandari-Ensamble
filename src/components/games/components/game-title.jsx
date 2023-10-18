import React from 'react';

const GameTitle = ({ title, gameLanguage }) => {
    return (
        <div className="">
            <div className="d-flex justify-content-center">
                <div className="text-center mb-20 mt-5">
                    <h2 className="tp-section-title px-3 rounded buff-text-color mb-0 pb-5">
                        {title}
                    </h2>
                    <hr className="shadow-lg border border-3 border-secondary mt-0 mb-0 opacity-25 rounded" />
                </div>
            </div>
        </div>
    );
};

export default GameTitle;
