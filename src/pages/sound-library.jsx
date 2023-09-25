import React from 'react';
import SEO from '../common/seo';
import WrapperThree from '../layout/wrapper-3';
import SoundLibrary from '../components/sound-library';

const index = () => {
    return (
        <WrapperThree>
            <SEO pageTitle={'Sound Library'} />
            <SoundLibrary />
        </WrapperThree>
    );
};

export default index;
