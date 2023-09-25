import React from 'react';
import { ExpressYourselfContext } from '@/src/context/ExpressYourselfContext';
import CommonVideoPlayer from '../components/CommonVideoPlayer';
import useSWR from 'swr';
import FetchVideoSrc from '../components/FetchVideoSrc';
import ErrorComponent from '../../games/components/ErrorComponent';

const ExpressYourselfVideoPlayer = () => {
	// Fetch video src from API
	const { data, error } = useSWR('VideoSrc', FetchVideoSrc);

	const videoSrc = data?.src; // Access the 'src' property
	// console.log('videoSrc', videoSrc);
	if (error) {
		return <ErrorComponent />;
	}
	return (
		<CommonVideoPlayer
			context={ExpressYourselfContext}
			gameName="express-yourself-game"
			videoSrc={videoSrc}
		/>
	);
};

export default ExpressYourselfVideoPlayer;
