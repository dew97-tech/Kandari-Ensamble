import React from 'react';
import Game from './game';
import { VisualMemoryGameProvider } from '@/src/context/VisualContext';

const VisualMemoryGame = ({ exerciseTitle }) => {
	return (
		<>
			<VisualMemoryGameProvider exerciseTitle={exerciseTitle}>
				<Game exerciseTitle={exerciseTitle}/>
			</VisualMemoryGameProvider>
		</>
	);
};

export default VisualMemoryGame;
