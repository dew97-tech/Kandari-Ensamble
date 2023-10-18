import React from "react";

// location_info
const location_info = [
   {
      id: 1,
      icon: "fa-light fa-phone",
      info: "(209) 555-0104",
   },
   {
      id: 2,
      icon: "fa-light fa-location-dot",
      info: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
   },
   {
      id: 3,
      icon: "fi fi-rr-envelope",
      info: "danghoang87hl@gmail.com",
   },
];

const LocationArea = () => {
   return (
      <>
         <div className='postbox__area bone pt-50 pb-24 px-2'>
            <div className='container p-4 border-2 rounded-3'>
               <div className='postbox__wrapper pr-20'>
                  <div className='mb-20 d-flex align-items-center justify-content-between text-center w-img'>
                     <h1 className='buff-text-color'>CONTACT</h1>
                  </div>
                  <div className='row'>
                     <div className='col-xl-6 col-md-6'>
                        <div className='location-item text-center mb-30'>
                           <div className='location-icon mb-25'>
                              <i className='fa-solid fa-phone fa-2xs'></i>
                           </div>
                           <div className='location-content'>
                              <h5 className='location-title '>
                                 <a
                                    className='buff-text-color'
                                    href='tell:316 50 41 96 71'
                                 >
                                    Telefoonnummer: +316 50 41 96 71
                                 </a>
                                 <br />
                                 <a
                                    className='buff-text-color'
                                    href='tell:8329950'
                                 >
                                    KVK nummer 8329950
                                 </a>
                              </h5>
                           </div>
                        </div>
                     </div>
                     <div className='col-xl-6 col-md-6'>
                        <div className='location-item text-center mb-30'>
                           <div className='location-icon mb-25'>
                              <i className='fa-solid fa-envelope fa-2xs'></i>
                           </div>
                           <div className='location-content'>
                              <h5 className='location-title'>
                                 <a
                                    className='buff-text-color'
                                    href='mailto:danghoang87hl@gmail.com'
                                 >
                                    maison.ensamble.test@g.edu.com
                                 </a>
                              </h5>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default LocationArea;

// import React from "react";
// import GameTitle from "../games/components/game-title";

// // location_info
// const location_info = [
//    {
//       id: 1,
//       icon: "fa-light fa-phone",
//       info: "+316 50 41 96 71",
//    },
//    {
//       id: 2,
//       icon: "fa-light fa-location-dot",
//       info: "1901 Thornridge Cir. Shiloh, Hawaii 81063",
//    },
//    {
//       id: 3,
//       icon: "fi fi-rr-envelope",
//       info: "danghoang87hl@gmail.com",
//    },
// ];

// const LocationArea = () => {
//    return (
//       <>
//          <section className="container pt-50 pb-85 bg-warning">
//             <div className="mb-50">
//                <div className="d-flex justify-content-start">
//                   <h2 className="rounded buff-text-color mb-0 pb-5">
//                      CONTACT
//                   </h2>
//                </div>
//             </div>
//             <div className="bg-primary d-flex align-items-center justify-content-between flex-wrap">
//                <div className="text-center mb-30 card-color mx-3 mt-20">
//                   <div className="location-icon mb-25 ">
//                      <i className="fa-solid fa-phone fa-2xs"></i>
//                   </div>
//                   <div className="d-flex flex-column location-content">
//                      <h5 className="location-title">
//                         Telefoonnummer:
//                         <a href="tell:+316 50 41 96 71"> +316 50 41 96 71</a>
//                      </h5>
//                      <h5 className="location-title">
//                         KVK nummer:
//                         <a href="tell:8329950"> 8329950</a>
//                      </h5>
//                   </div>
//                </div>

//                <div className="text-center mb-30 card-color mx-3">
//                   <div className="location-icon mb-25">
//                      <i className="fa-solid fa-envelope fa-2xs"></i>
//                   </div>
//                   <div className="location-content">
//                      <h5 className="location-title">
//                         <a href="mailto:danghoang87hl@gmail.com">
//                            test@gmail.com
//                         </a>
//                      </h5>
//                   </div>
//                </div>
//             </div>
//          </section>
//       </>
//    );
// };

// export default LocationArea;
