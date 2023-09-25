import React, { useContext } from 'react';
import { SoundLibraryContext } from '@/src/context/SoundLibraryContext';

const StoreToSoundLibrary = ({ uniqueId }) => {
	const { checkedItems, setCheckedItems } = useContext(SoundLibraryContext);
	// isChecked is a boolean that checks if the checkbox is checked
	const isChecked = checkedItems?.includes(uniqueId);
	// toggleCheckbox is a function that toggles the checkbox
	const toggleCheckbox = () => {
		if (isChecked) {
			setCheckedItems(checkedItems.filter((item) => item !== uniqueId));
		} else {
			setCheckedItems([...checkedItems, uniqueId]);
		}
	};

	return (
		<div className="form-check mt-2 mb-0 mx-4 py-0">
			<input
				className="h4 form-check-input custom-checkbox"
				type="checkbox"
				value=""
				id={uniqueId}
				checked={isChecked}
				onChange={toggleCheckbox}
			/>
		</div>
	);
};

export default StoreToSoundLibrary;
