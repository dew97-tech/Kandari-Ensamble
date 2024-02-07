const translations = {
   "à plus": [
      { translation: "tot later", isCorrect: true },
      { translation: "wij gaan", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_1.mp3" },
   ],
   "ça va bien": [
      { translation: "het gaat goed", isCorrect: true },
      { translation: "het gaat slecht", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_2.mp3" },
   ],
   "je m'appelle": [
      { translation: "hij heet", isCorrect: false },
      { translation: "ik heet", isCorrect: true },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_3.mp3" },
   ],
   "au revoir": [
      { translation: "tot ziens", isCorrect: true },
      { translation: "hallo", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_4.mp3" },
   ],
   avec: [
      { translation: "met", isCorrect: true },
      { translation: "bij", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_5.mp3" },
   ],
   je: [
      { translation: "jij", isCorrect: false },
      { translation: "ik", isCorrect: true },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_6.mp3" },
   ],
   habiter: [
      { translation: "het huis", isCorrect: false },
      { translation: "wonen", isCorrect: true },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_7.mp3" },
   ],
   bien: [
      { translation: "goed", isCorrect: true },
      { translation: "slecht", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_8.mp3" },
   ],
   bonjour: [
      { translation: "hallo", isCorrect: true },
      { translation: "tot ziens", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_9.mp3" },
   ],
   comment: [
      { translation: "hoe", isCorrect: true },
      { translation: "wanneer", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_10.mp3" },
   ],
   coucou: [
      { translation: "hoi", isCorrect: true },
      { translation: "doei", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_11.mp3" },
   ],
   "des photos": [
      { translation: "foto's", isCorrect: true },
      { translation: "videos", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_12.mp3" },
   ],
   elles: [
      { translation: "zij", isCorrect: true },
      { translation: "hij", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_13.mp3" },
   ],
   elle: [
      { translation: "zij", isCorrect: true },
      { translation: "hij", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_14.mp3" },
   ],
   "elle est": [
      { translation: "zij is", isCorrect: true },
      { translation: "zij zijn", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_15.mp3" },
   ],
   ici: [
      { translation: "hier", isCorrect: true },
      { translation: "daar", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_16.mp3" },
   ],
   "je dois": [
      { translation: "ik moet", isCorrect: true },
      { translation: "ik wil", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_17.mp3" },
   ],
   "je suis": [
      { translation: "ik ben", isCorrect: true },
      { translation: "hij is", isCorrect: false },
      { audioUrl: "/assets/exercises/dictation-memory-game/audio_18.mp3" },
   ],
};

const translationKeys = Object.keys(translations);

const generateUniqueCorrectWords = (numWords, usedWords) => {
   const uniqueCorrectWords = [];
   while (uniqueCorrectWords.length < numWords && usedWords?.length < translationKeys?.length) {
      let key;
      do {
         key = translationKeys[Math.floor(Math.random() * translationKeys.length)];
      } while (usedWords.includes(key));
      usedWords.push(key);
      uniqueCorrectWords.push({
         correctWord: key,
         translation: translations[key].slice(0, -1).map((t) => ({
            // Exclude the last item
            text: t.translation,
            isCorrect: t.isCorrect,
         })),
         audioUrl: translations[key].find((t) => t.audioUrl)?.audioUrl || null, // Add condition here
      });
   }
   return uniqueCorrectWords;
};
function shuffleArray(array) {
   for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
   }
}

export default function handler(req, res) {
   try {
      if (req.method === "GET") {
         console.log("Fetching sentences...");
         let usedWords = [];
         const sentences = [];
         const numSequences = 6; // Specify the number of sequences you want to generate
         let wordsPerSequence = 3; // Starting with 3 words per sequence

         for (let i = 0; i < numSequences; i++) {
            if (usedWords.length + wordsPerSequence <= translationKeys.length) {
               const uniqueCorrectWords = generateUniqueCorrectWords(wordsPerSequence, usedWords);
               // Shuffle the translations array before pushing it into the sentences array
               uniqueCorrectWords.forEach((wordObj) => {
                  shuffleArray(wordObj.translation);
               });
               const words = uniqueCorrectWords.map((wordObj) => ({
                  word: wordObj.correctWord,
                  audioUrl: wordObj.audioUrl,
                  answer: wordObj.translation,
               }));
               sentences.push({
                  id: i + 1,
                  gameLanguage: "French",
                  words: words,
               });
               wordsPerSequence++; // Increase the number of words for the next sequence
            } else {
               console.log("Not enough unique words left to create a new sequence.");
               break; // Exit the loop if there aren't enough unique words left
            }
         }

         res.status(200).json(sentences);
         console.log("Returning sentences as JSON...");
      } else {
         console.error(`Unsupported HTTP method: ${req.method}`);
         res.status(405).json({ message: "Method not allowed" });
      }
   } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Failed to fetch sentences" });
   }
}

// Saved for Future Reference
// export default function handler(req, res) {
//    try {
//       if (req.method === "GET") {
//          console.log("Fetching sentences...");
//          let usedWords = [];
//          const sentences = [];
//          const numSequences = 5; // Specify the number of sequences you want to generate
//          let wordsPerSequence = 3; // Starting with 3 words per sequence

//          for (let i = 0; i < numSequences; i++) {
//             if (usedWords.length + wordsPerSequence <= translationKeys.length) {
//                const uniqueCorrectWords = generateUniqueCorrectWords(wordsPerSequence, usedWords);
//                const words = uniqueCorrectWords.map((wordObj) => ({
//                   word: wordObj.correctWord,
//                   audioUrl: `/assets/audio/audio_${translationKeys.indexOf(wordObj.correctWord) + 1}.mp3`,
//                   answer: wordObj.translation,
//                }));
//                sentences.push({
//                   id: i + 1,
//                   gameLanguage: "French",
//                   words: words,
//                });
//                wordsPerSequence++; // Increase the number of words for the next sequence
//             } else {
//                console.log("Not enough unique words left to create a new sequence.");
//                break; // Exit the loop if there aren't enough unique words left
//             }
//          }

//          res.status(200).json(sentences);
//          console.log("Returning sentences as JSON...");
//       } else {
//          console.error(`Unsupported HTTP method: ${req.method}`);
//          res.status(405).json({ message: "Method not allowed" });
//       }
//    } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: "Failed to fetch sentences" });
//    }
// }
