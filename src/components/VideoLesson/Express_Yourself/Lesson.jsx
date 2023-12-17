import React from 'react';
import { ExpressYourselfProvider } from '@/src/context/ExpressYourselfContext';
import VideoGame from './VideoGame';
const Lesson = ({ exerciseId , exerciseTitle}) => {
	return (
		<>
			<section className="bone">
				<ExpressYourselfProvider exerciseId={exerciseId} exerciseTitle={exerciseTitle}>
					<VideoGame exerciseTitle={exerciseTitle}/>
				</ExpressYourselfProvider>
			</section>
		</>
	);
};

export default Lesson;

// Express Yourself
