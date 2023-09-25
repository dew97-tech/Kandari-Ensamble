import React, { useContext } from 'react';
import CustomButton from '../components/CustomButton';
import { DictationGameContext } from '@/src/context/DictationContext';
const TrueFalse = () => {
    const { getNextWord, handleWordClick, word } = useContext(DictationGameContext);
    return (
        <div className="d-flex align-items-center justify-content-center mx-3">
            <CustomButton
                onClick={() => handleWordClick(word, 'oui')}
                text={'OUI'}
                colorString={'btn btn-md buff'}
                borderColor={'warning'}
                fontSize={'h4'}
            />
            <CustomButton
                onClick={() => handleWordClick(word, 'non')}
                text={'NON'}
                colorString={'btn btn-md buff'}
                borderColor={'warning'}
                fontSize={'h4'}
            />
        </div>
    );
};

export default TrueFalse;
