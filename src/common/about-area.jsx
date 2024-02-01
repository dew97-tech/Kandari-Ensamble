import Link from "next/link";
import React from "react";
import Image from "next/image";
import imgUrl from "@/public/assets/img/bg/louisa.jpeg";
const about_info = {
   students: "235K",
   review: "4.7",
   pro_courses: "3.5K",
   title: "Louisa Belguebli",
   des: (
      <>
         Founder of Maison Ensemble. I am a French teacher and school psychologist, and I have worked in both Dutch and
         international education. I have taught with various Dutch and English language methods, from which I've gained
         valuable experience.
      </>
   ),
};

const { students, review, pro_courses, title, des } = about_info;

const about_list_data = [
   {
      name: "MSc. Psychology",
   },
   {
      name: "M.A. Linguistics,MEd",
   },
   {
      name: "After Finished Courses, Get Certificate",
   },
   {
      name: "World Teachers Programme (first-degree teaching qualification) from Leiden University, BAPD, SKJ registration",
   },
];
const AboutArea = ({ style_about }) => {
   return (
      <>
         <section className='tp-about-area p-5'>
            <div className='container'>
               <div className='row align-items-center'>
                  <div className='col-xxl-7 col-xl-7 col-lg-6 col-md-12 col-12'>
                     <div className='tp-about-class p-relative'>
                        {style_about ? (
                           <img src='/assets/img/bg/instructor-ab-02.jpg' alt='about-img' />
                        ) : (
                           // <img src='/assets/img/bg/instruc-ab-02.jpg' alt='about-img' />
                           <Image
                              src={imgUrl}
                              alt='about-img'
                              width={640}
                              height={427}
                              quality={100}
                              placeholder='blur'
                           />
                        )}
                     </div>
                  </div>
                  <div className='col-xxl-5 col-xl-5 col-lg-6 col-md-12 col-12'>
                     <div className='tp-about-class-content mb-50 ml-55'>
                        <div className='section-title mb-35'>
                           {/* <span className='tp-bline-stitle mb-15'>Qualifications</span> */}
                           <h2 className='tp-section-title mb-25'>{title}</h2>
                           <p>{des}</p>
                        </div>
                        <div className='tp-about-list mb-65'>
                           <ul>
                              {about_list_data.map((item, i) => (
                                 <li key={i}>
                                    <i className='fa-light fa-check'></i>
                                    {item.name}
                                 </li>
                              ))}
                           </ul>
                        </div>
                        <div className='tp-about-btn-3'>
                           <Link href='/about' className='tp-btn'>
                              Read more
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default AboutArea;
