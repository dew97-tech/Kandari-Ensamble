
const sentences = [
    {
        id: 1,
        gameLanguage: 'French',
        // sentenceToSpeech: 'tu',
        words: [
            { word: 'tu', audioUrl: '/assets/audio/audio_1.mp3', answer: 'oui' },
            { word: 'route', audioUrl: '/assets/audio/audio_4.mp3', answer: 'non' },
            { word: 'bureau', audioUrl: '/assets/audio/audio_6.mp3', answer: 'non' },
        ],
    },
    {
        id: 2,
        gameLanguage: 'French',
        // sentenceToSpeech: 'garçon',
        words: [
            { word: 'garçon', audioUrl: '/assets/audio/audio_1.mp3', answer: 'oui' },
            { word: 'super', audioUrl: '/assets/audio/audio_3.mp3', answer: 'non' },
            { word: 'je', audioUrl: '/assets/audio/audio_4.mp3', answer: 'oui' },
            { word: 'douche', audioUrl: '/assets/audio/audio_5.mp3', answer: 'non' },
        ],
    },
    {
        id: 3,
        gameLanguage: 'French',
        sentenceToSpeech: 'parents',
        words: [
            { word: 'parents', audioUrl: '/assets/audio/audio_1.mp3', answer: 'oui' },
            { word: 'ici', audioUrl: '/assets/audio/audio_3.mp3', answer: 'oui' },
            { word: 'merci', audioUrl: '/assets/audio/audio_4.mp3', answer: 'oui' },
            { word: 'comment', audioUrl: '/assets/audio/audio_5.mp3', answer: 'oui' },
            { word: 'coucou', audioUrl: '/assets/audio/audio_6.mp3', answer: 'non' },
        ],
    },
    // {
    //     id: 4,
    //     gameLanguage: 'French',
    //     sentenceToSpeech: 'controle',
    //     words: [
    //         { word: 'controle', audioUrl: 'audio_url_controle' },
    //         { word: 'etui', audioUrl: 'audio_url_etui' },
    //         { word: 'suis', audioUrl: 'audio_url_suis' },
    //         { word: 'garage', audioUrl: 'audio_url_garage' },
    //         { word: 'vous', audioUrl: 'audio_url_vous' },
    //         { word: 'regarde', audioUrl: 'audio_url_regarde' },
    //     ],
    // },
    // {
    //     id: 5,
    //     gameLanguage: 'French',
    //     sentenceToSpeech: 'bonjour',
    //     words: [
    //         { word: 'bonjour', audioUrl: 'audio_url_bonjour' },
    //         { word: 'Sacha', audioUrl: 'audio_url_sacha' },
    //         { word: 'café', audioUrl: 'audio_url_café' },
    //         { word: 'bien', audioUrl: 'audio_url_bien' },
    //         { word: 'etalage', audioUrl: 'audio_url_etalage' },
    //         { word: 'es', audioUrl: 'audio_url_es' },
    //     ],
    // },
    // {
    //     id: 6,
    //     gameLanguage: 'French',
    //     sentenceToSpeech: 'avec',
    //     words: [
    //         { word: 'avec', audioUrl: 'audio_url_avec' },
    //         { word: 'chef', audioUrl: 'audio_url_chef' },
    //         { word: 'finale', audioUrl: 'audio_url_finale' },
    //         { word: 'est', audioUrl: 'audio_url_est' },
    //         { word: 'crème', audioUrl: 'audio_url_crème' },
    //         { word: 'Charlie', audioUrl: 'audio_url_charlie' },
    //         { word: 'rencontre', audioUrl: 'audio_url_rencontre' },
    //     ],
    // },
    // {
    //     id: 7,
    //     gameLanguage: 'French',
    //     sentenceToSpeech: 'brochure',
    //     words: [
    //         { word: 'brochure', audioUrl: 'audio_url_brochure' },
    //         { word: 'photos', audioUrl: 'audio_url_photos' },
    //         { word: 'ambulance', audioUrl: 'audio_url_ambulance' },
    //         { word: 'voici', audioUrl: 'audio_url_voici' },
    //         { word: 'horloge', audioUrl: 'audio_url_horloge' },
    //         { word: 'actrice', audioUrl: 'audio_url_actrice' },
    //         { word: 'au revoir', audioUrl: 'audio_url_au_revoir' },
    //         { word: 'bien', audioUrl: 'audio_url_bien' },
    //         { word: 'elle', audioUrl: 'audio_url_elle' },
    //     ],
    // },
];

export default function handler(req, res) {
    try {
        if (req.method === 'GET') {
            console.log('Fetching sentences...');
            res.status(200).json(sentences);
            console.log('Returning sentences as JSON...');
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
