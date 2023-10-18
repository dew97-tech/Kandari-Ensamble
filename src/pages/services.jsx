import React from "react";
import SEO from "../common/seo";
import Services from "../components/services";
import WrapperThree from "../layout/wrapper-3";

const index = () => {
  return (
    <WrapperThree>
      <SEO pageTitle={"Services"} />
      <Services />
    </WrapperThree>
  );
};

export default index;
