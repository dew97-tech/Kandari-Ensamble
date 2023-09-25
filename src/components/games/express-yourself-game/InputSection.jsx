import React, { useContext } from 'react';
import { ExpressYourselfContext } from '@/src/context/ExpressYourselfContext';
import CustomButton from '../components/CustomButton';
const InputSection = () => {
	const { userAnswer, setUserAnswer, handleSubmit } = useContext(ExpressYourselfContext);

	return (
		<>
			<div className="d-flex flex-column justify-content-center align-items-center mb-25">
				<div className="container-fluid text-center">
					<input
						type="text"
						value={userAnswer}
						onChange={(e) => setUserAnswer(e.target.value)}
						className="form-control text-center border border-secondary border-3 rounded-3 buff-text-color shadow-sm my-1 py-2 h5"
						placeholder="Enter your answer here..."
						autoComplete="off"
						style={{fontSize:'18px'}}
					/>
				</div>
			</div>
			<ul className="memory-game-color d-flex align-items-center justify-content-center">
				<CustomButton
					onClick={() => {
						handleSubmit(userAnswer);
					}}
					text={'Proceed'}
					borderColor={'success'}
					placeHolder={'Submit-Icon'}
					margin={'mx-3'}
				/>
			</ul>
		</>
	);
};

export default InputSection;
