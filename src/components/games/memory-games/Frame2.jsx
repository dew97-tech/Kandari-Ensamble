import React from 'react';

const Frame2 = ({ index, guessedWord, answers, setAnswers }) => {
	return (
		<>
			<span id="guessword" name="guessword" className="d-flex align-items-center justify-content-center h5 buff-text-color pt-2 pb-1">
				The word to answer is:
			</span>
			<form
				className="d-flex align-items-center justify-content-center mb-2"
				onSubmit={(e) => {
					e.preventDefault(); // Prevents form submission on enter key press
				}}
			>
				<div
					key={index}
					className="d-flex align-items-center justify-content-between form-group mb-0 mx-2"
				>
					<label htmlFor="guessword" className="sr-only">
						Enter your guess:
					</label>
					<b name="guessword" className="text-left mr-15 buff-text-color fs-6">
						{guessedWord.charAt(0).toUpperCase()}
					</b>
					<input
						name="guessword"
						type="text"
						value={answers}
						onChange={(e) => setAnswers(e.target.value)}
						className="form-control border border-secondary border-1 rounded-3 buff-text-color shadow-sm my-0 fs-5"
						id="guessword"
						placeholder="Enter your guess"
						autoComplete="off"
					/>
				</div>
			</form>
		</>
	);
};

export default Frame2;
