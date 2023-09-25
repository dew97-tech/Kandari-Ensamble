import React, { useContext } from 'react';
import { RolePlayContext } from '@/src/context/RolePlayContext';

const Options = ({ option }) => {
	const { handleOptionSelect, selectedOptionID } = useContext(RolePlayContext);

	return (
		<div className="mx-2 my-2 row">
			<button
				key={option.id}
				className={`px-4 py-2 rounded ${
					selectedOptionID === option.id ? 'buff border border-1 border-warning' : 'card-color'
				} shadow-sm border border-3 border-secondary buff`}
				onClick={() => handleOptionSelect(option.id)}
			>
				<span className="buff-text-color h3 px-2 mb-0" style={{ fontSize: '24px' }}>
					{option.text}
				</span>
			</button>
		</div>
	);
};

export default Options;
