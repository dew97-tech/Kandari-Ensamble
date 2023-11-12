import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { VisualMemoryGameContext } from "@/src/context/VisualContext";

const GameCard = ({ index, img, imgText, allImagesLoaded }) => {
   const { handleCardClick, glowingCards, isMatch, selectedCards, isGlowing } = useContext(VisualMemoryGameContext);

   const imageContainerSize = {
      height: "150px",
      width: "640px",
      objectFit: "cover",
      borderRadius: "10px",
   };
   const [isClicked, setIsClicked] = useState(false);

   useEffect(() => {
      let timer;
      if (isClicked) {
         timer = setTimeout(() => setIsClicked(false), 300);
      }
      return () => clearTimeout(timer);
   }, [isClicked]);

   // Styling
   const cardClasses = `btn shadow-sm my-1 d-flex flex-column justify-content-center align-items-center
    ${isGlowing && selectedCards.includes(index) && allImagesLoaded ? "border border-4 border-primary rounded-4" : ""}
    ${isClicked ? "border border-4 border-primary rounded-4" : ""}
    ${isMatch && glowingCards.includes(index) ? "border border-4 border-success rounded-4" : ""}`;

   const handleClick = () => {
      if (!isGlowing) {
         setIsClicked(true);
         handleCardClick(index);
      }
   };

   return (
      <div key={index} className={cardClasses} onClick={handleClick}>
         <Image src={img} width={640} height={427} style={imageContainerSize} className='card-img-top' alt={imgText} />
         <span className='text-secondary mt-5'>{imgText}</span>
      </div>
   );
};

export default GameCard;
