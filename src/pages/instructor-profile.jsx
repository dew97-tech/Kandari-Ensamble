import InstructorProfile from "@/src/components/instructor-profile";
import React from "react";
import SEO from "../common/seo";
import WrapperFour from "../layout/wrapper-4";
import WrapperThree from "../layout/wrapper-3";

const index = () => {
  return (
    <WrapperThree>
      <SEO pageTitle={"Instructor Profile"} />
      <InstructorProfile />
    </WrapperThree>
  );
};

export default index;
