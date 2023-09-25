import React from 'react';
import useSWR from 'swr';
import FetchVideoSrc from '../components/FetchVideoSrc';
import { RolePlayContext } from '@/src/context/RolePlayContext';
import CommonVideoPlayer from '../components/CommonVideoPlayer';
import LoadingComponent from '../../games/components/LoadingComponent';
import ErrorComponent from '../../games/components/ErrorComponent';

const RolePlayVideoPlayer = () => {
	// Fetch video src from API
	const { data, error } = useSWR('VideoSrc', FetchVideoSrc);

	const videoSrc = data?.src; // Access the 'src' property
	if (error) {
		return <ErrorComponent />;
	}

	return (
		<CommonVideoPlayer context={RolePlayContext} gameName="role-play-game" videoSrc={videoSrc} />
	);
};

export default React.memo(RolePlayVideoPlayer);
