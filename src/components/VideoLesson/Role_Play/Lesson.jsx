import React from 'react';
import { RolePlayProvider } from '@/src/context/RolePlayContext';
import VideoGame from './VideoGame';
const Lesson = ({ exerciseId, exerciseTitle }) => {
	return (
		<>
			<section className="bone">
				<RolePlayProvider exerciseId={exerciseId} exerciseTitle={exerciseTitle}>
					<VideoGame />
				</RolePlayProvider>
			</section>
		</>
	);
};

export default Lesson;

// Role Play
