import dynamic from "next/dynamic";
import React, { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "../common/seo";
import VideoWrapper from "../layout/video-wrapper";
import LoadingComponent from "../components/games/components/LoadingComponent";

const RightOrderLesson = dynamic(
   () => import("@/src/components/VideoLesson/Right_Order_Game/Lesson"),
   {
      loading: () => <LoadingComponent />,
   }
);
const RolePlayLesson = dynamic(
   () => import("@/src/components/VideoLesson/Role_Play/Lesson"),
   {
      loading: () => <LoadingComponent />,
   }
);
const ExpressYourselfLesson = dynamic(
   () => import("@/src/components/VideoLesson/Express_Yourself/Lesson"),
   {
      loading: () => <LoadingComponent />,
   }
);
const GapExerciseLesson = dynamic(
   () => import("@/src/components/VideoLesson/Gap_Exercise/Lesson"),
   {
      loading: () => <LoadingComponent />,
   }
);
const StudyDialogueLesson = dynamic(
   () => import("@/src/components/VideoLesson/Study_The_Dialogue/Lesson"),
   {
      loading: () => <LoadingComponent />,
   }
);
const DialogueAnimationLesson = dynamic(
   () => import("@/src/components/VideoLesson/DialogueAnimationVideo/Lesson"),
   {
      loading: () => <LoadingComponent />,
   }
);
// other lesson imports

const VideoLessonsContainer = ({ slug, title, exercise_id }) => {
   let LessonComponent;

   switch (slug) {
      case "dialogue-animation-video":
         LessonComponent = DialogueAnimationLesson;
         break;
      case "video-lesson-1":
         LessonComponent = RightOrderLesson;
         break;
      case "video-lesson-2":
         LessonComponent = RolePlayLesson;
         break;
      case "video-lesson-3":
         LessonComponent = ExpressYourselfLesson;
         break;
      case "video-lesson-4":
         LessonComponent = GapExerciseLesson;
         break;
      case "video-lesson-5":
         LessonComponent = StudyDialogueLesson;
         break;
      case "video-lesson-6":
         LessonComponent = RightOrderLesson;
         break;
      case "video-lesson-7":
         LessonComponent = RolePlayLesson;
         break;
      case "video-lesson-8":
         LessonComponent = ExpressYourselfLesson;
         break;
      case "video-lesson-9":
         LessonComponent = StudyDialogueLesson;
         break;
      case "video-lesson-10":
         LessonComponent = StudyDialogueLesson;
         break;
      // Add other cases for each video lesson component
      default:
         return null;
   }

   return (
      <Suspense fallback={<LoadingComponent />}>
         <VideoWrapper>
            <SEO pageTitle={title} />
            {LessonComponent && (
               <LessonComponent
                  key={slug}
                  exerciseId={exercise_id}
                  exerciseTitle={title}
               />
            )}
            {/* {getLessonComponent(slug)} */}
         </VideoWrapper>
      </Suspense>
   );
};
export default VideoLessonsContainer;
