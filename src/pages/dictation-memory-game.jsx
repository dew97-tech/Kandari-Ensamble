import React from 'react';
import SEO from '../common/seo';
import DictationMemoryGame from '../components/games/dictation-memory-game';
import NavLinkWrapper from '../layout/navlink-wrapper';
import WrapperThree from '../layout/wrapper-3';

const index = () => {
    return (
        <NavLinkWrapper>
            <SEO pageTitle={'Dictation Memory Game'} />
            <DictationMemoryGame exerciseTitle="Dictation Memory Game" />
        </NavLinkWrapper>
    );
};

export default index;
