import React, { createContext, useState, useEffect } from "react";
const DialogueAnimationContext = createContext();

const DialogueAnimationProvider = ({ children, exerciseTitle }) => {
   const [showVideo, setShowVideo] = useState(true);
   const [playing, setPlaying] = useState(false); // State to manage playing prop
   const [isFinished, setIsFinished] = useState(false); // State to manage playing prop
   const handleFinish = () => {
      setIsFinished(true);
      setShowVideo(false);
      setPlaying(false);
   };
   useEffect(() => {
      if (!isFinished) {
         localStorage.setItem("currentIndex", "1");
      } else {
         // Update the isFinished property of the current exercise in local storage
         const storedExercises = JSON.parse(
            localStorage.getItem("lessons_exercises")
         );

         const updatedExercises = [...storedExercises];

         const index = updatedExercises.findIndex(
            (exercise) => exercise.name === exerciseTitle
         );

         updatedExercises[index].isFinished = true;

         localStorage.setItem(
            "lessons_exercises",
            JSON.stringify(updatedExercises)
         );
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
         }}
      >
         {children}
      </DialogueAnimationContext.Provider>
   );
};
export { DialogueAnimationProvider, DialogueAnimationContext };
