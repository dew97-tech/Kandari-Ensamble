import Link from "next/link";
import React from "react";
// import menu_data from './menu-data';
const menu_data = [
   {
      id: 1,
      title: "Login/SignUp",
      link: "/sign-in",
      has_dropdown: false,
      onlySideBar: true,
      sub_menus: [
         // { link: '/', title: 'Home Style 1' },
         { link: "/sign-in", title: "Login" },
         { link: "/register", title: "Sign Up" },
         { link: "/sign-out", title: "Sign Out" },
      ],
   },
   {
      id: 6,
      title: "LEÇON 1",
      link: "/video-lessons/dialogue-animation-video",
      has_dropdown: false,
      onlySideBar: false,
      sub_menus: [
         {
            link: "/video-lessons/dialogue-animation-video",
            title: "Dialogue Animation",
         },
      ],
   },
   {
      id: 3,
      title: "Video Lessons",
      link: "/video-lessons/video-lesson-1",
      has_dropdown: true,
      sub_menus: [
         {
            link: "/video-lessons/video-lesson-1",
            title: "Place in Right Order",
         },
         { link: "/video-lessons/video-lesson-2", title: "Role Play" },
         { link: "/video-lessons/video-lesson-3", title: "Express Yourself" },
         { link: "/video-lessons/video-lesson-4", title: "Gap Exercise" },
         { link: "/video-lessons/video-lesson-5", title: "Study the Dialogue" },
      ],
   },

   {
      id: 7,
      title: "Exercise Lessons",
      link: "/exercise-lessons/memory-game",
      has_dropdown: true,
      onlySideBar: false,
      sub_menus: [
         {
            link: "/exercise-lessons/memory-game",
            title: "Memory Game",
            exercise_id: 1,
         },
         {
            link: "/exercise-lessons/right-order-game",
            title: "Place in Right Order (Without Video)",
            exercise_id: 3,
         },
         {
            link: "/exercise-lessons/gap-exercise",
            title: "Fill in the Gaps",
            exercise_id: 2,
         },
         {
            link: "/exercise-lessons/dictation-memory-game",
            title: "Dictation Memory Game",
            exercise_id: 1,
         },
         {
            link: "/exercise-lessons/visual-memory-game",
            title: "Visual Memory Game",
            exercise_id: 1,
         },
         {
            link: "/exercise-lessons/sound-library-exercise",
            title: "Sound Library Exercise",
            exercise_id: 1,
         },
      ],
   },
   {
      id: 8,
      title: "Sound Library",
      link: "/exercise-lessons/sound-library",
      has_dropdown: false,
      onlySideBar: false,
      sub_menus: [
         {
            link: "/exercise-lessons/sound-library",
            title: "Sound-Library",
         },
      ],
   },
];

const NavMenu = () => {
   return (
      <>
         <ul>
            {menu_data.map((item) => (
               <li
                  key={item.id}
                  className={`${item?.has_dropdown ? "has-dropdown" : ""}`}
               >
                  {!item?.onlySideBar ? (
                     <Link href={item?.link}>{item?.title}</Link>
                  ) : null}
                  <ul className="submenu buff">
                     {item?.has_dropdown && (
                        <>
                           {item?.sub_menus.map((sub, i) => (
                              <li
                                 key={i}
                                 className="buff-text-color card-color border border-1 border-secondary py-1 shadow-sm"
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

export default NavMenu;
