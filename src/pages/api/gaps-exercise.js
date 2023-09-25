const sentences = [
    {
        id: 1,
        hintSentence: 'Sacha is sympatiek.',
        question: 'Sacha ___ sympathique.',
        options: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
        correctAns: 'est',
        video: {
			pauseTime: 6,
		},
    },
    {
        id: 2,
        hintSentence: ' Hallo, ik ben Louisa.',
        question: 'Bonjour, je ___ Louisa.',
        options: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
        correctAns: 'suis',
        video: {
			pauseTime: 16.750,
		},
    },
    {
        id: 3,
        hintSentence: 'Ben je hier met je ouders?',
        question: 'Tu ___ ici avec tes parents ?',
        options: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
        correctAns: 'es',
        video: {
			pauseTime: 49.417,
		},
    },
    {
        id: 4,
        hintSentence: 'Wij zijn Marandais!',
        question: 'Nous ___ Marandais !',
        options: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
        correctAns: 'sommes',
        video: {
			pauseTime: 60.48,
		},
    },
    {
        id: 5,
        hintSentence: 'Zijn jullie hier geboren?',
        question: 'Vous ___ nés ici?',
        options: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
        correctAns: 'êtes',
        video: {
			pauseTime: 60.50,
		},
    },
    {
        id: 6,
        hintSentence: 'Wow, ze zijn mooi!',
        question: 'Wow, elles ___ belles!',
        options: ['suis', 'es', 'est', 'sommes', 'êtes', 'sont'],
        correctAns: 'sont',
        video: {
			pauseTime: 70.35,
		},
    },
];
export default function handler(req, res) {
    try {
        if (req.method === 'GET') {
            console.log('Fetching Gap-Exercise...');
            res.status(200).json(sentences);
            console.log('Returning Gap-Exercise as JSON...');
        } else {
            // Return an error message for unsupported HTTP methods
            console.error(`Unsupported HTTP method: ${req.method}`);
            res.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        // Return an error message for failed fetch requests
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch sentences' });
    }
}
