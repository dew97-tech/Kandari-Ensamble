import { NextResponse } from "next/server";
export function middleware(request) {
   // Add redirect flag
   let isRedirecting = false;

   // Get the cookie value from the request
   const url = request.nextUrl.clone();
   const isLoggedIn = request.cookies.get("loggedIn");

   // List of routes that require authentication
   const protectedRoutes = [
      "/instructor-profile",
      "/exercise-lessons/memory-game",
      "/exercise-lessons/right-order-game",
      "/exercise-lessons/gap-exercise",
      "/exercise-lessons/dictation-memory-game",
      "/exercise-lessons/visual-memory-game",
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

   // Check if already redirecting or on redirect destination
   if (isRedirecting || url.pathname === "/" || url.pathname === "/sign-in") {
      return NextResponse.next();
   }

   // Check if user is not logged in and trying to access protected route
   if (!isLoggedIn && protectedRoutes.includes(request.nextUrl.pathname)) {
      // Set redirect flag
      isRedirecting = true;
      // url.pathname = request.nextUrl.pathname;
      return NextResponse.redirect(new URL("/sign-in", request.url));
   }

   // Redirect signed-in users trying to access sign-in back to home
   if (isLoggedIn && request.nextUrl.pathname === "/sign-in") {
      // Set redirect flag
      isRedirecting = true;

      url.pathname = "/";
      return NextResponse.redirect(new URL("/", request.url));
   }

   return NextResponse.next();
}
export const config = {
   matcher: [
      "/instructor-profile",
      "/exercise-lessons/memory-game",
      "/exercise-lessons/right-order-game",
      "/exercise-lessons/gap-exercise",
      "/exercise-lessons/dictation-memory-game",
      "/exercise-lessons/visual-memory-game",
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
