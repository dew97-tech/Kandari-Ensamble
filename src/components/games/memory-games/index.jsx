import React from 'react';

import Game from './game';
import { GameProvider } from '@/src/context/GameContext';
import { GameCardProvider } from '@/src/context/GameCardContext';

const MemoryGame = ({ exerciseTitle }) => {
	return (
		<>
			<GameProvider exerciseTitle={exerciseTitle}>
				<GameCardProvider>
					<Game />
				</GameCardProvider>
			</GameProvider>
		</>
	);
};

export default MemoryGame;
