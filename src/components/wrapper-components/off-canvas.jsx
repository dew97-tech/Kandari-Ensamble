import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { Offcanvas } from 'react-bootstrap';
import Link from 'next/link';
// Import your data.js file
import lesson_data from '@/src/layout/headers/lesson-data';
const OffCanvas = () => {
	const cardStyle = {
		backgroundColor: 'wheatsmoke',
		borderRadius: '1rem',
		padding: '0.5rem',
		zIndex: '9999',
	};
	const [show, setShow] = useState(false);
	const [isComplete, setIsComplete] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const [finishedExercises, setFinishedExercises] = useState([]);

	useEffect(() => {
		const stored = JSON.parse(localStorage.getItem('lessons_exercises'));
		if (!stored) return;
		const finished = stored.filter((ex) => ex.isFinished).map((ex) => ex.name);
		setFinishedExercises(finished);
	}, [show]);

	const isFinished = (name) => finishedExercises.includes(name);
	return (
		<>
			<Button className="buff border border-secondary text-dark px-3 py-2" onClick={handleShow}>
				Lesson Path
			</Button>
			<div>
				<Offcanvas
					show={show}
					onHide={handleClose}
					backdrop={true}
					scroll={true}
					style={cardStyle}
				>
					<Offcanvas.Header className="h5" closeButton>
						<Offcanvas.Title className="buff-text-color">LEÇON 1 : BONJOUR !</Offcanvas.Title>
					</Offcanvas.Header>
					<Offcanvas.Body>
						{/* Map through the sub_menus array and create links */}
						<ul className="offcanvas-links">
							{lesson_data[0].sub_menus.map((menu, index) => (
								<Link key={index} href={menu.link}>
									<li
										className={`btn btn-md my-3 bone my-0 px-3 py-2 d-none d-sm-block border border-1 border-secondary shadow-sm ${
											isFinished(menu.title) ? 'light-green' : 'buff-text-color'
										}`}
									>
										{menu.title}
									</li>
								</Link>
							))}
						</ul>
					</Offcanvas.Body>
				</Offcanvas>
			</div>
		</>
	);
};

export default OffCanvas;
