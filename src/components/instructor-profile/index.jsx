import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import CounterArea from "../homes/home-3/counter-area";
import InstructorPortfolioArea from "./instructor-portfolio-area";

const InstructorProfile = () => {
   return (
      <>
         <div className='d-block my-auto'>
            <InstructorPortfolioArea />
         </div>
      </>
   );
};

export default InstructorProfile;
