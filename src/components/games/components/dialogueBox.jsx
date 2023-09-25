import React, { useState } from "react";
import CustomButton from "./CustomButton";
import VoiceRecorder from "./VoiceRecorder";
const DialogueBox = ({ gameName, moveNext, movePrevious }) => {
   const renderStudyTheDialogueBox = () => {
      const [isMicAvailable, setIsMicAvailable] = useState(false);

      const micHandler = () => {
         setIsMicAvailable(true);
      };
      return (
         <>
            <div className="d-flex mt-10 align-items-center justify-content-between">
               <ul className="memory-game-color d-flex align-items-center justify-content-center">
                  <CustomButton
                     onClick={() => {
                        movePrevious();
                     }}
                     borderColor={"light"}
                     colorString={"bg-white rounded-3"}
                     placeHolder={"Skip-Back-Icon"}
                     margin={"mx-0"}
                     iconText={"/assets/icons/skip-back.svg"}
                     isImageAvailable={true}
                  />
               </ul>
               <ul className="memory-game-color d-flex align-items-center justify-content-center">
                  {/* <CustomButton
                     onClick={() => {
                        alert("Mic Clicked");
                     }}
                     borderColor={"light"}
                     colorString={"bg-white rounded-3"}
                     iconText={"/assets/icons/microphone-solid.svg"}
                     placeHolder={"Record-Icon"}
                     width={24}
                     isImageAvailable={true}
                     margin={"mx-0"}
                  /> */}
                  <VoiceRecorder micHandler={micHandler} />
               </ul>
               <ul className="memory-game-color d-flex align-items-center justify-content-center">
                  <CustomButton
                     onClick={() => {
                        moveNext();
                     }}
                     borderColor={"light"}
                     colorString={"bg-white rounded-3"}
                     iconText={"/assets/icons/skip-next.svg"}
                     placeHolder={"Skip-Next-Icon"}
                     onRight={true}
                     isImageAvailable={true}
                     margin={"mx-0"}
                  />
               </ul>
            </div>
         </>
      );
   };
   return <>{gameName && renderStudyTheDialogueBox()}</>;
};

export default DialogueBox;
