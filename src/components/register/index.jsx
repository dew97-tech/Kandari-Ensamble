import React from "react";
import Breadcrumb from "../bredcrumb/breadcrumb";
import RegisterForm from "../form/register-form";

const Register = () => {
   return (
      <div className='d-block my-auto'>
         {/* <Breadcrumb title="Frequently Asked Question"  subtitle="Register"  isDbbl="Pages"/> */}
         <RegisterForm />
      </div>
   );
};

export default Register;
