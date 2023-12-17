import React from 'react';
import Game from './game';
import { FillGapsExerciseProvider } from '@/src/context/exercise-contexts/FillGapsContext';

const FillUpTheGaps = ({ exerciseTitle, exerciseId }) => {
	return (
		<>
			<FillGapsExerciseProvider exerciseId={exerciseId} exerciseTitle={exerciseTitle}>
				<Game exerciseTitle={exerciseTitle}/>
			</FillGapsExerciseProvider>
		</>
	);
};

export default FillUpTheGaps;
