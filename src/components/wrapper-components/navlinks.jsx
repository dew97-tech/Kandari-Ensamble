import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigation } from "@/src/context/NavigationContext";
import lesson_data from "@/src/layout/headers/lesson-data";

const NavLinks = () => {
   const { currentIndex, goToNextExercise } = useNavigation();

   return (
      <>
         <div className='d-flex align-items-center justify-content-end'>
            <Button
               variant='primary'
               className='border-2 px-3 py-2'
               onClick={goToNextExercise}
               disabled={currentIndex === lesson_data[0].sub_menus.length - 1}
            >
               Next
            </Button>
         </div>
      </>
   );
};

export default NavLinks;
