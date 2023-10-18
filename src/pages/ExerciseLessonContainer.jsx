import dynamic from "next/dynamic";
import React, { Suspense, useState, useEffect } from "react";
import { useRouter } from "next/router";
import SEO from "../common/seo";
import NavLinkWrapper from "../layout/navlink-wrapper";
import LoadingComponent from "../components/games/components/LoadingComponent";

const MemoryGameLesson = dynamic(
   () => import("../components/games/memory-games"),
   {
      loading: () => <LoadingComponent />,
   }
);
const RightOrderLesson = dynamic(
   () => import("../components/games/right-order-game"),
   {
      loading: () => <LoadingComponent />,
   }
);
const GapExerciseLesson = dynamic(
   () => import("../components/games/gap-exercise"),
   {
      loading: () => <LoadingComponent />,
   }
);
const DictationMemoryGameLesson = dynamic(
   () => import("../components/games/dictation-memory-game"),
   {
      loading: () => <LoadingComponent />,
   }
);
const VisualMemoryGameLesson = dynamic(
   () => import("../components/games/visual-memory-game"),
   {
      loading: () => <LoadingComponent />,
   }
);
const SoundLibraryExerciseLesson = dynamic(
   () => import("../components/games/sound-library-exercise"),
   {
      loading: () => <LoadingComponent />,
   }
);
const SoundLibraryLesson = dynamic(
   () => import("../components/sound-library"),
   {
      loading: () => <LoadingComponent />,
   }
);

// other lesson imports

const ExerciseLessonContainer = ({ slug, title, exercise_id, link }) => {
   let LessonComponent;

   switch (slug) {
      case "memory-game":
         LessonComponent = MemoryGameLesson;
         break;
      case "right-order-game":
         LessonComponent = RightOrderLesson;
         break;
      case "gap-exercise":
         LessonComponent = GapExerciseLesson;
         break;
      case "dictation-memory-game":
         LessonComponent = DictationMemoryGameLesson;
         break;
      case "visual-memory-game":
         LessonComponent = VisualMemoryGameLesson;
         break;
      case "sound-library-exercise":
         LessonComponent = SoundLibraryExerciseLesson;
         break;
      case "sound-library":
         LessonComponent = SoundLibraryLesson;
         break;

      // Add other cases for each video lesson component
      default:
         return null;
   }

   return (
      // <Suspense fallback={<LoadingComponent />}>
         <NavLinkWrapper>
            <SEO pageTitle={title} />
            {LessonComponent && (
               <LessonComponent
                  key={slug}
                  exerciseId={exercise_id}
                  exerciseTitle={title}
               />
            )}
         </NavLinkWrapper>
      // </Suspense>
   );
};
export default ExerciseLessonContainer;
