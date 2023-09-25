import React, { useContext, useEffect, useState } from 'react';
import { VisualMemoryGameContext } from '@/src/context/VisualContext';

const GameCard = ({ index, img }) => {
	const { handleCardClick, glowingCards, isMatch, selectedCards, isGlowing } =
		useContext(VisualMemoryGameContext);

	const [isClicked, setIsClicked] = useState(false);

	useEffect(() => {
		let timer;
		if (isClicked) {
			timer = setTimeout(() => setIsClicked(false), 300);
		}
		return () => clearTimeout(timer);
	}, [isClicked]);

	// Styling
	const cardClasses = `btn shadow-sm my-2 ratio ratio-1x1
    ${isGlowing && selectedCards.includes(index) ? 'border border-5 border-primary rounded-4' : ''}
    ${isClicked ? 'border border-5 border-primary rounded-4' : ''}
    ${isMatch && glowingCards.includes(index) ? 'border border-5 border-success rounded-4' : ''}`;

	const handleClick = () => {
		if (!isGlowing) {
			setIsClicked(true);
			handleCardClick(index);
		}
	};

	return (
		<div key={index} className={cardClasses} onClick={handleClick}>
			{/* <Image src={img} width={500} height={500} className="rounded-2" alt="game-card" /> */}
			{/* <span className="d-flex justify-content-center align-items-end">{index}</span> */}
			<button className='btn btn-sm btn-light h4 shadow-sm'>{index}</button>
		</div>
	);
};

export default GameCard;
