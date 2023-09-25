import React, { useContext } from 'react';

function AnswerBox({ context}) {
	const { userOrder, handleTryAgain, setUserOrder, setWrongOrder, dutchSentence } =
		useContext(context);
	const handleAddToOption = (word, WordIndex) => {
		setWrongOrder((prevWrongOrder) => {
			return [...prevWrongOrder, word];
		});
	};
	const handleRemoveFromAnswer = (word, WordIndex) => {
		console.log('The Clicked Words Index is', WordIndex);
		setUserOrder((prevUserOrder) => {
			return prevUserOrder.filter((_, index) => index !== WordIndex);
		});
		handleAddToOption(word, WordIndex);
	};
	return (
		<>
			<div className="d-flex">
				{userOrder.map((word, index) => (
					<div key={index} onClick={() => handleRemoveFromAnswer(word, index)}>
						<div className="col-12 mx-2">
							<h3 className="btn py-2 px-4 text-start border border-secondary border-3 rounded buff-text-color buff h3 my-0">
								{word}
							</h3>
						</div>
					</div>
				))}
			</div>
		</>
	);
}

export default AnswerBox;

// const { userOrder } = useContext(RightOrderContext);
// return (
//     <>
//         <div
//             className="container"
//             style={{
//                 backgroundColor: 'rgba(225, 254, 231, 0.55)',
//                 borderRadius: '10px',
//                 padding: '1rem',
//                 marginBottom: '1rem',
//             }}>
//             <h3 className="tp-title-small text-sm-start text-md-start">
//                 Your Answer :
//             </h3>
//             <hr className="mb-10" />
//             <div className="d-flex align-items-center justify-content-start flex-wrap">
//                 {userOrder.map((word, index) => (
//                     <div key={index} className="col-lg-4 col-md-6 mb-3">
//                         <div className="col-11 tpcourse__price-list">
//                             <div className="tp-cat-item c-color-lime">
//                                 <div className="tp-cat-content d-flex justify-content-center">
//                                     <h3 className="tp-section-small">{word}</h3>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <hr className="mb-10" />
//         </div>
//     </>
// );
