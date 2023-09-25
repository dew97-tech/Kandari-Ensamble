import React from 'react';
import SEO from '../common/seo';
import VisualMemoryGame from '../components/games/visual-memory-game';
import NavLinkWrapper from '../layout/navlink-wrapper';
import WrapperThree from '../layout/wrapper-3';

const index = () => {
    return (
        <NavLinkWrapper>
            <SEO pageTitle={'Visual Memory Game'} />
            <VisualMemoryGame exerciseTitle="Visual Memory Game" />
        </NavLinkWrapper>
    );
};

export default index;
