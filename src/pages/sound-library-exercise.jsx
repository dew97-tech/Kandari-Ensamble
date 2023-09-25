import React from 'react';
import SEO from '../common/seo';
import WrapperThree from '../layout/wrapper-3';
import SoundLibrary from '../components/games/sound-library-exercise';
import NavLinkWrapper from '../layout/navlink-wrapper';
const index = () => {
    return (
        <NavLinkWrapper>
            <SEO pageTitle={'Sound Library Exercise'} />
            <SoundLibrary exerciseTitle="Sound Library Exercise"/>
        </NavLinkWrapper>
    );
};

export default index;
