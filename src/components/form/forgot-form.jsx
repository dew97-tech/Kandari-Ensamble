import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

const ForgotForm = () => {
	// Setting the state for FormData with Username and Password
	const [formData, setFormData] = useState({ email: '' });
	const [error, setError] = useState(null);

	// Updating the FormData as the input Changes
	const handleInputChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	// Handling the submit
	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log(formData);
			const response = await fetch('/api/forgot-password', {
				method: 'POST',
				body: JSON.stringify(formData),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				// user is authenticated, redirect or show success message
			} else {
				setError('Invalid Username or Password');
			}
		} catch (error) {
			console.error(error);
			setError('An error occurred while trying to log in');
		}
	};

	return (
		<>
			<section className="login-area pt-55 pb-75 bone">
				<div className="container">
					<div className="row" style={{ height:'72.2vh' }}>
						<motion.div
							key="step1"
							className="step-wrapper"
							// we can use initial opacity 0.5 and y 0% in both motion div for better subtleness
							initial={{ opacity: 0.5, y: '0%' }}
							animate={{ opacity: 1, x: 0 }}
							exit={{ opacity: 0, x: '-70%' }}
							transition={{ duration: 1, ease: 'easeOut' }}
						>
							<div className="col-lg-8 offset-lg-2">
								<div className="basic-login card-color border border-secondary border-1 rounded-4">
									{/* <h3 className="text-center mb-40">
                                        Enter Your Email Address
                                    </h3> */}
									<div className="row">
										<div className="d-flex justify-content-center">
											<div className="text-center mb-5">
												<h3 className="tp-section-title px-2 buff-text-color">
													Enter Your Email Address
												</h3>
												<hr className="shadow-sm border border-1 border-secondary opacity-25 rounded mt-0 mb-10 mx-2" />
											</div>
										</div>
									</div>
									<h5 className="text-left mt-20 mb-10 text-center buff-text-color">
										We will sent you a Password Reset Link
									</h5>
									<form onSubmit={handleSubmit}>
										<label htmlFor="email">
											Email <span>*</span>
										</label>
										<input
											className="border border-secondary border-1 rounded-2 buff-text-color"
											id="email"
											type="email"
											name="email"
											placeholder="Enter Email"
											value={formData.email}
											onChange={handleInputChange}
											required
											pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
										/>

										{error && (
											<div className="my-1 text-danger text-center">
												Please enter a valid email address.
											</div>
										)}
										<button className="text-white btn btn-lg w-100 light-blue py-2">
											Reset Password
										</button>
										<div className="or-divide light-blue-secondary">
											<span className="rounded-2">or</span>
										</div>
									</form>

									<Link
										href="/sign-in"
										className="light-border-blue w-100 buff-text-color"
									>
										Login
									</Link>
								</div>
							</div>
						</motion.div>
					</div>
				</div>
			</section>
		</>
	);
};

export default ForgotForm;
