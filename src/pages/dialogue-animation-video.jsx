import React from 'react';
import Lesson from '@/src/components/VideoLesson/DialogueAnimationVideo/Lesson';
import WrapperThree from '../layout/wrapper-3';
import VideoWrapper from '../layout/video-wrapper';
import SEO from '../common/seo';
const DialogueAnimation = () => {
	return (
		<>
			<VideoWrapper>
				<SEO pageTitle={'Dialogue Animation'} />
				<Lesson exerciseTitle="Dialogue Animation"/>
			</VideoWrapper>
		</>
	);
};

export default DialogueAnimation;
