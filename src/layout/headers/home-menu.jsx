import Link from "next/link";
import React from "react";
import home_data from "./home-data";

const HomeMenu = () => {
   return (
      <>
         <ul>
            {home_data.map((item) => (
               <li
                  key={item.id}
                  className={`${item?.has_dropdown ? "has-dropdown" : ""}`}
               >
                  {!item?.onlySideBar ? (
                     <Link href={item?.link}>{item?.title}</Link>
                  ) : null}
                  <ul className='submenu buff'>
                     {item?.has_dropdown && (
                        <>
                           {item?.sub_menus.map((sub, i) => (
                              <li
                                 key={i}
                                 className='buff-text-color card-color border border-1 border-secondary py-1 shadow-sm'
                              >
                                 <Link href={sub?.link}>{sub?.title}</Link>
                              </li>
                           ))}
                        </>
                     )}
                  </ul>
               </li>
            ))}
         </ul>
      </>
   );
};

export default HomeMenu;
