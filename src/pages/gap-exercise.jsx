import React from 'react';
import SEO from '../common/seo';
import FillUpTheGaps from '../components/games/gap-exercise';
import NavLinkWrapper from '../layout/navlink-wrapper';
import WrapperThree from '../layout/wrapper-3';

const index = () => {
    return (
        <NavLinkWrapper>
            <SEO pageTitle={'Fill in the Gaps'} />
            <FillUpTheGaps exerciseId={2} exerciseTitle="Fill in the Gaps" />
        </NavLinkWrapper>
    );
};

export default index;
