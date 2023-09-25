import React, { memo } from 'react';

const DutchSentence = ({ dutchSentence }) => {
	console.log('Dutch Sentence Fired');
	return (
		<>
			<div className="mx-2 d-flex justify-content-center flex-nowrap">
				<h2 className="buff-text-color mb-0">{dutchSentence}</h2>
			</div>
		</>
	);
};

export default memo(DutchSentence);
