const sentences = [
   {
      exercise_id: 1,
      data: [
         {
            id: 1,
            hintSentence: "Sacha is in Frankrijk, in Marans.",
            question: "Sacha ___ en France, à Marans.",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "est",
            audioUrl:"/assets/exercises/video-exercise/sacha-est-en-france-a-marans.mp3",
            video: {
               pauseTime: 5.917,
            },
         },
         {
            id: 2,
            hintSentence: "Hallo, ik ben Sacha.",
            question: "Bonjour, je ___ Sacha.",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "suis",
            audioUrl: "/assets/exercises/video-exercise/bonjour-je-suis-sacha.mp3",
            video: {
               pauseTime: 16.75,
            },
         },
         {
            id: 3,
            hintSentence: "Ben je hier met je ouders?",
            question: "Tu ___ ici avec tes parents ?",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "es",
            audioUrl: "/assets/exercises/video-exercise/tu-es-ici-avec-tes-parents.mp3",
            video: {
               pauseTime: 49.417,
            },
         },
         {
            id: 4,
            hintSentence: "Wij zijn Marandais!",
            question: "Nous ___ Marandais !",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "sommes",
            audioUrl: "/assets/exercises/video-exercise/nous-sommes-marandais.mp3",
            video: {
               pauseTime: 60.875,
            },
         },
         {
            id: 5,
            hintSentence: "Zijn jullie hier geboren?",
            question: "Vous ___ nés ici ?",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "êtes",
            audioUrl: "/assets/exercises/video-exercise/vous-etes-nes-ici.mp3",
            video: {
               pauseTime: 65.083,
            },
         },
         {
            id: 6,
            hintSentence: "Wow, ze zijn mooi!",
            question: "Wow, elles ___ belles !",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "sont",
            audioUrl: "/assets/exercises/video-exercise/wow-elles-sont-belles.mp3",
            video: {
               pauseTime: 77.25,
            },
         },
      ],
   },
   {
      exercise_id: 2,
      data: [
         {
            id: 1,
            hintSentence: "Het gaat heel goed.",
            question: "Ça va ___ bien.",
            options: ["très", "pas mal", "ne va pas", "bien", "mal", "vais"],
            correctAns: "très",
            audioUrl: "/assets/exercises/place-in-right-order/ca-va-tres-bien.mp3",
            video: {
               pauseTime: 6,
            },
         },
         {
            id: 2,
            hintSentence: "Hoe gaat het? Niet slecht.",
            question: "Ça va ? ___ ",
            options: ["très", "pas mal", "ne va pas", "bien", "mal", "vais"],
            correctAns: "pas mal",
            audioUrl: "/assets/exercises/place-in-right-order/ca-va-pas-mal.mp3",
            video: {
               pauseTime: 16.75,
            },
         },
         {
            id: 3,
            hintSentence: "Het gaat niet goed.",
            question: "Ça ___ bien.",
            options: ["très", "pas mal", "ne va pas", "bien", "mal", "vais"],
            correctAns: "ne va pas",
            audioUrl: "/assets/exercises/place-in-right-order/ca-ne-va-pas-bien.mp3",
            video: {
               pauseTime: 49.417,
            },
         },
         {
            id: 4,
            hintSentence: "Hoi, gaat het goed met je?",
            question: "Salut, tu vas ___ ?",
            options: ["très", "pas mal", "ne va pas", "bien", "mal", "vais"],
            correctAns: "bien",
            audioUrl: "/assets/exercises/place-in-right-order/salut-tu-vas-bien.mp3",
            video: {
               pauseTime: 60.48,
            },
         },
         {
            id: 5,
            hintSentence: "Het gaat slecht.",
            question: "Ça va ___.",
            options: ["très", "pas mal", "ne va pas", "bien", "mal", "vais"],
            correctAns: "mal",
            audioUrl: "/assets/exercises/place-in-right-order/ca-va-mal.mp3",
            video: {
               pauseTime: 60.5,
            },
         },
         {
            id: 6,
            hintSentence: "Het gaat heel goed met me. En jij?",
            question: "Je elles ___ très bien.Et toi ?",
            options: ["très", "pas mal", "ne va pas", "bien", "mal", "vais"],
            correctAns: "vais",
            audioUrl: "/assets/exercises/place-in-right-order/je-vais-tres-bien-et-toi.mp3",
            video: {
               pauseTime: 70.35,
            },
         },
      ],
   },
];
export default function handler(req, res) {
   try {
      if (req.method === "GET") {
         console.log(`Fetching Gap-Exercise...${req.query.id}`);
         const { id } = req.query;
         const exercise = sentences.find((exercise) => exercise.exercise_id === parseInt(id));
         if (!exercise) {
            return res.status(404).json({ message: `Exercise with id: ${id} not found.` });
         }
         res.status(200).json(exercise);

         console.log("Returning Gap-Exercise as JSON...");
      } else {
         // Return an error message for unsupported HTTP methods
         console.error(`Unsupported HTTP method: ${req.method}`);
         res.status(405).json({ message: "Method not allowed" });
      }
   } catch (error) {
      // Return an error message for failed fetch requests
      console.error(error);
      res.status(500).json({ message: "Failed to fetch sentences" });
   }
}
