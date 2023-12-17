import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
const DialogueAnimationContext = createContext();

const DialogueAnimationProvider = ({ children, exerciseTitle }) => {
   const [showVideo, setShowVideo] = useState(true);
   const [playing, setPlaying] = useState(false); // State to manage playing prop
   const [isFinished, setIsFinished] = useState(false); // State to manage playing prop
   const handlePrompt = (title, text, iconType, promptType) => {
      Swal.fire({
         title: title,
         text: text,
         icon: iconType,
         color: "darkslategray",
         background: "#f5f5f5",
         focusConfirm: false,
         returnFocus: false,
         cancelButtonColor: "#ff5c5c",
         showCancelButton: true,
         confirmButtonColor: "#82d995",
         confirmButtonText: "Yes",
         // denyButtonText: `Don't save`,
      }).then((result) => {
         /* Read more about isConfirmed, isDenied in the Docs */
         if (result.isConfirmed) {
            if (promptType === "handleRestart") {
               handleRestart();
            }
         }
      });
   };
   const handleFinish = () => {
      setIsFinished(true);
      setShowVideo(false);
      setPlaying(false);
   };
   const handleRestart = () => {
      setIsFinished(false);
      setShowVideo(true);
      setPlaying(true);
   };
   useEffect(() => {
      if (!isFinished) {
         localStorage.setItem("currentIndex", "1");
      } else {
         // Update the isFinished property of the current exercise in local storage
         const storedExercises = JSON.parse(localStorage.getItem("lessons_exercises"));

         const updatedExercises = [...storedExercises];

         const index = updatedExercises.findIndex((exercise) => exercise.name === exerciseTitle);

         updatedExercises[index].isFinished = true;

         localStorage.setItem("lessons_exercises", JSON.stringify(updatedExercises));
      }
   }, [isFinished]);

   return (
      <DialogueAnimationContext.Provider
         value={{
            // States
            showVideo,
            playing,
            isFinished,
            setPlaying,
            setShowVideo,
            setIsFinished,

            // Functions
            handleFinish,
            handleRestart,
            handlePrompt,
         }}
      >
         {children}
      </DialogueAnimationContext.Provider>
   );
};
export { DialogueAnimationProvider, DialogueAnimationContext };
