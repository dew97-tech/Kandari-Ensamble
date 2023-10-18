import { useState } from "react";
import { useLocalStorage } from "./useLocalStorage";

const useLessonProgress = () => {
   const { getItem } = useLocalStorage("lessons_exercises");
   const stored = getItem() || [];

   const finishedExercises = stored
      .filter((ex) => ex.isFinished)
      .map((ex) => ex.name);

   const isLessonFinished = (name) => finishedExercises.includes(name);

   return { isLessonFinished };
};

export default useLessonProgress;
