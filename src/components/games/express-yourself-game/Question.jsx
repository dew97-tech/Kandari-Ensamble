import React, { useContext } from 'react';
import { ExpressYourselfContext } from '@/src/context/ExpressYourselfContext';
const Question = () => {
	const { currentQuestion } = useContext(ExpressYourselfContext);
	return (
		<div className="mx-2 d-flex justify-content-center flex-nowrap">
			<h2 className="buff-text-color mb-0">{currentQuestion}</h2>
		</div>
	);
};

export default Question;
