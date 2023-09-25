import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Swal from 'sweetalert2';
const RegisterForm = () => {
	const router = useRouter();
	const [step, setStep] = useState(1);
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [whyJoin, setWhyJoin] = useState('');
	const [formFilled, setFormFilled] = useState(false);
	const [error, setError] = useState(null);

	const handleChange = (e) => {
		const { name, id, value } = e.target;
		if (id === 'name') {
			setName(value);
		} else if (id === 'email') {
			setEmail(value);
		} else if (id === 'password') {
			setPassword(value);
		} else if (id === 'confirm-password') {
			setConfirmPassword(value);
		} else if (name === 'userPreference') {
			setWhyJoin(value);
		}

		// Check if all required inputs have values
		// if (name && email && password && confirmPassword) {
		//     setFormFilled(true);
		// } else {
		//     setFormFilled(false);
		// }
	};
	// handlePrompt function
	let timerInterval;
	const handlePrompt = (promptType) => {
		Swal.fire({
			position: 'center',
			icon: 'success',
			title: 'Registration Completed !',
			html: '<h3>Redirecting to Login page...</h3>',
			timer: 2000,
			allowOutsideClick: false,
			allowEscapeKey: false,
			allowEnterKey: false,
			color: '#2f4f4f',
			timerProgressBar: true,
			didOpen: () => {
				Swal.showLoading();
				timerInterval = setInterval(() => {}, 100);
			},
			willClose: () => {
				clearInterval(timerInterval);
			},
		}).then((result) => {
			/* Read more about handling dismissals below */
			if (result.dismiss === Swal.DismissReason.timer && promptType === 'LoginPage') {
				router.push('/sign-in');
			}
		});
	};
	const performCheck = (e) => {
		e.preventDefault();

		// Check if all required inputs have values
		if (name && email && password && confirmPassword) {
			// Check if email is valid using a regular expression
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(email)) {
				setFormFilled(false);
				setError('Please enter a valid email address');
				return;
			}

			if (password === confirmPassword) {
				setFormFilled(true);
				setTimeout(() => {
					// Navigate to renderStepTwo
					setStep(2);
					setError(null);
				}, 500);
			} else {
				setFormFilled(false);
				setError('Password & Confirm Password did not Match');
			}
		} else {
			setFormFilled(false);
			setError('Please fill up necessary fields !');
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (whyJoin !== '') {
			try {
				const response = await fetch('/api/register', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						name,
						email,
						password,
						confirmPassword,
						whyJoin,
					}),
				});

				setError(null);
				const data = await response.json();
				console.log(data);
				console.log(whyJoin);
				if (response.ok) {
					// user is authenticated, redirect or show success message
					setTimeout(() => {
						// Navigate to /sign-in using the Link component
						handlePrompt('LoginPage');
					}, 1000);
				}
			} catch (error) {}
			console.error(error);
		} else {
			setFormFilled(false);
			setError('You must select one of the above choices');
		}
	};

	const renderStepOne = () => {
		return (
			<>
				<section className="login-area">
					{/* <h3 className="text-center mb-40 buff-text-color">
                        Sign up From Here
                    </h3> */}
					<div className="row">
						<div className="d-flex justify-content-center">
							<div className="text-center">
								<h3 className="tp-section-title px-2 buff-text-color">Sign-up From Here</h3>
								<hr className="shadow-sm border border-1 border-secondary opacity-25 rounded mt-0 mx-2" />
							</div>
						</div>
					</div>
					<h5 className="text-left mt-30 mb-10 text-center buff-text-color">
						Personal Information
					</h5>
					<label htmlFor="name" className="buff-text-color mx-0">
						Your Name <span>*</span>
					</label>
					<input
						id="name"
						className="border border-secondary border-1 rounded-2 buff-text-color"
						type="text"
						placeholder="Enter your name"
						value={name}
						onChange={handleChange}
						required
					/>
					<label htmlFor="email" className="buff-text-color mx-0">
						Email Address <span>*</span>
					</label>
					<input
						id="email"
						className="border border-secondary border-1 rounded-2 buff-text-color"
						type="email"
						placeholder="Enter your email address"
						value={email}
						onChange={handleChange}
						required
					/>
					<label htmlFor="password" className="buff-text-color mx-0">
						Password <span>*</span>
					</label>
					<input
						id="password"
						className="border border-secondary border-1 rounded-2 buff-text-color"
						type="password"
						placeholder="Enter a password"
						value={password}
						onChange={handleChange}
						required
					/>
					<label htmlFor="confirm-password" className="buff-text-color mx-0">
						Confirm Password <span>*</span>
					</label>
					<input
						id="confirm-password"
						className="border border-secondary border-1 rounded-2 buff-text-color"
						type="password"
						placeholder="Confirm your password"
						value={confirmPassword}
						onChange={handleChange}
						required
					/>

					{formFilled ? (
						<button
							className="text-white btn btn-lg w-100 light-blue"
							type="submit"
							onClick={performCheck}
						>
							Next
						</button>
					) : (
						<>
							<div className="my-1 text-danger text-center">{error}</div>
							<button
								className="text-white btn btn-lg w-100 light-blue"
								type="submit"
								onClick={performCheck}
							>
								Next
							</button>
						</>
					)}
				</section>
			</>
		);
	};

	const renderStepTwo = () => {
		return (
			<>
				<section className="login-area">
					<h3 className="text-center mb-30">Why do you Want to Join ?</h3>
					<div className="row mb-10">
						<div className="col-lg-5 col-md-12 courser-list-width-register mb-10">
							<div className="course-sidebar-register">
								<div className="course-sidebar__widget mb-20">
									<div className="course-sidebar__info c-info-list">
										<div className="form-check form-check-inline mb-10">
											<input
												className="form-check-input custom-radio mt-0 pt-0"
												name="userPreference"
												type="radio"
												id="why-join"
												value="learn-french-at-beginner's-level-psychological"
												onClick={handleChange}
											/>
											<label
												className="form-check-label ml-3 mb-4 d-block custom-label"
												htmlFor="level1"
											>
												I want to learn French at a beginner's level and use a method
												that integrates psychological concepts that facilitate the
												learning process.
											</label>
										</div>
										<div className="form-check form-check-inline mb-10">
											<input
												className="form-check-input custom-radio mt-0 pt-0"
												name="userPreference"
												type="radio"
												id="why-join"
												value="learn-french-at-beginner's-level-executive"
												onClick={handleChange}
											/>
											<label
												className="form-check-label ml-3 mb-4 d-block"
												htmlFor="level2"
											>
												I want to learn French at a beginners’ level and improve my
												executive functions (advised until 14 y.o.).
											</label>
										</div>
										<div className="form-check form-check-inline">
											<input
												className="form-check-input custom-radio mt-0"
												name="userPreference"
												type="radio"
												id="why-join"
												value="want-to-integrate-
                                                this-course"
												onClick={handleChange}
											/>
											<label
												className="form-check-label ml-3 mb-4 d-block"
												htmlFor="level3"
											>
												We are a school and we want to integrate this course in our
												curriculum activities
											</label>
										</div>
									</div>
								</div>
								{error && <div className="mt-0 text-danger text-center">{error}</div>}
							</div>
						</div>
					</div>
				</section>
				<div className="d-flex justify-content-between">
					<button
						className="btn btn-lg buff shadow px-5 py-2 h3 pt-0"
						onClick={() => setStep(1)}
					>
						<span className="text-white h5">Back</span>
					</button>
					<button
						className="btn btn-lg light-blue shadow px-5 py-2 h3 pt-0"
						onClick={handleSubmit}
					>
						<span className="text-white h5">Proceed</span>
					</button>
				</div>
			</>
		);
	};

	return (
		<section className="login-area pt-50 pb-50 bone">
			<div className="container">
				<div className="row">
					<div className="col-lg-8 offset-lg-2 ">
						<div className="basic-login card-color border border-secondary border-1 rounded-4">
							{step === 1 && (
								<motion.div
									key="step1"
									className="step-wrapper"
									// we can use initial opacity 0.5 and y 0% in both motion div for better subtleness
									initial={{ opacity: 0, y: '0%' }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0, x: '-70%' }}
									transition={{ duration: 1, ease: 'easeOut' }}
								>
									{renderStepOne()}
								</motion.div>
							)}
							{step === 2 && (
								<motion.div
									key="step2"
									className="step-wrapper"
									// we can use initial opacity 0.5 and y 0% in both motion div for better subtleness
									initial={{ opacity: 0, y: '0%' }}
									animate={{ opacity: 1, x: 0 }}
									exit={{ opacity: 0.5, x: '-100%' }}
									transition={{ duration: 1, ease: 'easeOut' }}
								>
									{renderStepTwo()}
								</motion.div>
							)}

							{/* <div className="or-divide light-blue-secondary">
								<span className="rounded-2">or</span>
							</div> */}
							{/* 
							<Link href="/sign-in" className="btn btn-lg w-100 light-border-blue">
								Login
							</Link> */}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default RegisterForm;
