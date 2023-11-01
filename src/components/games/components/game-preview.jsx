import React, { useState, useContext, useEffect, useRef } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';
import { GameContext } from '@/src/context/GameContext';
import AudioPlayer from '../memory-games/audio-player';

const GamePreview = ({ guessedWord, dutchTranslation, audioUrl }) => {
	const { isStudying } = useContext(GameContext);

	return (
		<>
			{isStudying && (
				<div className="text-center">
					<ul className="memory-game-color d-flex align-items-center justify-content-center">
						<a
							className="btn c-color-blue ml-10 py-2 border border-1 border-primary buff-text-color mb-0 shadow-sm"
							data-tooltip-id={guessedWord}
						>
							{guessedWord}
						</a>

						<Tooltip
							className="btn py-2"
							id={guessedWord}
							variant="dark"
							style={{
								fontSize: '15px',
								borderColor: 'black',
								color: 'whitesmoke',
								borderRadius: '10px',
								zIndex: '1',
							}}
							content={dutchTranslation}
							place="bottom"
						/>
						<AudioPlayer audioUrl={audioUrl} context={GameContext} setIsAudioPlaying={null}/>
					</ul>
				</div>
			)}
		</>
	);
};

export default GamePreview;

{
	/* <Modal
    isOpen={modalIsOpen}
    onRequestClose={handleCloseModal}
    className="custom-modal">
    <div className="custom-modal-content">
        <audio controls>
            <source src="/assets/audio/sample_1.mp3" type="audio/mpeg" />
            Your browser does not support the audio element.
        </audio>
        <button
            className="btn btn-md btn-danger mt-10"
            onClick={handleCloseModal}>
            <span>Close</span>
        </button>
    </div>
</Modal> */
}
