import { animationCreate } from '@/utils/utils';
import React, { useEffect } from 'react';
import FooterThree from './footers/footer-3';
import HeaderThree from './headers/header-3';
import BackToTop from '../lib/BackToTop';
const ExerciseWrapper = ({ children }) => {
	useEffect(() => {
		setTimeout(() => {
			animationCreate();
		}, 500);
	}, []);

	return (
		<>
			<HeaderThree />
			<section className="course-area bone" style={{  height: '90vh' }}>
				<div className="container text-center">
					<div className="row align-items-center">{children}</div>
				</div>
			</section>
            <FooterThree />
			<BackToTop />
		</>
	);
};

export default ExerciseWrapper;
