import React from 'react';
function PreviousAnswers({
	game,
	previousAnswers,
	score,
	sentenceLength,
	sentences,
	currentExercise,
}) {
	// Only for Game === 'RolePlayGame'
	// Helper function to find the text of the correct option based on the correctOptionId
	const getCorrectOptionText = (options, correctOptionId) => {
		const correctOption = options?.find((option) => option.id === correctOptionId);
		return correctOption.text;
	};
	return (
		<div className="row mb-10 card-color p-3 border border-3 border-secondary rounded-4 shadow">
			<div className="d-flex align-items-center justify-content-between mb-2">
				<h2 className="text-center mb-4 buff-text-color">
					Results
					<hr className="mt-0 mx-1 border border-secondary border-2 opacity-25 rounded-3" />
				</h2>
				<h5 className="text-center mb-4 buff-text-color ">
					<span className="badge light-green buff-text-color px-2 py-2 h4 shadow-sm border border-2 border-success">
						Your Score : {score} / {sentenceLength}
					</span>
				</h5>
			</div>

			<table className="table table-bordered rounded-2 shadow-sm text-center border border-2 border-secondary align-middle">
				<thead className="buff buff-text-color shadow-sm">
					<tr>
						<th>Challenge</th>
						<th>Your Answer</th>
						<th>Correct Answer</th>
					</tr>
				</thead>
				<tbody>
					{game === 'RightOrderGame' && (
						<>
							{previousAnswers.map((answer, index) => (
								<tr
									key={index}
									className="border border-2 bone border-secondary shadow-sm h5 buff-text-color"
								>
									<td>{answer.challengeIndex + 1}</td>
									<td>{answer.userAnswer.join(' ')}</td>
									<td>{currentExercise?.data[index].correctOrder.join(' ')}</td>
								</tr>
							))}
						</>
					)}
					{game === 'RolePlayGame' && (
						<>
							{previousAnswers.map((answer, index) => (
								<tr
									key={index}
									className="border border-2 bone border-secondary shadow-sm h5 buff-text-color"
								>
									<td>{index + 1}</td>
									<td>{answer}</td>
									<td>
										{getCorrectOptionText(
											sentences?.data?.[index]?.options,
											sentences?.data?.[index]?.correctOptionId
										)}
									</td>
								</tr>
							))}
						</>
					)}
					{game === 'ExpressYourself' && (
						<>
							{previousAnswers.map((answer, index) => (
								<tr
									key={index}
									className="border border-2 bone border-secondary shadow-sm h5 buff-text-color"
								>
									<td>{index + 1}</td>
									<td>{answer.userAnswer}</td>
									<td>{answer.actualAnswer}</td>
								</tr>
							))}
						</>
					)}
					{game === 'GapExercise' && (
						<>
							{previousAnswers.map((answer, index) => (
								<tr
									key={index}
									className="border border-2 bone border-secondary shadow-sm h5 buff-text-color"
								>
									<td>{index + 1}</td>
									<td>{answer.userAnswerSentence}</td>
									<td>{answer.actualAnswerSentence}</td>
								</tr>
							))}
						</>
					)}
				</tbody>
			</table>
		</div>
	);
}

export default PreviousAnswers;
