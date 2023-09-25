import { SoundLibraryContext } from '@/src/context/SoundLibraryContext';
import React, { useContext } from 'react';
import ResultCheckBox from './result-checkbox';
const FrenchInputSection = () => {
	const { toggleScreen, questions, userAnswers, evaluateAnswers, handleUserAnswer } =
		useContext(SoundLibraryContext);

	return (
		<div className="mt-20">
			{questions.map((question, index) => {
				// We use the index as the uniqueId for the checkbox and the userAnswer array because the questions array is not guaranteed to be unique
				const userAnswer = userAnswers[index] || '';
				// isCorrect is a boolean that checks if the userAnswer is correct
				const isCorrect = userAnswer.toLowerCase() === question.frenchTranslation.toLowerCase();
				// result is a string that is either 'correct' or 'incorrect'
				const result = isCorrect ? 'correct' : 'incorrect';

				return (
					<div className="d-flex align-items-center justify-content-between my-2" key={index}>
						<div className="mx-1 text-end">
							<h3 className="buff-text-color">{question.dutchWord} :</h3>
						</div>
						<div className="mx-1">
							<form
								className="mb-2"
								onSubmit={(e) => {
									e.preventDefault(); // Prevents form submission on enter key press
								}}
							>
								{/*If toggleScreen is true, we render the correct answer and the checkbox */}
								{toggleScreen ? (
									<>
										<div className='d-flex'>
											<ResultCheckBox
												result={result}
												frenchTranslation={question.frenchTranslation}
												uniqueId={index}
											/>
										</div>
									</>
								) : (
									<div
										className={`d-flex align-items-center justify-content-between form-group mb-0 mr-10 buff-text-color border border-secondary border-1 rounded shadow-sm px-1 opacity-75 ${
											toggleScreen && result ? 'light-green' : 'bone'
										}`}
									>
										<input
											name="guessword"
											type="text"
											className="form-control border border-secondary border-1 rounded-1 buff-text-color shadow-sm my-1 h4"
											value={userAnswer}
											onChange={(event) => handleUserAnswer(index, event.target.value)}
											id="guessword"
											placeholder="Enter French Translation"
											autoComplete="off"
										/>
									</div>
								)}
							</form>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default FrenchInputSection;
