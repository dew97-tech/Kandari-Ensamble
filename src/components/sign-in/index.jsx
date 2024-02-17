import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import LoginForm from "../form/login-form";

const SignIn = () => {
   return (
      <div className='d-block my-auto'>
         <LoginForm />
         {/* <Breadcrumb title="Log In" subtitle="Login" isDbbl="Pages" /> */}
      </div>
   );
};

export default SignIn;
