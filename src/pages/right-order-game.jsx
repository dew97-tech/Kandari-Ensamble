import React from 'react';
import SEO from '../common/seo';
import RightOrder from '../components/games/right-order-game';
// import WrapperFour from '../layout/wrapper-4';
import NavLinkWrapper from '../layout/navlink-wrapper';

const index = () => {
    return (
        <NavLinkWrapper>
            <SEO pageTitle={'Place in Right Order (Without Video)'} />
            <RightOrder exerciseId={3} exerciseTitle="Place in Right Order (Without Video)"/>
        </NavLinkWrapper>
    );
};

export default index;
