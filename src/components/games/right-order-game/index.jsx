import React from 'react';
import GameContainer from './game-container';
import { RightOrderExerciseProvider } from '@/src/context/exercise-contexts/RightOrderContext';

const RightOrderGame = ({exerciseId,exerciseTitle}) => {
	return (
		<>
			<RightOrderExerciseProvider exerciseId={exerciseId} exerciseTitle={exerciseTitle}>
				<GameContainer exerciseTitle={exerciseTitle}/>
			</RightOrderExerciseProvider>
		</>
	);
};

export default RightOrderGame;
