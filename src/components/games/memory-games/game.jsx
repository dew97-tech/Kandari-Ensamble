import React, { useContext, useMemo } from 'react';
import our_game_data from '@/src/data/memory-game-data';
import GameTitle from '../components/game-title';
import GameTime from '../components/game-time';
import GameCard from '../components/game-card';
import CustomButton from '../components/CustomButton';
import { GameContext } from '@/src/context/GameContext';
import { GameCardProvider } from '@/src/context/GameCardContext';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Confetti from 'react-confetti';
import CongratulationsComponent from '../components/Congratulations';

const Game = () => {
	const {
		sentences,
		totalStudyTime,
		handleBeginStudy,
		isStudying,
		isPlaying,
		handleBeginPlay,
		totalPlayTime,
		answers,
		handleSubmitAll,
		updateAnswer,
		UserAnswers,
		isGameFinished,
		isGameStarted,
		handleGameStart,
		formatTime,
		frame,
		showFrame3,
		handlePrompt,
		isFinished,
	} = useContext(GameContext);

	// create a memoized version of the shuffled data:
	const shuffledGameData = useMemo(() => {
		if (sentences.length > 0) {
			return sentences.sort(() => Math.random() - 0.5);
		}
		return [];
	}, [sentences]);

	return (
		<>
			<section className="course-area bone">
				<div className="container col-lg-6 col-md-12 col-sm-12">
					{/* Passing gameTitle as Props */}
					<GameTitle title="Memory Game" />
					{isFinished && (
						<>
							<Confetti duration={3000} recycle={false} numberOfPieces={800} />
							<CongratulationsComponent  showOffCanvas={false}/>
						</>
					)}
					{isGameStarted ? (
						<div className="d-flex align-items-center justify-content-between mb-15">
							{(isStudying || isPlaying) && (
								<>
									<GameTime
										activity={'Studied'}
										totalTime={totalStudyTime}
										{...{ formatTime }}
									/>
									<GameTime
										activity={'Played'}
										totalTime={totalPlayTime}
										{...{ formatTime }}
									/>
								</>
							)}
						</div>
					) : (
						<ul className="memory-game-color d-flex align-items-center justify-content-center">
							<CustomButton
								onClick={handleGameStart}
								text={'Start Game'}
								placeHolder={'StartGame-Icon'}
								colorString={'light-green py-3'}
								borderColor={'success'}
								fontSize={'h3'}
							/>
						</ul>
					)}

					<GameCardProvider>
						<Container>
							<Row>
								{shuffledGameData.map(
									(item, index) =>
										(isStudying || isPlaying) && (
											<Col xl={4} lg={4} sm={4} md={4} xs={12}>
												<GameCard
													key={item.id}
													serial={index}
													gameLanguage={item.gameLanguage}
													img={item.img}
													no_img={item.no_img}
													guessedWord={item.guessedWord}
													dutchTranslation={item.translation.dutch}
													englishTranslation={item.translation.english}
													data_length={sentences.length}
													audioUrl={item.audioUrl}
													answers={answers[index]}
													setAnswers={(value) => updateAnswer(index, value)}
													UserAnswers={UserAnswers}
													frame={frame}
													showFrame3={showFrame3}
												/>
											</Col>
										)
								)}
							</Row>
						</Container>
					</GameCardProvider>

					{/* Rendering Only if Studying or Playing -> one of them its true ,then it will execute */}
					{(isStudying || isPlaying) && (
						<div className="memory-game-color d-flex align-items-center justify-content-end">
							{isPlaying && !isGameFinished && (
								<>
									{(frame === 2 || frame === 3 || frame === 4) && (
										<CustomButton
											onClick={() => {
												handlePrompt(
													'Do you want to submit the answers ?',
													"You won't be able to revert this!",
													'question',
													'handleSubmitAll'
												);
											}}
											text={'Submit'}
											placeHolder={'Submit-Icon'}
											colorString={'buff py-2'}
											borderColor={'warning'}
										/>
									)}
								</>
							)}

							{(!isPlaying || isGameFinished) && (
								<CustomButton
									onClick={() => {
										isStudying && frame === 1
											? handlePrompt(
													'Are you done memorising ?',
													'Do you want to start the game ?',
													'question',
													'handleBeginPlay'
											  )
											: handleBeginPlay();
									}}
									text={'Proceed'}
									placeHolder={'Proceed-Icon'}
									iconText={'/assets/icons/fast-forward.gif'}
									colorString={'c-color-green py-2'}
									borderColor={'success'}
									isImageAvailable={true}
								/>
							)}
						</div>
					)}
				</div>
			</section>
		</>
	);
};

export default Game;
