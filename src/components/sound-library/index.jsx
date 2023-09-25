import React from 'react';
import Library from './library';
import { SoundLibraryProvider } from '@/src/context/SoundLibraryContext';
import GameTitle from '../games/components/game-title';
import DutchSentence from '../games/components/DutchSentence';
const SoundLibrary = () => {
	const cardStyle = {
		backgroundColor: 'rgba(245, 245, 245)',
		borderRadius: '1.2rem',
		padding: '1rem',
		minWidth: '10vh',
	};

	return (
		<>
		<SoundLibraryProvider>
			<section className="course-area pt-50 pb-200 bone">
				<GameTitle title={'Sound Library'} gameLanguage={'Dutch'} />
				<div className="container-sm col-lg-5 col-md-8 col-sm-10">
					<div className="mx-1 shadow-sm border border-secondary border-2" style={cardStyle}>
						<div className="d-flex justify-content-start mb-20">
							<DutchSentence dutchSentence={'Word Groups :'} />
						</div>
						<Library selectedGameLevel={4} cardStyle={cardStyle} />
					</div>
				</div>
			</section>
		</SoundLibraryProvider>
		</>
	);
};

export default SoundLibrary;
