import OffCanvas from '@/src/components/wrapper-components/off-canvas';
import HeaderThree from './headers/header-3';
import FooterThree from './footers/footer-3';
import BackToTop from '../lib/BackToTop';
import NavLinks from '../components/wrapper-components/navlinks';
import { NavigationProvider } from '../context/NavigationContext';
function NavLinkWrapper({ children }) {
	return (
		<>
			<NavigationProvider>
				<HeaderThree />
				<section className="course-area bone">
					<div className="d-flex align-items-center justify-content-between mx-5">
						<OffCanvas />
						{/* <NavLinks /> */}
					</div>
					{children}
				</section>
				<FooterThree />
				<BackToTop />
			</NavigationProvider>
		</>
	);
}

export default NavLinkWrapper;
