import React from 'react';
import StoreToSoundLibrary from './store-to-sound-library';
import { MdOutlineCheck, MdClose } from 'react-icons/md';

const ResultCheckBox = ({ result, frenchTranslation, uniqueId }) => {
	// Icon is a component that is either the check or close icon
	const Icon = result === 'correct' ? MdOutlineCheck : MdClose;
	return (
		<div className="row">
			<div className="d-flex align-items-center justify-content-around">
				<span
					className={`${
						result === 'correct' ? 'light-green' : 'bittersweet'
					} ml-10 py-2 px-3 border border-${
						result === 'correct' ? 'success' : 'danger'
					} rounded-2 h5 my-1 mx-1 shadow-sm`}
				>
					<Icon className="mx-1 mt-0 mb-1" />
					<span>{frenchTranslation}</span>
				</span>

				{/* Handles checkboxes with uniqueId */}
				<StoreToSoundLibrary uniqueId={uniqueId} />
			</div>
		</div>
	);
};

export default ResultCheckBox;
