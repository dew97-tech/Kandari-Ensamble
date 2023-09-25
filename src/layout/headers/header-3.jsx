import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { getCookie, deleteCookie } from "cookies-next";
import NavMenu from "./nav-menu";
import ProfileMenu from "./profile-menu";
import useSticky from "@/hooks/use-sticky";
import Sidebar from "./sidebar";
import Image from "next/image";

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
         <header className="header_white_area bone">
            <div className="header__area">
               <div
                  className="main-header third-header header-xy-spacing"
                  id="header-sticky"
               >
                  <div className="container">
                     <div className="d-flex align-items-center">
                        <div className="col-xxl-3 col-xl-3 col-lg-5 col-md-6 col-6">
                           <div className="logo-area d-flex align-items-center">
                              <div className="logo">
                                 <Link href="/">
                                    <Image
                                       src="/assets/img/logo/brand_logo_2.png"
                                       alt="Maison Ensamble"
                                       width={150}
                                       height={50}
                                    />
                                 </Link>
                              </div>
                           </div>
                        </div>
                        <div className="col-xxl-9 col-xl-9 col-lg-7 col-md-6 col-6 d-flex align-items-center justify-content-end">
                           {isLoggedIn ? (
                              <div className="main-menu main-menu-black d-flex justify-content-end">
                                 <nav
                                    id="mobile-menu"
                                    className="d-none d-xl-block"
                                 >
                                    <div className="d-flex align-items-center">
                                       <NavMenu />
                                       <ProfileMenu
                                          handleLogout={handleLogout}
                                       />
                                    </div>
                                 </nav>
                              </div>
                           ) : (
                              <div className="d-flex justify-content-end">
                                 <Link
                                    href="/sign-in"
                                    className="btn btn-md light-blue my-0 px-3 py-2 d-none d-sm-block shadow-sm"
                                    onClick={() => {
                                       router.push("/sign-in");
                                    }}
                                 >
                                    Login
                                 </Link>
                              </div>
                           )}
                           <div className="d-flex justify-content-end">
                              <li>
                                 <Link
                                    href="#"
                                    onClick={() => setIsActive(true)}
                                    className="tp-menu-toggle d-xl-none"
                                 >
                                    <i className="fa-solid fa-bars fa-xl"></i>
                                 </Link>
                              </li>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </header>
         <Sidebar isActive={isActive} setIsActive={setIsActive} />
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
