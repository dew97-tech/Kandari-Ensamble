import React from "react";
import OffCanvas from "../../wrapper-components/off-canvas";
import NavLinks from "../../wrapper-components/navlinks";
const CongratulationsComponent = ({ showOffCanvas }) => {
   return (
      <section className="course-area pt-30 pb-100 mb-200 mt-100 bone">
         <div className="container">
            {showOffCanvas && (
               <div className="d-flex justify-content-center align-items-center my-3">
                  <OffCanvas />
               </div>
            )}
            <div className="text-center">
               <h1 className="buff-text-color">Congratulations 🏆!</h1>
               <h1 className="buff-text-color">
                  You have successfully completed the exercise...
               </h1>
               <NavLinks />
            </div>
         </div>
      </section>
   );
};

export default CongratulationsComponent;
