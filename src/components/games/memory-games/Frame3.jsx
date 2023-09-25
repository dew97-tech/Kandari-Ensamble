import React from 'react';

const Frame3 = ({ index, guessedWord, answers, setAnswers }) => {
    return (
        <>
            <div>
                <p id="guessword" name="guessword" className='text-center buff-text-color h6 mb-0 py-2'>
                    Guess the word from the image
                </p>
                <form
                    className="d-flex align-items-center justify-content-center mb-2"
                    onSubmit={(e) => {
                        e.preventDefault(); // Prevents form submission on enter key press
                    }}>
                    <div
                        key={index}
                        className="d-flex align-items-center justify-content-between form-group mb-0 mx-2">
                        <label htmlFor="guessword" className="sr-only">
                            Enter your guess:
                        </label>

                        <input
                            name="guessword"
                            type="text"
                            value={answers}
                            onChange={(e) => setAnswers(e.target.value)}
                            className="form-control border border-secondary border-1 rounded-2 buff-text-color shadow-sm my-0"
                            id="guessword"
                            placeholder="Enter your guess"
                            autoComplete="off"
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default Frame3;
