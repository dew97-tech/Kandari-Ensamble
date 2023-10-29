const memory_game_data = [
	{
		id: 1,
		gameLanguage: 'English',
		wantToLearn: 'French',
		guessedWord: 'le garçon',
		translation: {
			dutch: 'de jongen',
			english: 'the boy',
		},
		img: '/assets/exercises/memory-game/the_boy.jpg',
		no_img: '/assets/img/blur_img.jpg',
		audioUrl: '/assets/audio/sample_1.mp3',

		ct_color: 'c-color-green',
		cn_color: 'c-color-red',
	},
	{
		id: 2,
		gameLanguage: 'English',
		wantToLearn: 'French',
		guessedWord: 'salut',
		translation: {
			dutch: 'hoi',
			english: 'hi',
		},
		img: '/assets/exercises/memory-game/hi.jpg',
		no_img: '/assets/img/blur_img.jpg',
		audioUrl: '/assets/audio/sample_2.mp3',

		ct_color: 'c-color-green',
		cn_color: 'c-color-red',
	},
	{
		id: 3,
		gameLanguage: 'English',
		wantToLearn: 'French',
		guessedWord: 'je m’appelle',
		translation: {
			dutch: 'ik heet',
			english: 'my name is',
		},
		img: '/assets/exercises/memory-game/my_name_is.jpg',
		no_img: '/assets/img/blur_img.jpg',
		audioUrl: '/assets/audio/sample_3.mp3',

		ct_color: 'c-color-green',
		cn_color: 'c-color-red',
	},
	{
		id: 4,
		gameLanguage: 'English',
		wantToLearn: 'French',
		guessedWord: 'ça va bien',
		translation: {
			dutch: 'het gaat goed',
			english: 'it is going well',
		},
		img: '/assets/exercises/memory-game/it_is_going_well.jpg',
		no_img: '/assets/img/blur_img.jpg',
		audioUrl: '/assets/audio/sample_4.mp3',

		ct_color: 'c-color-green',
		cn_color: 'c-color-red',
	},
	{
		id: 5,
		gameLanguage: 'English',
		wantToLearn: 'French',
		guessedWord: 'les parents',
		translation: {
			dutch: 'de ouders',
			english: 'the parents',
		},
		img: '/assets/exercises/memory-game/the_parents.jpg',
		no_img: '/assets/img/blur_img.jpg',
		audioUrl: '/assets/audio/sample_5.mp3',

		ct_color: 'c-color-green',
		cn_color: 'c-color-red',
	},
	{
		id: 6,
		gameLanguage: 'English',
		wantToLearn: 'French',
		guessedWord: 'habiter',
		translation: {
			dutch: 'wonen',
			english: 'to live',
		},
		img: '/assets/exercises/memory-game/to_live.jpg',
		no_img: '/assets/img/blur_img.jpg',
		audioUrl: '/assets/audio/sample_6.mp3',

		ct_color: 'c-color-green',
		cn_color: 'c-color-red',
	},
	{
		id: 7,
		gameLanguage: 'English',
		wantToLearn: 'French',
		guessedWord: 'ici',
		translation: {
			dutch: 'hier',
			english: 'here',
		},
		img: '/assets/exercises/memory-game/here.jpg',
		no_img: '/assets/img/blur_img.jpg',
		audioUrl: '/assets/audio/sample_3.mp3',

		ct_color: 'c-color-green',
		cn_color: 'c-color-red',
	},
	{
		id: 8,
		gameLanguage: 'English',
		wantToLearn: 'French',
		guessedWord: 'partir',
		translation: {
			dutch: 'vertrekken',
			english: 'to leave',
		},
		img: '/assets/exercises/memory-game/to_leave.jpg',
		no_img: '/assets/img/blur_img.jpg',
		audioUrl: '/assets/audio/sample_3.mp3',

		ct_color: 'c-color-green',
		cn_color: 'c-color-red',
	},
	{
		id: 9,
		gameLanguage: 'English',
		wantToLearn: 'French',
		guessedWord: 'au revoir',
		translation: {
			dutch: 'tot ziens',
			english: 'goodbye',
		},
		img: '/assets/exercises/memory-game/good_bye.jpg',
		no_img: '/assets/img/blur_img.jpg',
		audioUrl: '/assets/audio/sample_5.mp3',

		ct_color: 'c-color-green',
		cn_color: 'c-color-red',
	},
];

export default function handler(req, res) {
	try {
		if (req.method === 'GET') {
			console.log('Fetching MemoryGameData...');
			res.status(200).json(memory_game_data);
			console.log('Returning MemoryGameData as JSON...');
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
