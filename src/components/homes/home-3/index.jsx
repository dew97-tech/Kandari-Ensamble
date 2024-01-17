import BrandArea from "@/src/common/brand-area";
import SuitableArea from "@/src/common/suitable-area";
import React from "react";
import VideoArea from "../../../common/video-area";
import AboutArea from "../../../common/about-area";
import BannerArea from "./banner-area";
import Subscription from "./subscription";
import CategoryArea from "./category-area";
import ChooseArea from "./choose-area";
import CounterArea from "./counter-area";
import FeatureArea from "../../../common/feature-area";
import OurCourse from "./our-course";
import TestimonialArea from "../../../common/testimonial-area-2";
import Calendly from "../../calendly";

const HomeThree = () => {
   return (
      <>
         <VideoArea style_2={true} />
         {/* <BannerArea /> */}
         {/* <Calendly /> */}
         {/* <FeatureArea /> */}
         <AboutArea />
         {/* <SuitableArea /> */}
         {/* <CategoryArea /> */}
         {/* <OurCourse /> */}
         {/* <ChooseArea /> */}
         {/* <TestimonialArea /> */}
         {/* <BrandArea style_3={true} /> */}
         <Subscription />
         {/* <CounterArea style_3={true} /> */}
      </>
   );
};

export default HomeThree;
