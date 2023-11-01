import Link from "next/link";
import React, { useState } from "react";

// internal
import menu_data from "./menu-data";
import profile_data from "./profile-data";
import home_data from "./home-data";

const MobileMenus = ({ handleLogout }) => {
   const [navTitle, setNavTitle] = useState("");
   //openMobileMenu
   const openMobileMenu = (menu) => {
      if (navTitle === menu) {
         setNavTitle("");
      } else {
         setNavTitle(menu);
      }
   };
   return (
      <>
         <nav className='mean-nav'>
            <ul>
               {home_data.map((profile) => (
                  <li key={profile.id}>
                     {profile.title === "Logout" ? (
                        <Link href={profile.link} onClick={handleLogout}>
                           {profile.title}
                        </Link>
                     ) : (
                        <Link href={profile.link}>{profile.title}</Link>
                     )}
                  </li>
               ))}
               {menu_data.map((menu, i) => (
                  <React.Fragment key={i}>
                     {menu.has_dropdown && (
                        <li className='has-dropdown'>
                           {menu.onlySideBar ? (
                              <Link href={menu.link}>{menu.title}</Link>
                           ) : (
                              <>
                                 <Link href={menu.link}>{menu.title}</Link>
                                 <ul
                                    className='submenu'
                                    style={{
                                       display:
                                          navTitle === menu.title
                                             ? "block"
                                             : "none",
                                    }}
                                 >
                                    {menu.sub_menus.map((sub, i) => (
                                       <li key={i}>
                                          <Link href={sub.link}>
                                             {sub.title}
                                          </Link>
                                       </li>
                                    ))}
                                 </ul>
                                 <a
                                    className={`mean-expand ${
                                       navTitle === menu.title
                                          ? "mean-clicked"
                                          : ""
                                    }`}
                                    onClick={() => openMobileMenu(menu.title)}
                                    style={{
                                       fontSize: "18px",
                                       cursor: "pointer",
                                    }}
                                 >
                                    <i className='fal fa-add'></i>
                                 </a>
                              </>
                           )}
                        </li>
                     )}
                     {!menu.has_dropdown && (
                        <li>
                           <Link href={menu.link}>{menu.title}</Link>
                        </li>
                     )}
                  </React.Fragment>
               ))}

               {profile_data.map((profile) => (
                  <li key={profile.id}>
                     {profile.title === "Logout" ? (
                        <Link href={profile.link} onClick={handleLogout}>
                           {profile.title}
                        </Link>
                     ) : (
                        <Link href={profile.link}>{profile.title}</Link>
                     )}
                  </li>
               ))}
            </ul>
         </nav>
      </>
   );
};

export default MobileMenus;
