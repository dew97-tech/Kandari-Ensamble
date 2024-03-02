import React from "react";

import GameTitle from "./game-title";
const ErrorComponent = () => {
   return (
      <section className='course-area pt-200 pb-200 mb-200 mt-100 bone'>
         <div className='container'>
            <div className='d-flex flex-column align-items-center justify-content-center mx-2'>
               {/* <h3 className="mx-2">Please wait your Lesson is </h3>
					<h3 className="mx-2">Loading...</h3> */}
               <GameTitle title='Sorry! Er is iets fout gegaan.' />
               <div
                  className='alert alert-danger shadow-sm text-center h3 text-danger opacity-75 border border-danger'
                  role='alert'
               >
                  Probeer de pagina opnieuw te laden.
               </div>
            </div>
         </div>
      </section>
   );
};

export default ErrorComponent;
