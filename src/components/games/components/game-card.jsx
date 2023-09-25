import React, { useContext } from 'react';
import GameImage from './game-image';
import Frame2 from '../memory-games/Frame2';
import Frame3 from '../memory-games/Frame3';
import Frame4 from '../memory-games/Frame4';
import { GameCardContext } from '@/src/context/GameCardContext';
import GamePreview from './game-preview';
import { GameContext } from '@/src/context/GameContext';
import GameResult from '../memory-games/game-result';

const GameCard = ({
	index,
	img,
	audioUrl,
	no_img,
	guessedWord,
	dutchTranslation,
	englishTranslation,
	answers,
	setAnswers,
	UserAnswers,
	serial,
}) => {
	const { handleResult, isPlaying, showAll } = useContext(GameCardContext);
	const { handleStopTimer, isGameFinished, frame } = useContext(GameContext);

	const renderGameLogic = () => {
		if (isPlaying && !isGameFinished) {
			if (frame === 2) {
				return (
					<Frame2
						key={index}
						guessedWord={guessedWord}
						handleStopTimer={handleStopTimer}
						handleResult={handleResult}
						answers={answers}
						setAnswers={setAnswers}
					/>
				);
			} else if (frame === 3) {
				return (
					<Frame3
						key={index}
						guessedWord={guessedWord}
						handleStopTimer={handleStopTimer}
						handleResult={handleResult}
						answers={answers}
						setAnswers={setAnswers}
					/>
				);
			} else if (frame === 4) {
				return (
					<Frame4
						key={index}
						guessedWord={guessedWord}
						handleStopTimer={handleStopTimer}
						handleResult={handleResult}
						answers={answers}
						setAnswers={setAnswers}
					/>
				);
			}
		} else if (!isPlaying && !showAll) {
			return (
				<GamePreview
					key={index}
					guessedWord={guessedWord}
					englishTranslation={englishTranslation}
					dutchTranslation={dutchTranslation}
					audioUrl={audioUrl}
				/>
			);
		} else if (showAll && isGameFinished) {
			return (
				<GameResult
					guessedWord={guessedWord}
					result={UserAnswers[serial]}
					answers={answers}
					index={index}
					audioUrl={audioUrl}
				/>
			);
		}
	};

	return (
		<div key={index} className="d-flex justify-content-center align-items-center">
			<div className="tpcourse wow fadeInUp" data-wow-duration=".8s" data-wow-delay=".2s">
				<div className="">
					<div className="card pb-0 pt-0 mb-5">
						{frame === 4
							? img && <img src={no_img} className="card-img-top" alt={`Card ${index}`} />
							: img && <img src={img} className="card-img-top" alt={`Card ${index}`} />}

						<div className="card-body py-1 pr-0 pl-0">{renderGameLogic()}</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GameCard;
