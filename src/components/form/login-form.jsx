import Link from "next/link";
import { setCookie } from "cookies-next";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
const LoginForm = () => {
   const router = useRouter();
   // Setting the state for FormData with email and Password
   const [formData, setFormData] = useState({ email: "", password: "" });
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(false);

   // Updating the FormData as the input Changes
   const handleInputChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
   };
   // handlePrompt function
   let timerInterval;
   const handlePrompt = (promptType) => {
      Swal.fire({
         position: "center",
         icon: "success",
         title: "Login Successfull !",
         html: "<h3>Redirecting to Homepage...</h3>",
         timer: 1000,
         allowOutsideClick: false,
         allowEscapeKey: false,
         allowEnterKey: false,
         color: "#2f4f4f",
         timerProgressBar: true,
         didOpen: () => {
            Swal.showLoading();
            timerInterval = setInterval(() => {}, 100);
         },
         willClose: () => {
            clearInterval(timerInterval);
         },
      }).then((result) => {
         /* Read more about handling dismissals below */
         if (result.dismiss === Swal.DismissReason.timer && promptType === "HomePage") {
            router.reload("/");
         }
      });
   };

   // Handling the submit
   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         console.log(formData);
         setLoading(true);
         setError(null);
         const response = await fetch("/api/login", {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
               "Content-Type": "application/json",
            },
         });
         if (response.ok) {
            // user is authenticated, redirect or show success message
            setError(null);
            setLoading(false);
            // set the cookie
            setCookie("loggedIn", "true", {
               path: "/", // Adjust the path as needed
               maxAge: 60 * 60 * 24, // Cookie will expire in 7 days here second multiplied by minutes
               sameSite: "strict", // Adjust as needed
            });
            setTimeout(() => {
               // Navigate to /using the Link component
               handlePrompt("HomePage");
            }, 1000);
         } else {
            setLoading(false);
            setError("Invalid Email or Password");
         }
      } catch (error) {
         console.error(error);
         setLoading(false);
         setError("An error occurred while trying to log in");
      }
   };

   return (
      <>
         <section className='login-area pt-20 pb-50 bone'>
            <div className='container'>
               <div className='row'  style={{ height: "78vh" }}>
                  <motion.div
                     key='step1'
                     className='d-flex justify-content-center align-items-center'
                     // we can use initial opacity 0.5 and y 0% in both motion div for better subtleness
                     initial={{ opacity: 0.5, y: "0%" }}
                     animate={{ opacity: 1, x: 0 }}
                     exit={{ opacity: 0, x: "-70%" }}
                     transition={{ duration: 1, ease: "easeOut" }}
                  >
                     <div className='col-lg-7 col-md-12 col-sm-12 col-xs-12'>
                        <div className='basic-login card-color border border-secondary border-1 rounded-4'>
                           <div className='row'>
                              <div className='d-flex justify-content-center'>
                                 <div className='text-center'>
                                    <h3 className='tp-section-title px-2 buff-text-color'>Login From Here</h3>
                                    <hr className='shadow-sm border border-1 border-secondary opacity-25 rounded mt-0 mb-30 mx-2' />
                                 </div>
                              </div>
                           </div>

                           <form onSubmit={handleSubmit}>
                              <label htmlFor='email' className='buff-text-color mx-0'>
                                 Email <span>*</span>
                              </label>
                              <input
                                 id='email'
                                 className='border border-secondary border-1 rounded-2 buff-text-color'
                                 type='email'
                                 name='email'
                                 placeholder='Enter Email...'
                                 value={formData.email}
                                 required
                                 onChange={handleInputChange}
                              />
                              <label htmlFor='password' className='buff-text-color mx-0'>
                                 Password <span>*</span>
                              </label>
                              <input
                                 className='border border-secondary border-1 rounded-2 buff-text-color my-0'
                                 id='password'
                                 type='password'
                                 name='password'
                                 placeholder='Enter password...'
                                 value={formData.password}
                                 required
                                 onChange={handleInputChange}
                              />
                              <div className='forgot-password-div d-flex justify-content-end'>
                                 <Link href='/forgot-password' className='my-3 h6 text-primary opacity-75'>
                                    <u>Forgot Password?</u>
                                 </Link>
                              </div>
                              {error && <div className='my-1 text-danger text-center'>{error}</div>}
                              <button
                                 className={`text-white btn btn-lg w-100 light-blue ${loading && "btn-secondary"}`}
                                 disabled={loading}
                              >
                                 {loading ? "Loading..." : "Login"}
                                 {loading && (
                                    <span
                                       className='spinner-border spinner-border-sm ms-2'
                                       role='status'
                                       aria-hidden='true'
                                    ></span>
                                 )}
                              </button>
                              <div className='or-divide light-blue-secondary'>
                                 <span className='rounded-2'>or</span>
                              </div>

                              <Link
                                 href='/register'
                                 className='btn btn-lg light-border-blue w-100 light-blue shadow-sm'
                              >
                                 Sign Up
                              </Link>
                           </form>
                        </div>
                     </div>
                  </motion.div>
               </div>
            </div>
         </section>
      </>
   );
};

export default LoginForm;
