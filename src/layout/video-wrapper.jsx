import { animationCreate } from '@/utils/utils';
import React, { useEffect } from 'react';
import BackToTop from '../lib/BackToTop';
import FooterThree from './footers/footer-3';
import HeaderThree from './headers/header-3';
import HeaderTwo from './headers/header-2';
import OffCanvas from '../components/wrapper-components/off-canvas';
import { NavigationProvider } from '../context/NavigationContext';

const VideoWrapper = ({ children }) => {
	useEffect(() => {
		setTimeout(() => {
			animationCreate();
		}, 500);
	}, []);

	return (
		<>
			<NavigationProvider>
				<HeaderThree />
				<section className="bone" style={{ height: '100vh' }}>
					<div className="d-flex align-items-center justify-content-between mx-5">
						<OffCanvas />
						{/* <NavLinks /> */}
					</div>
					<div className="container text-center">
						<div className="row align-items-center">{children}</div>
					</div>
				</section>
				<FooterThree />
				<BackToTop />
			</NavigationProvider>
		</>
	);
};

export default VideoWrapper;
