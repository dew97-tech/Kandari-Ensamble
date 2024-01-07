import React, { useState } from "react";
import subscription_individual from "@/src/data/subscription-individual";
import subscription_school from "@/src/data/subscription-school";
import PricingCard from "./pricing-card";
import Switch from "react-switch";
import SwitchToggle from "./switch-toggle";

const Subscription = () => {
   const [selectedDuration, setSelectedDuration] = useState("individual");

   const handleDurationChange = (duration) => {
      setSelectedDuration(duration);
   };
   const ovalShapeStyle = {
      transform: `translateX(${selectedDuration === "school" ? "70%" : "-42%"})`,
      width: `${selectedDuration === "school" ? "7rem" : "9rem"}`,
   };

   return (
      <>
         <section className='blog-area pt-50 pb-90 bone'>
            <div className='container'>
               <div className='row'>
                  <div className='col-lg-12'>
                     <div className='section-title text-center mb-20'>
                        <h2 className='tp-section-title'>Subscriptions</h2>
                        {/* <p className='mb-20'>We got various packages</p> */}
                     </div>
                  </div>
               </div>
               {/* <div className='row mb-80'>
                  <div className='col-md-6 offset-md-3 text-center'>
                     <SwitchToggle selectedDuration={selectedDuration} handleDurationChange={handleDurationChange} />
                  </div>
               </div> */}
               <div className='row mb-40'>
                  <div className='col-md-6 offset-md-3 d-flex justify-content-center'>
                     <div className='button-container'>
                        <span
                           className={`btn-oval-overlay btn-sm fs-4 ${
                              selectedDuration === "individual" ? "active fw-semibold" : "buff-text-color"
                           }`}
                           onClick={() => handleDurationChange("individual")}
                        >
                           Individual
                        </span>
                        <span
                           className={`btn-oval-overlay btn-sm fs-4 ${
                              selectedDuration === "school" ? "active fw-semibold" : "buff-text-color"
                           }`}
                           onClick={() => handleDurationChange("school")}
                        >
                           School
                        </span>
                        <div className='oval-shape shadow-sm' style={ovalShapeStyle}></div>
                     </div>
                  </div>
               </div>

               <div className='row'>
                  {selectedDuration === "individual" &&
                     subscription_individual.map((item, i) => (
                        <div
                           key={i}
                           className='col-xl-6 col-lg-6 col-md-6 d-flex justify-content-evenly align-items-stretch'
                        >
                           <PricingCard
                              planName={item.title}
                              packageType={item.package}
                              description={item.description}
                              price={item.price}
                              duration={item.duration}
                              selectedDuration={selectedDuration}
                           />
                        </div>
                     ))}
                  {selectedDuration === "school" &&
                     subscription_school.map((item, i) => (
                        <div
                           key={i}
                           className='col-xl-6 col-lg-6 col-md-6 d-flex justify-content-evenly align-items-stretch'
                        >
                           <PricingCard
                              planName={item.title}
                              packageType={item.package}
                              description={item.description}
                              price={item.price}
                              duration={item.duration}
                              selectedDuration={selectedDuration}
                           />
                        </div>
                     ))}
               </div>
            </div>
         </section>
      </>
   );
};

export default Subscription;
