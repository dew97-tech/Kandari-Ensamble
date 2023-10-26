import { NextResponse } from "next/server";
export function middleware(request) {
   let isLoggedIn = false;

   // Get the cookie value from the request

   const loggedInCookie = request.cookies.get("loggedIn");
   if (loggedInCookie) {
      const { value } = loggedInCookie;
      isLoggedIn = value === "true";
   }
   // console.log("isLoggedIn", isLoggedIn);

   // List of routes that require authentication
   const protectedRoutes = [
      "/instructor-profile",
      "/forgot-password",
      "/exercise-lessons/memory-game",
      "/exercise-lessons/right-order-game",
      "/exercise-lessons/gap-exercise",
      "/exercise-lessons/dictation-memory-game",
      "/exercise-lessons/visual-memory-game",
      "/video-lessons/dialogue-animation-video",
      "/video-lessons/video-lesson-1",
      "/video-lessons/video-lesson-2",
      "/video-lessons/video-lesson-3",
      "/video-lessons/video-lesson-4",
      "/video-lessons/video-lesson-5",
      "/video-lessons/video-lesson-6",
      "/video-lessons/video-lesson-7",
      "/video-lessons/video-lesson-8",
      "/video-lessons/video-lesson-9",
      "/video-lessons/video-lesson-10",
      "/exercise-lessons/sound-library",
      "/exercise-lessons/sound-library-exercise",
   ];

   // Check if user is not logged in and trying to access protected route
   if (!isLoggedIn && protectedRoutes.includes(request.nextUrl.pathname)) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
   }

   // Redirect signed-in users trying to access sign-in back to home
   if (isLoggedIn && request.nextUrl.pathname === "/sign-in") {
      return NextResponse.redirect(new URL("/", request.url));
   }

   return NextResponse.next();
}
export const config = {
   matcher: [
      "/",
      "/sign-in",
      "/register",
      "/forgot-password",
      "/instructor-profile",
      "/exercise-lessons/memory-game",
      "/exercise-lessons/right-order-game",
      "/exercise-lessons/gap-exercise",
      "/exercise-lessons/dictation-memory-game",
      "/exercise-lessons/visual-memory-game",
      "/video-lessons/dialogue-animation-video",
      "/video-lessons/video-lesson-1",
      "/video-lessons/video-lesson-2",
      "/video-lessons/video-lesson-3",
      "/video-lessons/video-lesson-4",
      "/video-lessons/video-lesson-5",
      "/video-lessons/video-lesson-6",
      "/video-lessons/video-lesson-7",
      "/video-lessons/video-lesson-8",
      "/video-lessons/video-lesson-9",
      "/video-lessons/video-lesson-10",
      "/exercise-lessons/sound-library",
      "/exercise-lessons/sound-library-exercise",
   ],
};
