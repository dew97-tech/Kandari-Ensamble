const express_yourself_exercise = [
   {
      exercise_id: 1,
      data: [
         {
            id: 1,
            question: "Hoi, ik heet Charlie.",
            correctAnswer: "Salut, je m'appelle Charlie.",
            audioUrl: "/assets/exercises/video-exercise/salut-je-mappelle-charlie.mp3",
            video: {
               pauseTime: 26.375,
            },
         },
         {
            id: 2,
            question: "Het gaat goed met me, dank je!",
            correctAnswer: "Je vais bien, merci ! Et toi, ça va ?",
            audioUrl: "/assets/exercises/video-exercise/je-vais-bien-merci.mp3",
            video: {
               pauseTime: 36.125,
            },
         },
         {
            id: 3,
            question: "En jij, hoe gaat het?",
            correctAnswer: "Et toi, ça va ?",
            audioUrl: "/assets/exercises/video-exercise/et-toi-ca-va.mp3",
            video: {
               pauseTime: 40.292,
            },
         },
         {
            id: 4,
            question: "Ja, we wonen hier.",
            correctAnswer: "Oui, nous habitons ici.",
            audioUrl: "/assets/exercises/video-exercise/oui-nous-habitons-ici.mp3",
            video: {
               pauseTime: 55.854,
            },
         },
         {
            id: 5,
            question: "We zijn Marandais!",
            correctAnswer: "Nous sommes Marandais !",
            audioUrl: "/assets/exercises/video-exercise/nous-sommes-marandais.mp3",
            video: {
               pauseTime: 60.875,
            },
         },
         {
            id: 6,
            question: "Ja! Kijk, hier zijn foto's van Marans.",
            correctAnswer: "Oui ! Regarde, voici des photos de Marans.",
            audioUrl: "/assets/exercises/video-exercise/oui-regarde-voici-des-photos-de-marans.mp3",
            video: {
               pauseTime: 69.708,
            },
         },
         {
            id: 7,
            question: "Tot later!",
            correctAnswer: "A plus !",
            audioUrl: "/assets/exercises/video-exercise/a-plus.mp3",
            video: {
               pauseTime: 91.625,
            },
         },
      ],
   },
   {
      exercise_id: 2,
      data: [
         {
            id: 1,
            question: "Hallo, ik ben Sacha.",
            correctAnswer: "Bonjour, je suis Sacha.",
            audioUrl: "/assets/exercises/video-exercise/bonjour-je-suis-sacha.mp3",
            video: {
               pauseTime: 16.75,
            },
         },
         {
            id: 2,
            question: "Hoe heet jij?",
            correctAnswer: "Comment t'appelles-tu ?",
            audioUrl: "/assets/exercises/video-exercise/comment-tappelles-tu.mp3",
            video: {
               pauseTime: 22.458,
            },
         },
         {
            id: 3,
            question: "Hoe gaat het met je Charlie?",
            correctAnswer: "Comment vas-tu Charlie ?",
            audioUrl: "/assets/exercises/video-exercise/comment-vas-tu-charlie.mp3",
            video: {
               pauseTime: 32.125,
            },
         },
         {
            id: 4,
            question: "Het gaat goed, dank je.",
            correctAnswer: "Ça va bien merci.",
            audioUrl: "/assets/exercises/video-exercise/ca-va-bien-merci.mp3",
            video: {
               pauseTime: 44.458,
            },
         },
         {
            id: 5,
            question: "Ben je hier met je ouders?",
            correctAnswer: "Tu es ici avec tes parents ?",
            audioUrl: "/assets/exercises/video-exercise/tu-es-ici-avec-tes-parents.mp3",
            video: {
               pauseTime: 49.417,
            },
         },
         {
            id: 6,
            question: "Zijn jullie hier geboren?",
            correctAnswer: "Vous êtes nés ici ?",
            audioUrl: "/assets/exercises/video-exercise/vous-etes-nes-ici.mp3",
            video: {
               pauseTime: 65.083,
            },
         },
         {
            id: 7,
            question: "Wow, ze zijn mooi!",
            correctAnswer: "Wow, elles sont belles.",
            audioUrl: "/assets/exercises/video-exercise/wow-elles-sont-belles.mp3",
            video: {
               pauseTime: 77.25,
            },
         },
         {
            id: 8,
            question: "Oh, ik moet gaan.",
            correctAnswer: "Oh, je dois partir.",
            audioUrl: "/assets/exercises/video-exercise/oh-je-dois-partir.mp3",
            video: {
               pauseTime: 82.25,
            },
         },
         {
            id: 9,
            question: "Tot ziens Charlie.",
            correctAnswer: "Au revoir Charlie.",
            audioUrl: "/assets/exercises/video-exercise/au-revoir-charlie.mp3",
            video: {
               pauseTime: 87.375,
            },
         },
      ],
   },
];

export default function handler(req, res) {
   try {
      if (req.method === "GET") {
         const { id } = req.query;
         console.log("Fetching Exprress-Yourself Exercise...");
         const exercise = express_yourself_exercise.find((exercise) => exercise.exercise_id === parseInt(id));
         res.status(200).json(exercise);
      } else {
         // Return an error message for unsupported HTTP methods
         console.error(`Unsupported HTTP method: ${req.method}`);
         res.status(405).json({ message: "Method not allowed" });
      }
   } catch (error) {
      // Return an error message for failed fetch requests
      console.error(error);
      res.status(500).json({
         message: "Failed to fetch express_yourself_exercise",
      });
   }
}
