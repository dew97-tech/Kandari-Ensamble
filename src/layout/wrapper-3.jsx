import { animationCreate } from "@/utils/utils";
import React, { useEffect } from "react";
import BackToTop from "../lib/BackToTop";
import FooterThree from "./footers/footer-3";
import HeaderThree from "./headers/header-3";
import HeaderTwo from "./headers/header-2";

const WrapperThree = ({ children }) => {
   useEffect(() => {
      setTimeout(() => {
         animationCreate();
      }, 500);
   }, []);

   return (
      <div className='min-vh-100 d-flex flex-column'>
         <HeaderThree />
         {children}
         <FooterThree />
         {/* <BackToTop /> */}
      </div>
   );
};

export default React.memo(WrapperThree);
