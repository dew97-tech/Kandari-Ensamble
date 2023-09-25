import React from 'react';
import SoundLibraryGame from './game';
import { SoundLibraryProvider } from '@/src/context/SoundLibraryContext';
const SoundLibrary = ({ exerciseTitle }) => {
	return (
		<>
			<SoundLibraryProvider exerciseTitle={exerciseTitle}>
				<SoundLibraryGame />
			</SoundLibraryProvider>
		</>
	);
};

export default SoundLibrary;
