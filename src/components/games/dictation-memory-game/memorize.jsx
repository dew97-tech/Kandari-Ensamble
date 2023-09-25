import React, { useContext } from 'react';
import GameResult from '../dictation-memory-game/game-result';
import { DictationGameContext } from '@/src/context/DictationContext';

const Memorize = ({ answers, setAnswers, word, serial, UserAnswers }) => {
	const { showResult } = useContext(DictationGameContext);
	const result = UserAnswers[serial]; // Retrieve the appropriate value from UserAnswers

	return (
		<div>
			<form
				className="d-flex align-items-center justify-content-center mb-2"
				onSubmit={(e) => {
					e.preventDefault(); // Prevents form submission on enter key press
				}}
			>
				<div className='col-lg-3 col-md-6 px-4'>
					<div
						key={serial}
						className="d-flex align-items-center justify-content-start form-group mb-0 mr-10 buff-text-color border border-secondary border-2 rounded-2 shadow-sm bone py-2 px-3 mx-4"
					>
						<span htmlFor="guessword" className="text-start mx-3 h6 mb-0 buff-text-color">
							{serial + 1}
							{')'}
						</span>
						{!showResult ? (
							<input
								name="guessword"
								type="text"
								value={answers}
								onChange={(e) => setAnswers(e.target.value)}
								className="form-control border border-secondary border-1 rounded-3 buff-text-color shadow-sm my-1 h4"
								id="guessword"
								placeholder="Enter your guess"
								autoComplete="off"
							/>
						) : (
							<GameResult
								result={result} // Pass the appropriate value to the result prop
								answers={answers}
								index={serial}
								// audioUrl={audioUrl}
							/>
						)}
					</div>
				</div>
			</form>
		</div>
	);
};

export default Memorize;
