import React from 'react';
import { StudyDialogueProvider } from '@/src/context/StudyDialogueContext';
import VideoGame from './VideoGame';
const Lesson = ({exerciseTitle,exerciseId}) => {
	return (
		<>
			<section className="course-area pt-20 pb-200 bone">
				<div className="container">
					<StudyDialogueProvider exerciseId={exerciseId} exerciseTitle={exerciseTitle}>
						<VideoGame />
					</StudyDialogueProvider>
				</div>
			</section>
		</>
	);
};

export default Lesson;

// Role Play
