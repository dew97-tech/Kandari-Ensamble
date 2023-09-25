import React from 'react';
import { MdOutlineCheck, MdClose } from 'react-icons/md';

const GameResult = ({ index, result, answers }) => {
	result === 'correct' ? 'Correct' : 'Wrong';
	const Icon = result === 'correct' ? MdOutlineCheck : MdClose;

	return (
		<div className="d-flex align-items-center justify-content-center">
			<li
				className={`px-4 ${
					result === 'correct' ? 'light-green' : 'bittersweet'
				} ml-10 py-2 border border-${
					result === 'correct' ? 'success' : 'danger'
				} rounded-2 h5 my-1 mx-1 shadow-sm`}
			>
				<Icon className="mx-1 mt-0 mb-1" />
				{answers}
			</li>
		</div>
	);
};

export default GameResult;
