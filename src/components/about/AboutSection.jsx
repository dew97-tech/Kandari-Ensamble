import React from "react";
import Link from "next/link";
import comments_data from "@/src/data/comments-data";
import Image from "next/image";

const AboutSection = () => {
   return (
      <div className='postbox__area bone pt-50 pb-120 px-2'>
         <div className='container p-4 border-2 rounded-3'>
            <div className='postbox__wrapper pr-20'>
               <article className='postbox__item format-image transition-3 '>
                  <div className='mb-30 d-flex align-items-center justify-content-between text-center w-img'>
                     {/* <h1 className="buff-text-color">OVER</h1> */}
                  </div>
                  <div className='mb-40'>
                     <h3 className='buff-text-color'>
                        Hoe en waarom is Maison Ensemble ontstaan ?
                     </h3>
                     <div className='mt-10'>
                        <p className='buff-text-color'>
                           Mijn naam is Louisa Belguebli, oprichtster van Maison
                           Ensemble. Ik ben docente Frans en schoolpsycholoog en
                           heb gewerkt in het Nederlands en internationaal
                           onderwijs. Met veel plezier heb ik lesgegeven aan de
                           hand van verschillende Nederlands- en Engelstalige
                           methodes, waar ik veel van heb geleerd. Echter waren
                           er onderdelen waar ik in mijn lessen aandacht aan
                           wilde besteden, die weinig of niet aan bod kwamen in
                           de methodes. Dit waren onder andere leertechnieken,
                           spreekvaardigheid, aandacht voor de uitspraak en voor
                           de klank-tekenkoppeling. Ik begon zelf werkboekjes te
                           creëren voor mijn leerlingen en ben na een tijdje
                           mijn eigen lesmethode gaan ontwikkelen: Maison
                           Ensemble. Hierin heb ik alle elementen die mijns
                           inziens belangrijk zijn bij het leren van het Frans
                           in verwerkt.
                        </p>
                     </div>
                  </div>

                  <div className='mb-40'>
                     <h3 className='buff-text-color '>
                        Executieve functies (voor basisschoolleerlingen)
                     </h3>
                     <div className='mt-10'>
                        <p className='buff-text-color'>
                           Bij het leren van een nieuwe taal spelen je
                           executieve functies een belangrijke rol. Denk aan je
                           geheugen, je aandacht, je timemanagement.
                           Bewustwording van hoe een leerling zijn/haar
                           executieve functies inzet tijdens het leerproces én
                           het optimaliseren daarvan, zijn een belangrijk
                           onderdeel van Maison Ensemble. Leerlingen kijken
                           tijdens de lessen Frans informatieve video’s over hun
                           executieve functies en passen deze informatie toe
                           tijdens de opdrachten. Na elke les staat de leerling
                           stil bij hoe dit is gegaan en hoe de leerling
                           zijn/haar executieve functies ook buiten de les om
                           optimaal toe zou kunnen passen.
                        </p>
                     </div>
                  </div>
                  <div className='mb-40'>
                     <h3 className='buff-text-color'>Dyslexie </h3>
                     <div className='postbox_text'>
                        <p className='buff-text-color'>
                           Naast mijn werk als docent, vervul ik ook de rol van
                           schoolpsycholoog. In die hoedanigheid heb ik
                           uitgebreide ervaring met het begeleiden van
                           leerlingen met dyslexie. Ik ben goed bekend met de
                           uitdagingen die zij ervaren bij het leren van
                           (vreemde) talen. Zodoende heb ik mijn best gedaan om
                           Maison Ensemble zo dyslexie-vriendelijk te maken. De
                           methode bevat bijvoorbeeld kleurcodes in het
                           videomateriaal en een handige ‘Klanken Bibliotheek’.
                        </p>
                     </div>
                  </div>
                  <div className='mb-40'>
                     <h3 className='buff-text-color'>
                        Authentieke culturele context
                     </h3>
                     <div className='mt-10'>
                        <p className='buff-text-color'>
                           Tijdens mijn studie, het World Teachers Programma (de
                           internationale variant van de eerstegraads
                           lerarenopleiding Frans) werd veel aandacht besteed
                           aan het concept <b>CLIL</b>(Content and Language
                           Integrated Learning), een benadering waarin taal en
                           inhoud op zo’n manier worden samengebracht dat ze
                           elkaar versterken. Als je daar meer over wilt lezen
                           kan dat hier :{" "}
                           <Link
                              href={
                                 "https://www.nuffic.nl/nieuws/clil-in-de-klas-een-methodiek-voor-tweetalig-mbo"
                              }
                              className='text-primary text-decoration-underline fst-italic'
                              target='_blank'
                           >
                              CLIL article.
                           </Link>
                           <br />
                           Het heeft mij geïnspireerd om altijd op zoek te gaan
                           naar interessante inhoudelijke onderwerpen om talige
                           concepten over te brengen. Zo heb ik weleens
                           psychologielessen in het Frans gegeven! Dat was erg
                           leuk. Met Maison Ensemble heb ik dit gedaan door de
                           lessen plaats te laten vinden in het Franse stadje
                           Marans (en omgeving). Ik heb zo veel mogelijk
                           authentieke, Franse culturele context in de lessen
                           verweven zodat de leerling niet alleen de taal leert,
                           maar ook wordt ondergedompeld in de Franse cultuur.
                        </p>
                     </div>
                  </div>

                  <div>
                     <h3 className='buff-text-color'>Kwalificaties</h3>
                     <div className='mt-20 d-flex align-items-center flex-nowrap'>
                        <div className='mr-30'>
                           <Image
                              className='shadow-sm'
                              src='/assets/img/bg/instruc-in-05.jpg'
                              alt='Louisa_Profile_Picture'
                              style={{
                                 objectFit: "cover",
                                 width: "20rem",
                                 height: "20rem",
                                 cursor: "auto",
                                 borderRadius: "1rem",
                              }}
                              width={350}
                              height={350}
                           />
                        </div>
                        <div className='d-flex flex-column no-wrap'>
                           <h4 className='buff-text-color'>Louisa Belguebli</h4>
                           <ul>
                              <li className='fs-6 buff-text-color my-1'>
                                 MEd. World Teachers Programme (eerstegraads
                                 lesbevoegdheid), M.A.
                              </li>
                              <li className='fs-6 buff-text-color my-1'>
                                 Taalkunde, Msc. Psychologie aan de Universiteit
                                 Leiden, BAPD, SKJ-registratie.
                              </li>
                           </ul>
                        </div>
                     </div>
                  </div>
               </article>
            </div>
         </div>
      </div>
   );
};

export default AboutSection;
