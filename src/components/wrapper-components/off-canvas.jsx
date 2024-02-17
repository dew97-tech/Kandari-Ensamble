import React, { useState, useEffect } from "react";
import useLessonProgress from "@/hooks/useLessonProgress";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useRouter } from "next/router";
import Button from "react-bootstrap/Button";
import { Offcanvas } from "react-bootstrap";
import Link from "next/link";
import lesson_data from "@/src/layout/headers/lesson-data";
const OffCanvas = () => {
   const router = useRouter();
   const { isLessonFinished } = useLessonProgress();
   const cardStyle = {
      backgroundColor: "wheatsmoke",
      borderRadius: "1rem",
      padding: "0.2rem",
      zIndex: "9999",
      transition: "all 0.5s",
   };

   const [show, setShow] = useState(false);
   const [resetSignal, setResetSignal] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   const { slug } = router.query;
   // console.log("slug", slug);
   const resetProgress = () => {
      // Add logic to reset exercise progress
      const { getItem, setItem } = useLocalStorage("lessons_exercises");
      const exercises = getItem();

      if (exercises) {
         const resetExercises = exercises.map((exercise) => ({
            ...exercise,
            isFinished: false,
         }));
         setItem(resetExercises);
         setResetSignal((prev) => !prev);
      }
   };
   useEffect(() => {
      // You can add additional logic here to handle side effects when the progress changes
   }, [resetSignal]);
   return (
      <>
         <Button className='buff border border-secondary text-dark px-3 py-2 mb-30' onClick={handleShow}>
            Oefeningen
         </Button>
         <div>
            <Offcanvas show={show} onHide={handleClose} backdrop={true} scroll={true} style={cardStyle}>
               <Offcanvas.Header className='h5' closeButton>
                  <Offcanvas.Title className='buff-text-color'>LEÇON 1 : BONJOUR !</Offcanvas.Title>
               </Offcanvas.Header>
               <Offcanvas.Body>
                  {/* <div className='text-end mb-3'>
                     <Button variant='danger' onClick={resetProgress}>
                        <i className='fa-light fa-rotate-right'></i> <span>Reset Progress</span>
                     </Button>
                  </div> */}
                  {/* Map through the sub_menus array and create links */}
                  <ul className='offcanvas-links'>
                     {lesson_data[0].sub_menus.map((menu, index) => {
                        const linkParts = menu.link.split("/exercise-lessons/");
                        const linkPartsVideo = menu.link.split("/video-lessons/"); // Split for "/video-lessons/"
                        const linkSlug = linkParts[1] || linkPartsVideo[1]; // Use the split value based on logic

                        return (
                           <Link key={index} href={menu.link}>
                              <li
                                 className={`btn btn-md my-3 ${
                                    !isLessonFinished || linkSlug === slug ? "buff" : "bone"
                                 } my-0 px-2 py-2 d-block d-sm-block border border-1 border-secondary shadow-sm ${
                                    isLessonFinished(menu.title) ? "light-green" : "buff-text-color"
                                 }`}
                              >
                                 <span className='h5 buff-text-color'>{menu.title}</span>
                              </li>
                           </Link>
                        );
                     })}
                  </ul>
               </Offcanvas.Body>
            </Offcanvas>
         </div>
      </>
   );
};

export default OffCanvas;
