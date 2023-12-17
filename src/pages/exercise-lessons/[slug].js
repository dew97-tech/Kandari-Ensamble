import React, { useEffect } from "react";
import ExerciseLessonContainer from "../ExerciseLessonContainer";
import lesson_data from "@/src/layout/headers/lesson-data";

const ExerciseLesson = ({ slug, title, link, exercise_id }) => {
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
   const lesson = lesson_data[0]?.sub_menus?.find((lesson) =>
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
