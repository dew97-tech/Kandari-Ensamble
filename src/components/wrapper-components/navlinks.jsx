import React, { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import lesson_data from '@/src/layout/headers/lesson-data';
import { NavigationContext } from '@/src/context/NavigationContext';

const NavLinks = () => {
	const { currentExerciseId, previousExerciseId, handlePrevious, handleNext } =
		useContext(NavigationContext);

	const currentIndex = lesson_data[0].sub_menus.findIndex(
		(item) => item.serialNo === currentExerciseId
	);
	console.log('currentIndex', currentIndex);
	return (
		<>
			<div className="d-flex align-items-center justify-content-end">
				{/* <Button
					variant="outline-primary"
					className="border-2 px-3 py-2 mx-2"
					onClick={handlePrevious}
					disabled={currentExerciseId === 1} // Disable if at the first exercise
				>
					Previous
				</Button> */}
				<Button
					variant="primary"
					className="border-2 px-3 py-2"
					onClick={handleNext}
					disabled={currentIndex === lesson_data[0].sub_menus.length - 1} // Disable if at the last exercise
				>
					Next
				</Button>
			</div>
		</>
	);
};

export default NavLinks;
