import { useContext } from 'react';
import Confetti from 'react-confetti';
import GameTitle from '../components/game-title';
import GameBody from '../components/game-body';
import CustomButton from '../components/CustomButton';
import { SoundLibraryContext } from '@/src/context/SoundLibraryContext';

const SoundLibraryGame = () => {
	// Context
	const { handleGameStart, isGameStarted, evaluateAnswers, toggleScreen,checkedItems,handlePrompt } = useContext(SoundLibraryContext);
	// Handles Submit Alert Button Props
	const handleSubmitAll = () => {
		handlePrompt(
			'Do you want to submit the answers ?',
			"You won't be able to revert this!",
			'question',
			'handleSubmitAll'
		);
	};
	// Main GameBody Section
	const renderGameBody = (game_name) => {
		return <GameBody game={game_name} moveNext={evaluateAnswers} toggleScreen={toggleScreen} checkedItems={checkedItems} handlePrompt={handlePrompt}/>;
	};
	// Submit Answer Section
	const renderSubmitButton = () => {
		return (
			<CustomButton
				onClick={handleSubmitAll}
				text={'Submit'}
				placeHolder={'Submit-Icon'}
				colorString={'buff py-2'}
				borderColor={'warning'}
			/>
		);
	};

	// Start Game Section
	const renderGameStartSection = () => {
		return (
			<ul className="memory-game-color d-flex align-items-center justify-content-center">
				<CustomButton
					onClick={handleGameStart}
					text={'Start Game'}
					placeHolder={'StartGame-Icon'}
					colorString={'light-green py-3'}
					borderColor={'success'}
				/>
			</ul>
		);
	};

	return (
		<>
			<section className="course-area pt-50 pb-50 bone">
				<div className="container">
					{!isGameStarted ? (
						<>
							<GameTitle title="Sound Library Exercise" />
							{renderGameStartSection()}
						</>
					) : (
						<>{renderGameBody('sound-library')}</>
					)}
				</div>
			</section>
		</>
	);
};

export default SoundLibraryGame;
