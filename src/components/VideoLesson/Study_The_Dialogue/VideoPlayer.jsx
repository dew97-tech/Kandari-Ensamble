import React from 'react';
import { StudyDialogueContext } from '@/src/context/StudyDialogueContext';
import CommonVideoPlayer from '../components/CommonVideoPlayer';
import useSWRImmutable from 'swr/immutable';
import FetchVideoSrc from '../components/FetchVideoSrc';

import ErrorComponent from '../../games/components/ErrorComponent';

const StudyDialogueVideoPlayer = () => {
	// Fetch video src from API
	const { data, error } = useSWRImmutable('VideoSource', FetchVideoSrc);
	const videoSrc = data?.src; // Access the 'src' property
	// console.log('videoSrc', videoSrc);
	if (error) {
		return <ErrorComponent />;
	}
	return (
		<CommonVideoPlayer
			context={StudyDialogueContext}
			gameName="study-the-dialogue"
			videoSrc={videoSrc}
		/>
	);
};

export default StudyDialogueVideoPlayer;
