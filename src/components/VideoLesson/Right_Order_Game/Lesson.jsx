import React from 'react';
import VideoGame from './VideoGame';
import { RightOrderProvider } from '@/src/context/RightOrderContext';
const Lesson = ({ exerciseId, exerciseTitle }) => {
	return (
		<>
			<section className="bone">
				<RightOrderProvider exerciseId={exerciseId} exerciseTitle={exerciseTitle}>
					<VideoGame />
				</RightOrderProvider>
			</section>
		</>
	);
};

export default Lesson;
