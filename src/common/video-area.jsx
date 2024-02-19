import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
const VideoArea = ({ style_2 }) => {
   const [playing, setPlaying] = useState(false);
   const [videoSrc, setVideoSrc] = useState();
   const [isMuted, setIsMuted] = useState(true);
   let factor = 0.3; // whatever number
   useEffect(() => {
      const fetchVideoSrc = async () => {
         const res = await fetch("/api/video-src");
         const data = await res.json();
         setVideoSrc(data?.src);
         setPlaying(true);
      };

      fetchVideoSrc();
   }, []);
   const toggleMute = () => {
      setIsMuted(!isMuted); // Toggle mute state
   };
   return (
      <>
         <section className='bone'>
            <div className='d-block mt-10 mb-10 p-2'>
               {/* Container */}
               <div className='container'>
                  {/* Row */}
                  <div className='row homePageSection mb-55'>
                     <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                     >
                        {/* <h1 className='text-center buff-text-color fs-1'>Welcome to Maison Ensemble</h1> */}
                        <div className='d-flex justify-content-center align-items-center'>
                           {!playing ? (
                              <motion.img
                                 src='/assets/img/banner/maison.png'
                                 alt='video-bg'
                                 animate={{ opacity: 1 }}
                                 initial={{ opacity: 0 }}
                                 exit={{ opacity: 0 }}
                                 transition={{ duration: 0.5 }}
                              />
                           ) : (
                              <motion.div
                                 initial={{ opacity: 0, translateX: "100%" }}
                                 animate={{ opacity: 1, translateX: "0%" }}
                                 exit={{ opacity: 0, translateX: "100%" }}
                                 transition={{ duration: 0.5 }}
                              >
                                 <ReactPlayer
                                    style={{ width: `${factor * 16}vw`, height: `${factor * 9}vw` }}
                                    url={videoSrc}
                                    className='react-player'
                                    width='100%' // 100%
                                    height='100%' // 100%
                                    playing={playing}
                                    loop={true}
                                    muted={isMuted}
                                 />
                                 <button onClick={toggleMute} className={`mute-button ${isMuted ? "is-muted" : ""}`}>
                                    {isMuted ? <FaVolumeMute className='fa-2xl' /> : <FaVolumeUp className='fa-2xl' />}
                                 </button>
                              </motion.div>
                           )}
                        </div>
                     </motion.div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
};

export default VideoArea;
