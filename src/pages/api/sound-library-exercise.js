const questions = [
	{
		lesson: 1,
		dutchWord: 'een jongen',
		frenchTranslation: 'un garçon',
	},
	{
		lesson: 1,
		dutchWord: 'tot ziens',
		frenchTranslation: 'au revoir',
	},
	{
		lesson: 1,
		dutchWord: 'het gaat',
		frenchTranslation: 'ça va',
	},
	{
		lesson: 1,
		dutchWord: 'goed',
		frenchTranslation: 'bien',
	},
	{
		lesson: 1,
		dutchWord: 'hoe',
		frenchTranslation: 'comment',
	},
	{
		lesson: 1,
		dutchWord: 'hier',
		frenchTranslation: 'ici',
	},
	{
		lesson: 1,
		dutchWord: 'wonen',
		frenchTranslation: 'habiter',
	},
	// Add more questions and translations here
];
export default function handler(req, res) {
	try {
		if (req.method === 'GET') {
			console.log('Fetching Sound Library Exercise questions...');
			res.status(200).json(questions);
			console.log('Returning Sound Library Exercise questions as JSON...');
		} else {
			// Return an error message for unsupported HTTP methods
			console.error(`Unsupported HTTP method: ${req.method}`);
			res.status(405).json({ message: 'Method not allowed' });
		}
	} catch (error) {
		// Return an error message for failed fetch requests
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch questions' });
	}
}
