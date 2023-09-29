import React, { useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import ExerciseLessonContainer from "../ExerciseLessonContainer";
const menu_data = [
   {
      id: 7,
      title: "Exercises",
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
         {
            link: "/exercise-lessons/sound-library",
            title: "Sound-Library",
            exercise_id: 1,
         },
      ],
   },
];

const ExerciseLesson = ({ slug, title, link, exercise_id }) => {
   // const router = useRouter();
   // const { slug } = router.query;

   // const lesson = useMemo(() => {
   //    return lessonData[0]?.sub_menus?.find((lesson) =>
   //       lesson?.link?.includes(slug)
   //    );
   // }, [slug]);
   useEffect(() => {
      console.log(
         `Rendering VideoLessonsContainer with slug = ${slug} , title = ${title} , exercise_id = ${exercise_id}`
      );
   }, [slug, title]);

   return (
      <ExerciseLessonContainer
         slug={slug}
         link={link}
         title={title}
         exercise_id={exercise_id}
      />
   );
};

export default ExerciseLesson;

// Using Incremental Static Regeneration
export async function getStaticProps({ params }) {
   const { slug } = params;
   const lesson = menu_data[0]?.sub_menus?.find((lesson) =>
      lesson?.link.includes(slug)
   );
   return {
      props: {
         slug,
         title: lesson?.title,
         link: lesson?.link,
         exercise_id: lesson?.exercise_id,
      },
      revalidate: 60,
   };
}
// getStaticPaths is needed here, but it is not needed in the other pages
export async function getStaticPaths() {
   return {
      paths: [
         { params: { slug: "memory-game" } },
         { params: { slug: "right-order-game" } },
         { params: { slug: "gap-exercise" } },
         { params: { slug: "dictation-memory-game" } },
         { params: { slug: "visual-memory-game" } },
         { params: { slug: "sound-library-exercise" } },
         { params: { slug: "sound-library" } },
      ],
      fallback: false,
   };
}

// Using server side rendering
// export async function getServerSideProps({ params }) {
//    const { slug } = params;
//    const lesson = lesson_data[0]?.sub_menus?.find((lesson) =>
//       lesson?.link?.includes(slug)
//    );
//    return {
//       props: {
//          slug,
//          title: lesson?.title,
//          exercise_id: lesson?.exercise_id,
//       },
//    };
// }

// // getStaticProps is not needed here, but it is needed in the other pages
// export async function getStaticProps({ params }) {
// 	const lesson = lesson_data[0].sub_menus.find((lesson) => lesson.link.includes(params.slug));
// 	return {
// 		props: {
// 			slug: params.slug,
// 			title: lesson.title,
// 		},
// 		revalidate: 30,
// 	};
// }
