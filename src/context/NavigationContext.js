import React, { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import lesson_data from '../layout/headers/lesson-data';

const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
	const router = useRouter();
	const [currentExerciseId, setCurrentExerciseId] = useState(1); // Initialize with the initial exercise ID
	const [previousExerciseId, setPreviousExerciseId] = useState(null); // Initialize previousExerciseId as null

	// Function to navigate to a specific exercise
	const navigateToExercise = (exerciseId) => {
		const exercise = lesson_data[0].sub_menus.find((item) => item.serialNo === exerciseId);
		if (exercise) {
			setPreviousExerciseId(currentExerciseId); // Store the previous exerciseId
			setCurrentExerciseId(exerciseId);
			// Store the current exercise ID in local storage
			localStorage.setItem('currentIndex', exerciseId.toString());
			localStorage.setItem(
				'previousIndex',
				previousExerciseId !== null ? previousExerciseId.toString() : '1'
			);
			// Navigate to the exercise's link
			router.push(exercise.link);
		}
	};

	// Function to handle navigation to the previous exercise
	const handlePrevious = () => {
		const currentIndex = lesson_data[0].sub_menus.findIndex(
			(item) => item.serialNo === currentExerciseId
		);
		if (currentIndex > 0) {
			const previousExerciseId = lesson_data[0].sub_menus[currentIndex - 1].serialNo;
			navigateToExercise(previousExerciseId);
		}
	};

	// Function to handle navigation to the next exercise
	const handleNext = () => {
		const currentIndex = lesson_data[0].sub_menus.findIndex(
			(item) => item.serialNo === currentExerciseId
		);
		if (currentIndex < lesson_data[0].sub_menus.length - 1) {
			const nextExerciseId = lesson_data[0].sub_menus[currentIndex + 1].serialNo;
			navigateToExercise(nextExerciseId);
		}
	};

	// Function to retrieve the PreviousIndex from local storage on initial load
	useEffect(() => {
		return () => {
			const previousIndex = localStorage.getItem('previousIndex');
			if (previousIndex) {
				setPreviousExerciseId(Number(previousIndex));
			}
		};
	}, []);
	// Cleanup function to remove currentIndex from local storage on unmount
	useEffect(() => {
		const currentIndex = parseInt(localStorage.getItem('currentIndex'), 10);

		if (currentIndex === 1) {
			// If the user is starting from exerciseId 1, remove both currentIndex and previousIndex
			localStorage.removeItem('currentIndex');
			localStorage.removeItem('previousIndex');
		}
	}, []);

	// Function to retrieve the currentIndex from local storage on initial load
	useEffect(() => {
		const savedExerciseId = localStorage.getItem('currentIndex');
		if (savedExerciseId) {
			setCurrentExerciseId(Number(savedExerciseId));
		}
	}, []);

	// Lesson Path Progress Checker
	

	return (
		<NavigationContext.Provider
			value={{ currentExerciseId, previousExerciseId, handlePrevious, handleNext }}
		>
			{children}
		</NavigationContext.Provider>
	);
};

export { NavigationContext, NavigationProvider };
