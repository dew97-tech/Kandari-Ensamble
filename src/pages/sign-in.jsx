import React from 'react';
import SEO from '../common/seo';
import SignIn from '../components/sign-in';
import WrapperFour from '../layout/wrapper-4';
import WrapperThree from '../layout/wrapper-3';

const index = () => {
    return (
        <WrapperThree>
            <SEO pageTitle={'Sign in'} />
            <SignIn />
        </WrapperThree>
    );
};

export default index;
