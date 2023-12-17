import { useLocalStorage } from "./useLocalStorage";

/**
 * Custom hook that tracks the progress of lessons.
 *
 * @returns {Object} An object containing the function `isLessonFinished`.
 */
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
