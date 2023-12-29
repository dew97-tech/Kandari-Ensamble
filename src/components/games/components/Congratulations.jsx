import React from "react";
import OffCanvas from "../../wrapper-components/off-canvas";
import NavLinks from "../../wrapper-components/navlinks";
import CustomButton from "./CustomButton";
const CongratulationsComponent = ({ showOffCanvas, showScore, returnAchievement, handlePrompt, mistakes }) => {
   return (
      <section className='course-area pt-30 pb-100 bone'>
         <div className='container'>
            {/* {showOffCanvas && (
               <div className='d-flex justify-content-start align-items-center my-3'>
                  <OffCanvas />
               </div>
            )} */}
            <div className='text-center'>
               <h1 className='buff-text-color display-4'>🎉Congratulations🎊</h1>
               {showScore && (
                  <h3 className='text-center buff-text-color display-6 mb-50'>Jouw Score: {returnAchievement()}</h3>
               )}
               {/* {mistakes ? (
                  <h3 className='text-center buff-text-color display-6 mb-50'>Aantal Fouten: {mistakes}</h3>
               ) : null} */}
               {/* <NavLinks /> */}
               <div className='d-flex justify-content-between'>
                  <CustomButton
                     onClick={() => {
                        handlePrompt(
                           "Do you want to Restart the Game?",
                           "Your all progress will be lost !!",
                           "warning",
                           "handleRestart"
                        );
                     }}
                     text={"Restart"}
                     placeHolder={"Restart-Icon"}
                     iconText={"/assets/icons/restart.gif"}
                     colorString={"bittersweet"}
                     borderColor={"danger"}
                     isImageAvailable={true}
                  />
                  <NavLinks />
               </div>
            </div>
         </div>
      </section>
   );
};

export default CongratulationsComponent;
