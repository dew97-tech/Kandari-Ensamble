import { useState, useContext, useEffect } from 'react';
import 'react-tooltip/dist/react-tooltip.css';
import { Tooltip } from 'react-tooltip';

function WordBox({ word, index, context }) {
	const { addUserWord, setWrongOrder } = useContext(context);
	const [tooltipId, setTooltipId] = useState(`tooltip-${index}`);

	const handleRemoveFromOption = (word, optionIndex) => {
		setWrongOrder((prevWrongOrder) => {
			return prevWrongOrder.filter((_, index) => index !== optionIndex);
		});
	};
	const handleAddToAnswer = (word, optionIndex) => {
		addUserWord(word);
		console.log('The Clicked Option Index is', optionIndex);
		handleRemoveFromOption(word, optionIndex);
	};

	useEffect(() => {
		setTooltipId(`tooltip-${index}`);
	}, [index]);

	return (
		<div key={index} className="d-flex justify-content-center align-items-center">
			<div
				className="btn buff d-flex justify-content-start align-items-center flex-wrap card-color py-2 px-4 mx-1 text-center border border-secondary border-3 rounded buff-text-color my-1"
				onClick={() => handleAddToAnswer(word, index)}
				data-tooltip-id={tooltipId}
			>
				<span className="buff-text-color h3 mb-0 text-center">{word}</span>

				{/* <div className="tp-cat-content d-flex justify-content-center align-items-center flex-wrap"></div> */}
				<Tooltip
					className="py-2 px-3"
					id={tooltipId}
					variant="dark"
					style={{ fontSize: '1rem' }}
					content={word}
					place="bottom"
				/>
			</div>
		</div>
	);
}

export default WordBox;
// className="btn buff d-flex justify-content-center align-items-center flex-wrap card-color mb-10 px-2 py-2 rounded shadow-sm border border-secondary border-1"