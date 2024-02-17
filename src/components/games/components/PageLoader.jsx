import React from 'react';
import { Hourglass } from 'react-loader-spinner';
import SEO from '../../../common/seo';
function PageLoader() {
	return (
		<>
			<SEO pageTitle={'Maison Ensemble'} />
			<section className="course-area pt-200 pb-200 bone" style={{ height: '100vh' }}>
				<div className="container">
					<div className="d-flex flex-column align-items-center justify-content-center mx-2">
						<Hourglass
							visible={true}
							height="300"
							width="200"
							ariaLabel="hourglass-loading"
							wrapperStyle={{}}
							wrapperClass=""
							colors={['#f0be85', '#ff6652']}
							className="border border-dark"
						/>
						{/* <h2 className="mx-2 buff-text-color">Please Wait</h2> */}
						<h1 className="mx-2 buff-text-color display-4">
							<span className="">Loading</span>
							<span className="display-4 dot1 mx-1">.</span>
							<span className="display-4 dot2 mx-1">.</span>
							<span className="display-4 dot3 mx-1">.</span>
						</h1>
					</div>
				</div>
			</section>
		</>
	);
}

export default PageLoader;
