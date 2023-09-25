import { memo } from 'react';

export const InstructionSentence = memo(({ InstructionText, marginBottom, marginTop }) => {
	console.log("Instruction Sentence Fired");
	return (
		<>
			<div className={`text-center ${marginTop ? marginTop : 'mt-10'}`}>
				<h5
					className={`buff-text-color ${marginBottom ? marginBottom : 'mb-15'}`}
					style={{ fontSize: '18px' }}
				>
					{InstructionText}
				</h5>
			</div>
		</>
	);
});
