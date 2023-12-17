import { useContext } from "react";
import { NavigationContext } from "@/src/context/NavigationContext";

const useCurrentExercise = () => {
   const { currentExerciseId, setCurrentExerciseId } = useContext(NavigationContext);
   return { currentExerciseId, setCurrentExerciseId };
};

export default useCurrentExercise;
