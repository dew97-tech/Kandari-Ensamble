import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player";
import { motion } from "framer-motion";
import { FaVolumeMute, FaVolumeUp } from "react-icons/fa";
const VideoArea = ({ style_2 }) => {
   const [playing, setPlaying] = useState(false);
   const [videoSrc, setVideoSrc] = useState();
   const [isMuted, setIsMuted] = useState(true);
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
         <section className={`bone`}>
            {/* Container */}
            <div className='container'>
               {/* Row */}
               <div className='row homePageSection'>
                  <motion.div
                     initial={{ opacity: 0 }}
                     animate={{ opacity: 1 }}
                     exit={{ opacity: 0 }}
                     transition={{ duration: 0.5 }}
                  >
                     {/* <h1 className='text-center buff-text-color fs-1'>Welcome to Maison Ensemble</h1> */}
                     <div className='text-center'>
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
         </section>
      </>
   );
};

export default VideoArea;
