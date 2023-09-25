import React from 'react';
import SEO from '../common/seo';
import ForgotPassword from '../components/forgot-password';
import WrapperFour from '../layout/wrapper-4';
import WrapperThree from '../layout/wrapper-3';

const index = () => {
    return (
        <WrapperThree>
            <SEO pageTitle={'Forgot-Password'} />
            <ForgotPassword />
        </WrapperThree>
    );
};

export default index;
