import { NextResponse } from "next/server";

export function middleware(request) {
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

   // Check if the user is not logged in and trying to access a protected route
   if (!isLoggedIn && protectedRoutes.includes(request.nextUrl.pathname)) {
      url.pathname = request.nextUrl.pathname;
      return NextResponse.redirect(url);
   }

   // Redirect signed-in users back to the home page if they try to access the sign-in page
   if (isLoggedIn && request.nextUrl.pathname === "/sign-in") {
      url.pathname = "/";
      return NextResponse.redirect(url);
   }

   return NextResponse.next();
}

export const config = {
   matcher: ["/", "/:path*"],
};
