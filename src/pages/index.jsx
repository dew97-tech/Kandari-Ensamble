import React from 'react';
import SEO from '../common/seo';
import HomeThree from '../components/homes/home-3';
import WrapperThree from '../layout/wrapper-3';

const index = () => {
    return (
        <WrapperThree>
            <SEO pageTitle={'Maison Ensamble'} />
            <HomeThree />
        </WrapperThree>
    );
};

export default index;
// Main Home 1 index
// import SEO from '../common/seo';
// import Home3 from '../components/homes/home-3';
// import Wrapper from '../layout/wrapper';

// const index = () => {
//     return (
//         <Wrapper>
//             <SEO pageTitle={'Epora'} />
//             <Home3 />
//         </Wrapper>
//     );
// };

// export default index;
