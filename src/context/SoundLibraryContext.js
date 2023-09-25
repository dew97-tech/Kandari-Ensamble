import React, { createContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";
const SoundLibraryContext = createContext();

const SoundLibraryProvider = ({ children, exerciseTitle }) => {
   const [isGameStarted, setIsGameStarted] = useState(false);
   const [questions, setQuestions] = useState([]); // state to store the questions from the API
   const [toggleScreen, setToggleScreen] = useState(false); // states helps to switch between screens
   const [checkedItems, setCheckedItems] = useState([]);
   const [userAnswers, setUserAnswers] = useState([]); // Array to store user answers
   const [isChecked, setIsChecked] = useState(false); // state to check if the user has checked the boxes
   const [isFinished, setIsFinished] = useState(false); // state to check if the user has finished the exercise
   const [playingAudio, setPlayingAudio] = useState(null); // state to check if the audio is playing
   // instance of the router
   const router = useRouter();
   // handlePrompt function
   let timerInterval;
   const handlePrompt = (promptType) => {
      Swal.fire({
         position: "center",
         icon: "success",
         title: "Word has added to Sound Library !",
         html: "<h3>Redirecting to Sound Libary...</h3>",
         timer: 2000,
         allowOutsideClick: false,
         allowEscapeKey: false,
         allowEnterKey: false,
         color: "#2f4f4f",
         timerProgressBar: true,
         didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {}, 100);
         },
         willClose: () => {
            clearInterval(timerInterval);
         },
      }).then((result) => {
         /* Read more about handling dismissals below */
         if (
            result.dismiss === Swal.DismissReason.timer &&
            promptType === "RedirectToSoundLibrary"
         ) {
            setIsFinished(true);
            router.push("/sound-library");
         }
      });
   };

   const handleRestart = () => {
      setIsGameStarted(false);
      setToggleScreen(false);
      setCheckedItems([]);
      setUserAnswers([]);
      setIsChecked(false);
   };
   const loadQuestionsFromAPI = async () => {
      try {
         const response = await fetch("/api/sound-library-exercise");
         const data = await response.json();
         setQuestions(data);
      } catch (error) {
         console.error(error);
      }
   };
   // Function to handle user answers
   const handleUserAnswer = (index, answer) => {
      setUserAnswers((prevAnswers) => {
         const updatedAnswers = [...prevAnswers];
         updatedAnswers[index] = answer;
         return updatedAnswers;
      });
   };
   // Load questions from API and shuffle when the component mounts
   useEffect(() => {
      if (questions.length <= 0) {
         loadQuestionsFromAPI();
      }
   }, []);

   // Exercise Tracking Function
   useEffect(() => {
      if (isFinished) {
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

   // Function to handle user French Input
   const evaluateAnswers = () => {
      questions.forEach((question, index) => {
         if (
            userAnswers[index]?.toLowerCase() ===
            question?.frenchTranslation.toLowerCase()
         ) {
            console.log(`Question ${index + 1}: Correct`);
         } else {
            console.log(`Question ${index + 1}: Incorrect`);
         }
      });
      setToggleScreen(!toggleScreen);
   };

   // handle Game Start
   const handleGameStart = () => {
      setIsGameStarted(true);
   };

   // const goNext = () => {
   // 	setToggleScreen(!toggleScreen);
   // };

   return (
      <SoundLibraryContext.Provider
         value={{
            // States
            isGameStarted,
            toggleScreen,
            checkedItems,
            isChecked,
            userAnswers,
            questions,
            // Setters
            playingAudio,
            setPlayingAudio,
            setCheckedItems,
            setIsChecked,
            // Functions
            handlePrompt,
            handleUserAnswer,
            evaluateAnswers,
            handleGameStart,
         }}
      >
         {children}
      </SoundLibraryContext.Provider>
   );
};
export { SoundLibraryProvider, SoundLibraryContext };
