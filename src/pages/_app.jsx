import { Josefin_Sans } from "@next/font/google";
import { useExercises } from "@/utils/exerciseUtils";
import NextNProgress from "nextjs-progressbar";
import "@/src/styles/index.scss";
import "react-tooltip/dist/react-tooltip.css";
import { NavigationProvider } from "../context/NavigationContext";

const josefin_sans = Josefin_Sans({
   subsets: ["latin"],
});

export default function App({ Component, pageProps }) {
   const exercises = useExercises();

   return (
      <NavigationProvider>
         <main className={josefin_sans.className}>
            <NextNProgress color='#FF6652' height={4} startPosition={0.3} stopDelayMs={100} />
            <Component {...pageProps} exercises={exercises} />
         </main>
      </NavigationProvider>
   );
}
