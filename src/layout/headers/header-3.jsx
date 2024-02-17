import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";
import NavMenu from "./nav-menu";
import ProfileMenu from "./profile-menu";
import useSticky from "@/hooks/use-sticky";
import Sidebar from "./sidebar";
import Image from "next/image";
import HomeMenu from "./home-menu";

const HeaderThree = () => {
   const router = useRouter();
   const { sticky } = useSticky();
   const [isLoggedIn, setIsLoggedIn] = useState(null);
   const [isActive, setIsActive] = useState(false);

   useEffect(() => {
      // Fetch the cookie value and update isLoggedIn state
      const LoggedIn = getCookie("loggedIn");
      if (LoggedIn) {
         setIsLoggedIn(LoggedIn);
      }
   }, []); // Run this effect once after the initial render
   const handleLogout = () => {
      deleteCookie("loggedIn", { path: "/" });
      router.reload();
      router.push("/");
      setIsLoggedIn(null);
   };
   return (
      <>
         <header className='bone'>
            <div className='pt-10' id='header-sticky'>
               <div className='container col-lg-10'>
                  <div className='d-flex justify-content-between align-items-center'>
                     <div className='text-center'>
                        <div className='logo-area d-flex align-items-center'>
                           <div className='logo'>
                              <Link href='/'>
                                 <Image
                                    src='/assets/img/logo/brand_logo_2.png'
                                    alt='Maison Ensemble'
                                    // width={200}
                                    // height={100}

                                    placeholder={true}
                                    width={200}
                                    height={100}
                                    quality={100}
                                    priority
                                 />
                              </Link>
                           </div>
                        </div>
                     </div>
                     <div className='d-flex align-items-center justify-content-center'>
                        <div className='main-menu main-menu-black'>
                           <nav id='mobile-menu' className='d-none d-xl-block'>
                              <div className='d-flex align-items-center'>
                                 <HomeMenu />
                              </div>
                           </nav>
                        </div>
                        {isLoggedIn ? (
                           <div className='main-menu main-menu-black'>
                              <nav id='mobile-menu' className='d-none d-xl-block'>
                                 <div className='d-flex '>
                                    <NavMenu />
                                    <ProfileMenu handleLogout={handleLogout} />
                                 </div>
                              </nav>
                           </div>
                        ) : (
                           <div className='d-flex justify-content-end align-items-center mr-10'>
                              <Link
                                 href='/sign-in'
                                 className='light-blue my-0 px-3 py-2 d-none d-sm-block shadow-sm fs-6 rounded-2'
                                 onClick={() => {
                                    router.push("/sign-in");
                                 }}
                              >
                                 Login
                              </Link>
                           </div>
                        )}
                        <div className='d-flex justify-content-end'>
                           <li>
                              <button onClick={() => setIsActive(true)} className='tp-menu-toggle d-xl-none'>
                                 <i className='fa-solid fa-bars fa-xl'></i>
                              </button>
                           </li>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <Sidebar isActive={isActive} setIsActive={setIsActive} handleLogout={handleLogout} />
      </>
   );
};

export default React.memo(HeaderThree);
{
   /* <li className='has-dropdown'>
															<>
																<Link
																	href="/"
																	className="border border-1 border-secondary"
																>
																	<i className="fi fi-rr-user"></i>
																</Link>
															</>
														</li> */
}
{
   /* <li
													onClick={() => {
														deleteCookie('loggedIn', {
															path: '/', // Adjust the path as needed
														});
														setIsLoggedIn(false);
														router.push('/');
													}}
													className="btn btn-md light-blue my-0 px-3 py-2 d-none d-sm-block border border-1 border-secondary"
												>
													Logout
												</li> */
}
