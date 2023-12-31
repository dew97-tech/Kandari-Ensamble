import React from "react";
import SEO from "../common/seo";
import About from "../components/about";
import WrapperThree from "../layout/wrapper-3";

const index = () => {
  return (
    <WrapperThree>
      <SEO pageTitle={"About"} />
      <About />
    </WrapperThree>
  );
};

export default index;
