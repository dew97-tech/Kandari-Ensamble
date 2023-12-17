import React, { createContext, useContext, useState } from "react";
import { useRouter } from "next/router";
import lesson_data from "@/src/layout/headers/lesson-data";
import { useLocalStorage } from "@/hooks/useLocalStorage"; // Import your useLocalStorage hook

const NavigationContext = createContext();

export const NavigationProvider = ({ children }) => {
   const [currentIndex, setCurrentIndex] = useState(0);
   const router = useRouter();
   const localStorageKey = "currentExercise"; // Set your local storage key
   const { setItem, getItem } = useLocalStorage(localStorageKey);

   const goToNextExercise = () => {
      const totalExercises = lesson_data[0].sub_menus.length;

      setCurrentIndex((prevIndex) => (prevIndex < totalExercises - 1 ? prevIndex + 1 : 0));

      const currentExercise = lesson_data[0].sub_menus.find((exercise) => router.asPath.includes(exercise.link));

      const currentSerialNo = currentExercise ? currentExercise.serialNo : 1;

      const nextSerialNo = currentSerialNo === totalExercises ? 1 : currentSerialNo + 1;

      const nextExercise = lesson_data[0].sub_menus.find((exercise) => exercise.serialNo === nextSerialNo);

      if (nextExercise) {
         setItem(nextExercise); // Save the next exercise info to local storage
         router.push(nextExercise.link);
      }
   };

   // Additional logic to get the current exercise from local storage
   const getCurrentExercise = () => {
      return getItem();
   };

   return (
      <NavigationContext.Provider value={{ currentIndex, goToNextExercise, getCurrentExercise }}>
         {children}
      </NavigationContext.Provider>
   );
};

export const useNavigation = () => {
   const context = useContext(NavigationContext);
   if (!context) {
      throw new Error("useNavigation must be used within a NavigationProvider");
   }
   return context;
};
