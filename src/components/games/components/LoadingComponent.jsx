import React from 'react';
import { Spinner } from 'react-bootstrap';
import { Oval } from 'react-loader-spinner';
const LoadingComponent = () => {
	return (
		<section className="course-area pt-200 pb-200 bone" style={{ height: '100vh' }}>
			<div className="container">
				<div className="d-flex flex-column align-items-center justify-content-center mx-2">
					{/* <Spinner
						variant="secondary"
						animation="border"
						role="status"
						className="mb-30 mx-2"
						style={{ width: '3rem', height: '3rem' }}
					></Spinner> */}
					<Oval
						height={100}
						width={80}
						color="#ff6652"
						wrapperStyle={{}}
						wrapperClass=""
						visible={true}
						ariaLabel="oval-loading"
						secondaryColor="#f0be85"
						strokeWidth={2}
						strokeWidthSecondary={2}
					/>
					<h2 className="mx-2 buff-text-color">Please Wait</h2>
					<h1 className="mx-2 buff-text-color display-4">
						Your Lesson is <span className="">Loading</span>
						<span className="display-4 dot1 mx-1">.</span>
						<span className="display-4 dot2 mx-1">.</span>
						<span className="display-4 dot3 mx-1">.</span>
					</h1>
				</div>
			</div>
		</section>
	);
};

export default LoadingComponent;
// colors={['#f0be85', '#ff6652']}
