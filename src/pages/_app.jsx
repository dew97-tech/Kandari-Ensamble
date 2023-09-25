import { useState, useEffect } from 'react';
import { Josefin_Sans } from '@next/font/google';
import NextNProgress from 'nextjs-progressbar';
import '@/src/styles/index.scss';
import 'react-tooltip/dist/react-tooltip.css';

const josefin_sans = Josefin_Sans({
	subsets: ['latin'],
});
export default function App({ Component, pageProps }) {
	const [exercises, setExercises] = useState([
		{ name: 'Dialogue Animation', isFinished: false },
		{ name: 'Memory Game', isFinished: false },
		{ name: 'Place in Right Order 1', isFinished: false },
		{ name: 'Study the Dialogue 1', isFinished: false },
		{ name: 'Place in Right Order 2', isFinished: false },
		{ name: 'Study the Dialogue 2', isFinished: false },
		{ name: 'Gaps Exercise', isFinished: false },
		{ name: 'Study the Dialogue 3', isFinished: false },
		{ name: 'Visual Memory Game', isFinished: false },
		{ name: 'Role Play 1', isFinished: false },
		{ name: 'Role Play 2', isFinished: false },
		{ name: 'Dictation Memory Game', isFinished: false },
		{ name: 'Express Yourself 1', isFinished: false },
		{ name: 'Express Yourself 2', isFinished: false },
		{ name: 'Place in Right Order (Without Video)', isFinished: false },
		{ name: 'Fill in the Gaps', isFinished: false },
		{ name: 'Sound Library Exercise', isFinished: false },
	]);

	useEffect(() => {
		const storedExercises = JSON.parse(localStorage.getItem('lessons_exercises'));
		if (storedExercises) {
			setExercises(storedExercises);
		} else {
			localStorage.setItem('lessons_exercises', JSON.stringify(exercises));
			setExercises(exercises);
		}
	}, []);

	return (
		<main className={josefin_sans.className}>
			<NextNProgress color="#FF6652" height={4} startPosition={0.3} stopDelayMs={100} />
			<Component {...pageProps} />
		</main>
	);
}
