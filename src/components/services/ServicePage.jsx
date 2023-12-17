import React from "react";
import Image from "next/image";
import Calendly from "../calendly";
const ServicePage = () => {
   const imgStyle = {
      objectFit: "cover",
      width: "100%",
      height: "100%",
      cursor: "auto",
      borderRadius: "1rem",
   };
   const paraStyle = {
      fontSize: "1.1rem",
      textAlign: "justify",
      textJustify: "inter-word",
      wordBreak: "break-word",
      display: "inline-block",
      maxWidth: "100%",
   };
   return (
      <div className='postbox__area bone pt-50 pb-120 px-2'>
         <div className='container p-4 border-2 rounded-3'>
            <div className='postbox__wrapper pr-20'>
               <article className='postbox__item format-image transition-3'>
                  <div className='mb-20 d-flex align-items-center justify-content-between text-center w-img'>
                     <h1 className='buff-text-color'>DIENSTEN</h1>
                  </div>
                  <div className='mb-50'>
                     <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-md-center'>
                        <div className='mr-20' style={{ flex: "0 0 70%" }}>
                           <h3 className='buff-text-color service-p-text'>Kinderen (t/m 12 jaar) - particulieren</h3>
                           <div className='mt-10'>
                              <p className='buff-text-color service-p-text' style={paraStyle}>
                                 Voor kinderen begint met Maison Ensemble de ontdekkingsreis van het Frans. Terwijl ze
                                 de taal leren, maken ze kennis met diverse facetten van de Franse cultuur door een
                                 denkbeeldige reis naar het charmante stadje Marans te maken. Naast het aanleren van de
                                 taal, ontdekken ze ook hoe ze hun executieve functies kunnen inzetten en versterken.
                                 Alles bij elkaar vormt dit een mooie voorbereiding op de middelbare schooltijd en een
                                 mogelijkheid voor persoonlijke groei in de bredere zin.
                              </p>
                           </div>
                        </div>
                        <div className='ml-10 mobile-margin' style={{ flex: "0 0 30%" }}>
                           <Image
                              className='course-avata card-color shadow-sm'
                              src='/assets/img/bg/instruc-in-08.jpg'
                              alt='Louisa_Profile_Picture'
                              style={imgStyle}
                              width={800}
                              height={800}
                           />
                        </div>
                     </div>
                  </div>

                  <div className='mb-50'>
                     <div className='d-flex flex-column-reverse flex-md-row justify-content-md-between align-items-md-center'>
                        <div className='mr-10 mobile-margin' style={{ flex: "0 0 30%" }}>
                           <Image
                              className='course-avata card-color shadow-sm'
                              src='/assets/img/bg/instruc-in-02.jpg'
                              alt='Louisa_Profile_Picture'
                              style={imgStyle}
                              width={800}
                              height={800}
                           />
                        </div>
                        <div className='ml-10' style={{ flex: "0 0 70%" }}>
                           <h3 className='buff-text-color service-p-text'>
                              Adolescenten (13 t/m 17 jaar) - particulieren
                           </h3>
                           <div className='mt-10'>
                              <p className='buff-text-color service-p-text' style={paraStyle}>
                                 Met Maison Ensemble kun je als middelbare scholier je mondelinge spreekvaardigheid naar
                                 een hoger niveau tillen. Door stapsgewijs (hardop) te oefenen met diverse dialogen uit
                                 alledaagse situaties, krijg je meer zelfvertrouwen in je spreekvaardigheid. Zo voegt de
                                 methode een waardevolle dimensie toe aan bestaande leermethodes. Naast toegang tot de
                                 digitale omgeving, heb je de mogelijkheid om deel te nemen aan de online community en
                                 aan videolessen met andere jongeren om je leerproces te versterken en al je vragen
                                 kwijt te kunnen.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className='mb-50'>
                     <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-md-center'>
                        <div className='mr-10' style={{ flex: "0 0 70%" }}>
                           <h3 className='buff-text-color service-p-text'>Volwassenen - particulieren</h3>
                           <div className='mt-10'>
                              <p className='buff-text-color service-p-text' style={paraStyle}>
                                 Is het alweer een tijd geleden dat je Frans hebt gehad op de middelbare school en is
                                 deze kennis verwaterd? Bij Maison Ensemble ben je op het juiste adres om (weer) je
                                 eerste stappen te zetten in de Franse taal. Naast toegang tot de digitale omgeving, heb
                                 je de mogelijkheid om deel te nemen aan de online community en aan videolessen om je
                                 leerproces te versterken en al je vragen kwijt te kunnen.
                              </p>
                           </div>
                        </div>
                        <div className='ml-10 mobile-margin' style={{ flex: "0 0 30%" }}>
                           <Image
                              className='course-avata card-color shadow-sm'
                              src='/assets/img/bg/instruc-in-03.jpg'
                              alt='Louisa_Profile_Picture'
                              style={imgStyle}
                              width={800}
                              height={800}
                           />
                        </div>
                     </div>
                  </div>
                  <div className='mb-50'>
                     <div className='d-flex flex-column-reverse flex-md-row justify-content-md-between align-items-md-center'>
                        <div className='mr-10 mobile-margin' style={{ flex: "0 0 30%" }}>
                           <Image
                              className='course-avata card-color shadow-sm'
                              src='/assets/img/bg/instruc-in-06.jpg'
                              alt='Louisa_Profile_Picture'
                              style={imgStyle}
                              width={800}
                              height={800}
                           />
                        </div>
                        <div className='ml-10' style={{ flex: "0 0 70%" }}>
                           <h3 className='buff-text-color service-p-text'>Basisscholen</h3>
                           <div className='mt-10'>
                              <p className='buff-text-color service-p-text' style={paraStyle}>
                                 Voor kinderen begint met Maison Ensemble de ontdekkingsreis van het Frans. Terwijl ze
                                 de taal leren, maken ze kennis met diverse facetten van de Franse cultuur door een
                                 denkbeeldige reis naar het charmante stadje Marans te maken. Naast het aanleren van de
                                 taal, ontdekken ze ook hoe ze hun executieve functies kunnen inzetten en versterken.
                                 Alles bij elkaar vormt dit een mooie voorbereiding op de middelbare schooltijd en een
                                 mogelijkheid voor persoonlijke groei in de bredere zin. Neem gerust contact op voor
                                 meer informatie over de beschikbare licenties.
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>
                  <div className='mb-50'>
                     <div className='d-flex flex-column flex-md-row justify-content-md-between align-items-md-center'>
                        <div className='mr-10' style={{ flex: "0 0 70%" }}>
                           <h3 className='buff-text-color service-p-text'>Middelbare scholen</h3>
                           <div className='mt-10'>
                              <p className='buff-text-color service-p-text' style={paraStyle}>
                                 Met Maison Ensemble kunnen middelbare scholieren hun mondelinge spreekvaardigheid naar
                                 een hoger niveau tillen. Door stapsgewijs (hardop) te oefenen met diverse dialogen uit
                                 alledaagse situaties, krijgen leerlingen meer zelfvertrouwen in hun spreekvaardigheid.
                                 Zo voegt de methode een waardevolle dimensie toe aan bestaande leermethodes. Neem
                                 gerust contact op voor meer informatie over de beschikbare licenties.
                              </p>
                           </div>
                        </div>
                        <div className='ml-10 mobile-margin' style={{ flex: "0 0 30%" }}>
                           <Image
                              className='course-avata card-color shadow-sm'
                              src='/assets/img/bg/instruc-in-04.jpg'
                              alt='Louisa_Profile_Picture'
                              style={imgStyle}
                              width={500}
                              height={250}
                           />
                        </div>
                     </div>
                  </div>
               </article>
               {/* Add Calendly Widget */}
               <Calendly />
            </div>
         </div>
      </div>
   );
};

export default ServicePage;
