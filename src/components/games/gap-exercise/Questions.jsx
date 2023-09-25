import React, { useContext } from 'react';


const Questions = ({context}) => {
    const { currentQuestion, selectedOption } = useContext(context);
    return (
        <div className="mx-2 text-center">
            {/* <h3 className="text-sm-center text-md-center mb-20 buff-text-color">
                Fill the Gaps
            </h3> */}
            <h2 className="buff-text-color mb-0">
                {currentQuestion?.question?.replace('___', selectedOption || '______')}
            </h2>
        </div>
    );
};

export default Questions;
