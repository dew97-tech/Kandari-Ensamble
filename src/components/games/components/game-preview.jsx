import React, { useContext } from "react";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { GameContext } from "@/src/context/GameContext";
import AudioPlayer from "../memory-games/audio-player";

// The GamePreview component displays a clickable word that triggers a tooltip and an audio player.
const GamePreview = ({ guessedWord, dutchTranslation, audioUrl }) => {
   // Access the isStudying flag from the GameContext to conditionally render game elements.
   const { isStudying } = useContext(GameContext);

   // Function to sanitize ID by removing any special characters to ensure compatibility with HTML attributes.
   const sanitizeId = (id) => {
      return id.replace(/[^a-zA-Z0-9]/g, "");
   };

   // Sanitize the guessedWord to use as a DOM ID for the tooltip trigger and content.
   const sanitizedId = sanitizeId(guessedWord);

   return (
      <>
         {/* Render the game preview only if in studying mode */}
         {isStudying && (
            <div className='text-center'>
               <ul className='memory-game-color d-flex align-items-center justify-content-center'>
                  {/* Word button that triggers tooltip */}
                  <a
                     className='btn c-color-blue ml-10 py-2 border border-1 border-primary buff-text-color mb-0 shadow-sm'
                     data-tooltip-id={sanitizedId}
                  >
                     {guessedWord}
                  </a>

                  {/* Tooltip that displays Dutch translation of the guessed word */}
                  <Tooltip
                     className='btn py-2'
                     id={sanitizedId}
                     variant='dark'
                     style={{
                        fontSize: "15px",
                        borderColor: "black",
                        color: "whitesmoke",
                        borderRadius: "10px",
                        zIndex: "1",
                     }}
                     content={dutchTranslation}
                     place='bottom'
                  />

                  {/* Audio player component for playing pronunciation or example usage */}
                  <AudioPlayer audioUrl={audioUrl} context={GameContext} setIsAudioPlaying={null} />
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
