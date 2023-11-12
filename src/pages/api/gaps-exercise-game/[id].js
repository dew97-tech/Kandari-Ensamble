const sentences = [
   {
      exercise_id: 1,
      data: [
         {
            id: 1,
            hintSentence: "Sacha is sympatiek.",
            question: "Sacha ___ sympathique.",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "est",
            video: {
               pauseTime: 5.917,
            },
         },
         {
            id: 2,
            hintSentence: " Hallo, ik ben Louisa.",
            question: "Bonjour, je ___ Louisa.",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "suis",
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
            video: {
               pauseTime: 60.875,
            },
         },
         {
            id: 5,
            hintSentence: "Zijn jullie hier geboren?",
            question: "Vous ___ nés ici?",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "êtes",
            video: {
               pauseTime: 65.083,
            },
         },
         {
            id: 6,
            hintSentence: "Wow, ze zijn mooi!",
            question: "Wow, elles ___ belles!",
            options: ["suis", "es", "est", "sommes", "êtes", "sont"],
            correctAns: "sont",
            video: {
               pauseTime: 77.250,
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
            video: {
               pauseTime: 49.417,
            },
         },
         {
            id: 4,
            hintSentence: "Hoi, gaat het goed met je?",
            question: "Salut, tu vas ___?",
            options: ["très", "pas mal", "ne va pas", "bien", "mal", "vais"],
            correctAns: "bien",
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
         console.log("Fetching Gap-Exercise...");
         const { id } = req.query;
         const exercise = sentences.find(
            (exercise) => exercise.exercise_id === parseInt(id)
         );
         if (!exercise) {
            return res
               .status(404)
               .json({ message: `Exercise with id: ${id} not found.` });
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
