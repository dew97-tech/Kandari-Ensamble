import React, { useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import VideoLessonsContainer from "../VideoLessonsContainer";
import lessonData from "../../layout/headers/lesson-data";

const VideoLesson = ({ slug, title, exercise_id }) => {
   useEffect(() => {
      console.log(
         `Rendering VideoLessonsContainer with slug = ${slug} , title = ${title} , exercise_id = ${exercise_id}`
      );
   }, [slug, title]);

   return <VideoLessonsContainer slug={slug} title={title} exercise_id={exercise_id} />;
};

export default VideoLesson;

// Using Incremental Static Regeneration
export async function getStaticProps({ params }) {
   const { slug } = params;
   const lesson = lessonData[0]?.sub_menus?.find((lesson) => lesson?.link.includes(slug));
   return {
      props: {
         slug,
         title: lesson?.title,
         exercise_id: lesson?.exercise_id,
      },
      revalidate: 60,
   };
}
// getStaticPaths is needed here, but it is not needed in the other pages
export async function getStaticPaths() {
   return {
      paths: [
         { params: { slug: "video-lesson-1" } },
         { params: { slug: "video-lesson-2" } },
         { params: { slug: "video-lesson-3" } },
         { params: { slug: "video-lesson-4" } },
         { params: { slug: "video-lesson-5" } },
         { params: { slug: "video-lesson-6" } },
         { params: { slug: "video-lesson-7" } },
         { params: { slug: "video-lesson-8" } },
         { params: { slug: "video-lesson-9" } },
         { params: { slug: "video-lesson-10" } },
         { params: { slug: "dialogue-animation-video" } },
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
