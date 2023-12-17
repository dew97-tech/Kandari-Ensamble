import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useState, useEffect } from "react";
import { initialExercises } from "./exerciseData";

export const useExercises = () => {
   const { getItem, setItem } = useLocalStorage("lessons_exercises");
   const [exercises, setExercises] = useState(getItem());

   useEffect(() => {
      if (!exercises) {
         setItem(initialExercises);
         setExercises(initialExercises);
      }
   }, [exercises, setItem]);

   return exercises;
};
