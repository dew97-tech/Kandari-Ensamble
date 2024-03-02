import React, { useContext, useState, useEffect } from "react";
import GameTitle from "../components/game-title";
import CustomButton from "../components/CustomButton";
import Lifeline from "../components/lifeline";
import Confetti from "react-confetti";
import { VisualMemoryGameContext } from "@/src/context/VisualContext";
import GameCard from "./game-card";
import NavLinks from "../../wrapper-components/navlinks";
const Game = ({ exerciseTitle }) => {
   const [allImagesLoaded, setAllImagesLoaded] = useState(false);

   const { isGameStarted, handleGameStart, isLoading, gameData, level, isGameOver, isGameFinished, returnAchievement } =
      useContext(VisualMemoryGameContext);

   useEffect(() => {
      const loadImages = async () => {
         try {
            await Promise.all(
               gameData?.map(
                  (card) =>
                     new Promise((resolve, reject) => {
                        const img = new Image();
                        img.src = card.img;
                        img.onload = resolve;
                        img.onerror = reject;
                     })
               )
            );
            setAllImagesLoaded(true);
         } catch (error) {
            console.error("Some images failed to load", error);
         }
      };

      loadImages();
   }, []);
   return (
      <>
         <section className='course-area pb-200 bone'>
            <div className='container'>
               <GameTitle title={exerciseTitle} />
               {/* <span>{gameData.length}</span> */}
               {isGameStarted ? (
                  <>
                     {!isGameFinished ? (
                        <>
                           {!isLoading && !isGameOver ? (
                              <>
                                 <div className='d-flex justify-content-evenly align-items-center'>
                                    <h4 className='px-2 py-2 border border-warning border-2 rounded shadow-sm buff-text-color buff'>
                                       Level: {level - 2}
                                    </h4>
                                    <h4 className='px-2 py-2 border border-warning border-2 rounded shadow-sm buff-text-color buff'>
                                       {/* Mistake : {renderHearts} */}
                                       <Lifeline context={VisualMemoryGameContext} />
                                    </h4>
                                 </div>
                                 <div className='container d-flex align-items-center justify-content-center flex-wrap'>
                                    <div className='parent px-3 py-2 rounded-3 bone gap-2 card-color border border-2 border-secondary'>
                                       {gameData.map((card, index) => (
                                          <GameCard
                                             key={index}
                                             index={index}
                                             img={card.img}
                                             imgText={card.img_data}
                                             allImagesLoaded={allImagesLoaded}
                                          />
                                       ))}
                                    </div>
                                 </div>
                              </>
                           ) : (
                              <section className='tp-category-area bone bg-bottom grey-bg pt-50 pb-50 text-center'>
                                 <div className='section-title mb-30 memory-game-color'>
                                    <h3 className='buff-text-color display-4 mb-20'>Game Over ! Keep Practicing 💪</h3>
                                    <h3 className='text-center buff-text-color display-6 mb-20'>
                                       Jouw score : {returnAchievement()}
                                    </h3>
                                 </div>
                                 <NavLinks />
                              </section>
                           )}
                        </>
                     ) : (
                        <>
                           <Confetti duration={3000} recycle={false} numberOfPieces={1000} />
                           <section className='tp-category-area bone bg-bottom grey-bg pt-50 pb-50 text-center'>
                              <div className='section-title mb-30 memory-game-color'>
                                 <h3 className='buff-text-color display-4 mb-20'>Congratulations ! You are a Pro 🧠</h3>
                                 <h3 className='text-center buff-text-color display-6 mb-20'>
                                    Jouw score : {returnAchievement()}
                                 </h3>
                              </div>
                              <NavLinks />
                           </section>
                        </>
                     )}
                  </>
               ) : (
                  <ul className='memory-game-color d-flex align-items-center justify-content-center'>
                     <CustomButton
                        onClick={handleGameStart}
                        text={"Start"}
                        placeHolder={"StartGame-Icon"}
                        colorString={"light-green py-3"}
                        borderColor={"success"}
                        fontSize={"h3"}
                     />
                  </ul>
               )}
            </div>
         </section>
      </>
   );
};

export default Game;
{
   /* <div
    className={`btn border-bottom bg-white shadow-sm mb-3 ${
        selectedCards.includes(index) ? 'border border-3 border-primary' : ''
    } ${isMatch && glowingCards.includes(index) ? 'border border-4 border-success' : ''}`}
    onClick={() => handleCardClick(index)}>
    <img src={card.img} className="card-img-top" alt="Card" />
</div>; */
}
