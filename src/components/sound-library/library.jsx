import React, { useState, useContext } from "react";
import Accordion from "react-bootstrap/Accordion";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import AudioPlayer from "../games/memory-games/audio-player";
import { SoundLibraryContext } from "@/src/context/SoundLibraryContext";
import {
   MdVolumeUp,
   MdOutlineMic,
   MdExpandMore,
   MdExpandLess,
} from "react-icons/md";
import VoiceRecorder from "../games/components/VoiceRecorder";
function CustomToggle({ children, eventKey }) {
   const { activeEventKey } = useContext(AccordionContext);
   const decoratedOnClick = useAccordionButton(eventKey);
   const isCurrentEventKey = activeEventKey === eventKey;
   return (
      <button
         type="button"
         style={{ backgroundColor: "rgba(245, 245, 245)" }}
         onClick={decoratedOnClick}
      >
         <Card.Header className="d-flex justify-content-between py-3 border border-1 border-secondary rounded-2 shadow-sm">
            {children}
            {isCurrentEventKey ? (
               <MdExpandLess className="h3" />
            ) : (
               <MdExpandMore className="h3" />
            )}
         </Card.Header>
      </button>
   );
}
const Library = ({ selectedGameLevel }) => {
   const [show, setShow] = useState(false);
   const [isAudioPlaying, setIsAudioPlaying] = useState(false);
   const [isMicAvailable, setIsMicAvailable] = useState(false);
   const SpeakerIcon = MdVolumeUp;
   // const MicIcon = MdOutlineMic;
   const categoriesData = {
      categories: {
         1: {
            un: [
               {
                  dutch: "een jongen",
                  french: "un garçon",
               },
            ],
            ç: [
               {
                  dutch: "het gaat",
                  french: "ça va",
               },
            ],
         },
         2: {
            g: [
               {
                  dutch: "een jongen",
                  french: "un garçon",
               },
            ],
            on: [
               {
                  dutch: "een jongen",
                  french: "un garçon",
               },
            ],
         },
         3: {
            g: [
               {
                  dutch: "goed",
                  french: "bien",
               },
            ],
         },
         // ... other game levels ...
         // Add game levels and corresponding categories and words here
         // Example for game level 4:
         4: {
            ent: [
               {
                  dutch: "hoe",
                  french: "comment",
               },
            ],
            j: [
               {
                  dutch: "ik heet",
                  french: "je m'appelle",
               },
            ],
            "c - s": [
               {
                  dutch: "hier",
                  french: "ici",
               },
               {
                  dutch: "wonen",
                  french: "habiter",
               },
            ],
         },
         // ... continue for other game levels ...
      },
   };
   const styles = {
      groupFontSize: "24px",
      tableFontSize: "18px",
   };
   const micHandler = () => {
      setIsMicAvailable(true);
   };
   return (
      <>
         {isMicAvailable && (
            <Alert
               variant="danger"
               onClose={() => setIsMicAvailable(false)}
               dismissible
            >
               <Alert.Heading className="buff-text-color">
                  Microphone isn't found or accessable 🎙️
               </Alert.Heading>
            </Alert>
         )}
         <Accordion eventKey="0">
            {Object.keys(categoriesData.categories[selectedGameLevel]).map(
               (category, index) => (
                  <Card key={index} className="text-center rounded-3 mb-10">
                     <CustomToggle eventKey={index.toString()}>
                        <span
                           className="h4 buff-text-color"
                           style={{ fontSize: styles.groupFontSize }}
                        >
                           {category}
                        </span>
                     </CustomToggle>
                     <Accordion.Collapse eventKey={index.toString()}>
                        <Card.Body>
                           <table className="table table-bordered text-center ">
                              <thead>
                                 <tr>
                                    <th
                                       scope="col"
                                       style={{
                                          fontSize: styles.tableFontSize,
                                       }}
                                    >
                                       Dutch
                                    </th>
                                    <th
                                       scope="col"
                                       style={{
                                          fontSize: styles.tableFontSize,
                                       }}
                                    >
                                       French
                                    </th>
                                    <th
                                       scope="col"
                                       style={{
                                          fontSize: styles.tableFontSize,
                                       }}
                                    >
                                       Actions
                                    </th>
                                 </tr>
                              </thead>
                              <tbody>
                                 {categoriesData.categories[selectedGameLevel][
                                    category
                                 ].map((wordInfo, wordIndex) => (
                                    <tr key={wordIndex}>
                                       <td
                                          className="h5 buff-text-color py-3"
                                          style={{
                                             fontSize: styles.tableFontSize,
                                          }}
                                       >
                                          {wordInfo.dutch}
                                       </td>
                                       <td
                                          className="h5 buff-text-color py-3"
                                          style={{
                                             fontSize: styles.tableFontSize,
                                          }}
                                       >
                                          {wordInfo.french}
                                       </td>
                                       <td className="d-flex justify-content-center">
                                          <AudioPlayer
                                             audioUrl={
                                                "/assets/audio/sample_1.mp3"
                                             }
                                             context={SoundLibraryContext}
                                             setIsAudioPlaying={
                                                setIsAudioPlaying
                                             }
                                          />
                                          <VoiceRecorder
                                             micHandler={micHandler}
                                             isAudioPlaying={isAudioPlaying}
                                          />
                                       </td>
                                    </tr>
                                 ))}
                              </tbody>
                           </table>
                        </Card.Body>
                     </Accordion.Collapse>
                  </Card>
               )
            )}
         </Accordion>
      </>
   );
};

export default Library;
