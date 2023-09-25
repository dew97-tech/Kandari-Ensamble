import React from 'react';
import { RightOrderContext } from '@/src/context/RightOrderContext';
import CommonVideoPlayer from '../components/CommonVideoPlayer';
import useSWR from 'swr';
import FetchVideoSrc from '../components/FetchVideoSrc';
import ErrorComponent from '../../games/components/ErrorComponent';
import LoadingComponent from '../../games/components/LoadingComponent';

const RightOrderVideoPlayer = () => {
	// Fetch video src from API
	const { data, error } = useSWR('VideoSrc', FetchVideoSrc);

	const videoSrc = data?.src; // Access the 'src' property
	if (error) {
		return <ErrorComponent />;
	}

	return <CommonVideoPlayer context={RightOrderContext} videoSrc={videoSrc} />;
};

export default RightOrderVideoPlayer;
