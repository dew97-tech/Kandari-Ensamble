import React from 'react';
import { FillGapsProvider } from '@/src/context/FillGapsContext';
import VideoGame from './VideoGame';
const Lesson = ({ exerciseTitle, exerciseId }) => {
	return (
		<>
			<section className="bone">
				<FillGapsProvider exerciseId={exerciseId} exerciseTitle={exerciseTitle}>
					<VideoGame />
				</FillGapsProvider>
			</section>
		</>
	);
};

export default Lesson;

// Role Play
