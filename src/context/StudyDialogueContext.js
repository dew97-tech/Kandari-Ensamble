import React, { createContext, useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
const StudyDialogueContext = createContext();

const StudyDialogueProvider = ({ children, exerciseId, exerciseTitle }) => {
   const [slides, setSlides] = useState([]); // State to store fetched slides
   const [currentSlide, setCurrentSlide] = useState(0); // Index of the current slide
   const [currentExerciseId, setCurrentExerciseId] = useState(exerciseId);
   const [playing, setPlaying] = useState(true); // Video playing state
   const [showVideo, setShowVideo] = useState(true); // Video visibility state
   const [showGame, setShowGame] = useState(false); // Game visibility state
   const [isFinished, setIsFinished] = useState(false); // Game finished state
   const [currentSlideStartTime, setCurrentSlideStartTime] = useState(0); // Added for the new version of the exercise
   const [currentSlidePauseTime, setCurrentSlidePauseTime] = useState(0); // Added for the new version of the exercise
   const [playingAudio, setPlayingAudio] = useState(null);
   // Video source URL
   // const src = 'https://res.cloudinary.com/debhfgo5p/video/upload/v1689683156/maison.mp4';

   // ... your handlePrompt function remains the same ...
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

   // Function to load questions from the API
   // Function to load questions from the API
   const fetcher = async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const res = await fetch(`/api/study-the-dialogue/${currentExerciseId}`);
      const data = await res.json();
      setSlides(data?.data);
      return data?.data;
   };
   // const loadQuestionsFromAPI = async () => {
   // 	try {
   // 		const response = await fetch('/api/study-the-dialogue');
   // 		const data = await response.json();
   // 		setSlides(data);
   // 	} catch (error) {
   // 		console.error('Failed to fetch questions from API:', error);
   // 	}
   // };

   // Load questions from API and shuffle when the component mounts
   useEffect(() => {
      if (slides.length > 0) {
         // Set start time and pause time for the initial slide
         setCurrentSlideStartTime(slides[currentSlide]?.video?.startTime);
         setCurrentSlidePauseTime(slides[currentSlide]?.video?.pauseTime);
      }
   }, [slides, currentSlide]); // Adjusted the dependency to avoid unnecessary fetches

   const moveNext = () => {
      if (currentSlide <= slides.length - 1) {
         setCurrentSlide(currentSlide + 1);
         setPlaying(true); // Start playing the video
         setCurrentSlideStartTime(slides[currentSlide + 1]?.video?.startTime);
         setCurrentSlidePauseTime(slides[currentSlide + 1]?.video?.pauseTime);
      }
      setShowGame(false);
   };

   // handleFinish function helps to end the exercise and show the Previous Answer Component
   // const handleFinish = () => {
   //    setShowGame(false);
   //    setShowVideo(false);
   //    setPlaying(false);
   //    setIsFinished(true);
   // };
   // Exercise Progrssion Checker
   useEffect(() => {
      if (isFinished) {
         const storedExercises = JSON.parse(localStorage.getItem("lessons_exercises"));
         const updatedExercises = [...storedExercises];
         const index = updatedExercises.findIndex((exercise) => exercise.name === exerciseTitle);
         updatedExercises[index].isFinished = true;
         localStorage.setItem("lessons_exercises", JSON.stringify(updatedExercises));
      }
   }, [isFinished]);

   // Handles the restart of the game
   const handleRestart = () => {
      setCurrentSlide(0);
      setPlaying(true);
      setShowVideo(true);
      setShowGame(false);
      setIsFinished(false);
      setCurrentSlideStartTime(slides[0]?.video?.startTime);
      setCurrentSlidePauseTime(slides[0]?.video?.pauseTime);
   };

   // ... rest of your context implementation ...
   const timeStamp = slides[currentSlide]?.video?.pauseTime;
   console.log("startTime : ", slides[currentSlide]?.video?.startTime);
   console.log("pauseTime : ", slides[currentSlide]?.video?.pauseTime);

   return (
      <StudyDialogueContext.Provider
         value={{
            // src,
            showVideo,
            slides,
            currentSlide,
            playing,
            showGame,
            timeStamp,
            currentSlideStartTime,
            currentSlidePauseTime,
            isFinished,
            playingAudio,
            setIsFinished,
            setPlayingAudio,
            fetcher,
            setSlides,
            setCurrentSlide,
            setShowGame,
            setPlaying,
            moveNext,
            handlePrompt,
            setShowVideo,
            // movePrevious,
         }}
      >
         {children}
      </StudyDialogueContext.Provider>
   );
};
export { StudyDialogueContext, StudyDialogueProvider };
