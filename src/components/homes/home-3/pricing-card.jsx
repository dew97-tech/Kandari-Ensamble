import React from "react";
import { motion } from "framer-motion";
import PopupCalendly from "../../calendly/popup";

const PricingCard = ({ planName, description, duration, price, selectedDuration, packageType }) => {
   const bulletPoints = description.split("\n");

   // Check if the duration of the pricing card matches the selected duration
   const isMatchingDuration = planName.toLowerCase().includes(selectedDuration.toLowerCase());
   // Define animation variants
   const cardVariants = {
      hidden: { opacity: 0, y: 30 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
   };
   return (
      <motion.div
         className={`card mb-1 shadow p-2 border border-2 border-secondary col-xl-9 col-lg-10 col-md-12${
            isMatchingDuration ? "d-block" : "d-none"
         }`}
         variants={cardVariants}
         initial='hidden'
         animate='visible'
      >
         <div className='text-center '>
            <h5 className='card-title buff-text-color fs-1 p-2'>{packageType}</h5>
            <hr className='mt-0 mx-3 mb-0' />
         </div>

         <motion.div className='card-body text-center ' variants={cardVariants}>
            <div className='mb-2 py-3 memory-game-color'>
               {price ? (
                  <>
                     <h1 className='card-subtitle light-blue-text-color mb-3 fs-1'>
                        {price}
                        <span className='small buff-text-color fs-4'>/ {duration} months</span>
                     </h1>
                     <div className='btn light-blue fs-5 py-2 px-4'>
                        <PopupCalendly buttonText='Subscribe' />
                     </div>
                  </>
               ) : (
                  <div className='btn light-blue fs-5 py-2 px-4'>
                     <PopupCalendly buttonText='Reach out for Lisence' />
                  </div>
               )}
            </div>
            <div className='mt-10 p-1'>
               <hr className='mb-30 mt-0' />
               <p className='card-subtitle mb-4 buff-text-color fs-5 text-start'>We offer</p>
               <div className='tp-about-list'>
                  <ul className='text-start '>
                     {bulletPoints.map((point, index) => (
                        <li className='' key={index}>
                           <i className='fa-light fa-check'></i>
                           <span className='buff-text-color'>{point}</span>
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         </motion.div>
      </motion.div>
   );
};

export default PricingCard;
