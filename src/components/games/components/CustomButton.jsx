import { Button } from 'react-bootstrap';
import Image from 'next/image';
// CustomButton.js

function CustomButton({
	onClick,
	disabled,
	text,
	placeHolder,
	iconText,
	isImageAvailable,
	colorString,
	fontSize,
	borderColor,
	margin,
	onRight,
	width,
	height,
}) {
	return (
		<div className={`memory-game-color ${margin ? margin : 'mx-2'} py-2`}>
			<Button
				className={`px-4 py-2 rounded ${
					disabled
						? 'btn-secondary' // If disabled, don't apply any styling
						: colorString
						? `${colorString} border border-1 border-${borderColor}`
						: 'light-green border border-1 border-success'
				} shadow-sm`}
				onClick={onClick}
				disabled={disabled}
			>
				{!onRight ? (
					<>
						{isImageAvailable ? (
							// <img
							// 	src={iconText}
							// 	alt={placeHolder}
							// 	width={width ? width : '20'}
							// 	height={height ? height : '20'}
							// 	className="mr-5 mb-1 text-black"
							// />
							<Image
								src={iconText}
								alt={placeHolder}
								width={width ? width : 20}
								height={height ? height : 20}
								className="mr-5 mb-1 text-black"
							/>
						) : null}
						<span
							className={`buff-text-color ${fontSize ? fontSize : 'h5'}`}
							style={{ fontSize: '18px' }}
						>
							{text}
						</span>
					</>
				) : (
					<>
						<span
							className={`buff-text-color ${fontSize ? fontSize : 'h5'}`}
							style={{ fontSize: '18px' }}
						>
							{text}
						</span>
						{isImageAvailable ? (
							<Image
								src={iconText}
								alt={placeHolder}
								width={width ? width : 20}
								height={height ? height : 20}
								className="mr-5 mb-1 text-black"
							/>
						) : null}
					</>
				)}
			</Button>
		</div>
	);
}

export default CustomButton;
