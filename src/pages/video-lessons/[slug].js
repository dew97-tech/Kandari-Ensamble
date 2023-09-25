import React, { useMemo, useEffect } from "react";
import { useRouter } from "next/router";
import VideoLessonsContainer from "../VideoLessonsContainer";
const lessonData = [
   {
      id: 1,
      title: "LEÇON 1",
      link: "/video-lessons/dialogue-animation-video",
      has_dropdown: true,
      onlySideBar: false,
      sub_menus: [
         {
            exercise_id: 1,
            link: "/video-lessons/dialogue-animation-video",
            title: "Dialogue Animation",
         },
         { exercise_id: 2, link: "/memory-game", title: "Memory Game" },
         {
            exercise_id: 1,
            link: "/video-lessons/video-lesson-1",
            title: "Place in Right Order 1",
         },
         {
            exercise_id: 1,
            link: "/video-lessons/video-lesson-5",
            title: "Study the Dialogue 1",
         },
         {
            exercise_id: 2,
            link: "/video-lessons/video-lesson-6",
            title: "Place in Right Order 2",
         },
         {
            exercise_id: 2,
            link: "/video-lessons/video-lesson-9",
            title: "Study the Dialogue 2",
         },
         {
            exercise_id: 1,
            link: "/video-lessons/video-lesson-4",
            title: "Gaps Exercise",
         },
         {
            exercise_id: 3,
            link: "/video-lessons/video-lesson-10",
            title: "Study the Dialogue 3",
         },
         {
            exercise_id: 9,
            link: "/visual-memory-game",
            title: "Visual Memory Game",
         },
         {
            exercise_id: 1,
            link: "/video-lessons/video-lesson-2",
            title: "Role Play 1",
         },
         {
            exercise_id: 2,
            link: "/video-lessons/video-lesson-7",
            title: "Role Play 2",
         },
         {
            exercise_id: 12,
            link: "/dictation-memory-game",
            title: "Dictation Memory Game",
         },
         {
            exercise_id: 1,
            link: "/video-lessons/video-lesson-3",
            title: "Express Yourself 1",
         },
         {
            exercise_id: 2,
            link: "/video-lessons/video-lesson-8",
            title: "Express Yourself 2",
         },
         {
            exercise_id: 3,
            link: "/right-order-game",
            title: "Place in Right Order (Without Video)",
         },
         { exercise_id: 2, link: "/gap-exercise", title: "Fill in the Gaps" },
         {
            exercise_id: 17,
            link: "/sound-library-exercise",
            title: "Sound Library Exercise",
         },
      ],
   },
];

const VideoLesson = ({ slug, title, exercise_id }) => {
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
      <VideoLessonsContainer
         slug={slug}
         title={title}
         exercise_id={exercise_id}
      />
   );
};

export default VideoLesson;

// Using Incremental Static Regeneration
export async function getStaticProps({ params }) {
   const { slug } = params;
   const lesson = lessonData[0]?.sub_menus?.find((lesson) =>
      lesson?.link.includes(slug)
   );
   return {
      props: {
         slug,
         title: lesson?.title,
         exercise_id: lesson?.exercise_id,
      },
      revalidate: 30,
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
