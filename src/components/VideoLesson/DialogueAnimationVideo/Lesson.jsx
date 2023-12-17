import React from 'react';
import VideoPlayer from './VideoPlayer';
import { DialogueAnimationProvider } from '@/src/context/DialogueAnimationVideo';
const Lesson = ({ exerciseTitle }) => {
	return (
		<>
			<section className="bone">
				<DialogueAnimationProvider exerciseTitle={exerciseTitle}>
					<VideoPlayer exerciseTitle={exerciseTitle}/>
				</DialogueAnimationProvider>
			</section>
		</>
	);
};

export default Lesson;

// Role Play
