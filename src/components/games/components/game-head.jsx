import React, { useState } from 'react';
import CustomButton from './CustomButton';
import Lifeline from './lifeline';
import { RightOrderContext } from '@/src/context/RightOrderContext';
const GameHead = ({
	score,
	feedbackMessage,
	attempts,
	currentIndex,
	sentences,
	sentenceLength,
	game,
	currentQuestion,
	isFinished,
}) => {
	return (
		<>
			<div className="row">
				<h4 className="tp-title-small buff-text-color mb-5">{feedbackMessage}</h4>
			</div>
			{!game && (
				<div className="d-flex flex-column mb-30">
					<div className="d-flex justify-content-end">
						{!isFinished ? (
							<h4 className="buff-text-color light-green h4 px-2 py-2 border border-success border-2 shadow rounded">
								{/* You Scored : {score} / {sentenceLength} */}
								<Lifeline context={RightOrderContext} />
							</h4>
						) : (
							<h4 className="buff-text-color light-green h4 px-2 py-2 border border-success border-2 shadow rounded">
								You Scored : {score} / {sentenceLength}
								{/* <Lifeline context={RightOrderContext}/> */}
							</h4>
						)}
					</div>
					{/* Since our condition is falsy and so doesn't return the second argument if there otherwise prints 0  */}
					{/* To make it safe, we used a ternary expression  */}
					{attempts >= 0 ? (
						<>
							<h5 className="buff-text-color align-self-end my-2 text-left h5">
								Remaining Attempts : {attempts} / 2
							</h5>
						</>
					) : null}
				</div>
			)}
			{game === 'gap-exercise' && (
				<div className="d-flex align-items-center justify-content-start mb-10">
					<h4 className="buff-text-color mr-10">The Dutch Sentence:</h4>
					<h4 className="buff-text-color px-2 py-2 rounded buff">
						{currentQuestion.hintSentence}
					</h4>
				</div>
			)}
			{/* {game === 'dictation-game' && (
                <div className="d-flex align-items-center justify-content-end mb-10">
                    <span
                        className={`btn btn-sm buff-text-color card-color h5 mr-10 border-bottom border-3 border-secondary rounded-2 shadow-sm ${
                            showHint ? 'd-none' : ''
                        }`}
                        onClick={() => {
                            setShowHint(true);
                            setTimeout(() => setShowHint(false), 1000);
                        }}>
                        Want help ?
                    </span>

                    <h4
                        className={`buff-text-color px-2 py-2 rounded buff ${
                            showHint ? '' : 'd-none'
                        }`}>
                        {currentQuestion.sentenceToSpeech}
                    </h4>
                </div>
            )} */}
			{/* {!game && (
                // only for RightOrderGame
                <div className="d-flex align-items-center justify-content-start flex-wrap mb-10 mt-10">
                    <h4 className="buff-text-color mr-10">Write this in French:</h4>
                    <h4 className="buff-text-color px-2 py-2 rounded buff">
                        {sentences[currentIndex].hintSentence}
                    </h4>
                </div>
            )} */}
		</>
	);
};

export default GameHead;
