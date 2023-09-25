const questions = [
	{
		id: 1,
		question: 'Hoi, ik heet Charlie.',
		options: [
			{ id: '1A', text: 'Salut, je m`appelle Charlie.' },
			{ id: '1B', text: 'Salut, j`appelle Charlie.' },
		],
		correctOptionId: '1A',
		video: {
            pauseTime:10
        }
	},
	{
		id: 2,
		question: 'Het gaat goed met me, dank je !',
		options: [
			{ id: '2A', text: 'Je vas bien, merci !' },
			{ id: '2B', text: 'Je vais bien, merci !' },
		],
		correctOptionId: '2B',
		video: {
            pauseTime:20
        }
	},
	{
		id: 3,
		question: 'En jij, hoe gaat het ?',
		options: [
			{ id: '3A', text: 'Et tu, ça va ?' },
			{ id: '3B', text: 'Et toi, ça va ?' },
		],
		correctOptionId: '3B',
		video: {
            pauseTime:30
        }
	},
	{
		id: 4,
		question: 'Ja, we wonen hier.',
		options: [
			{ id: '4A', text: 'Oui, nous habitons ici.' },
			{ id: '4B', text: 'Oui, vous habitons ici.' },
		],
		correctOptionId: '4A',
		video: {
            pauseTime:40
        }
	},
	{
		id: 5,
		question: 'We zijn Marandais!',
		options: [
			{ id: '5A', text: 'Nous êtes Marandais !' },
			{ id: '5B', text: 'Nous sommes Marandais !' },
		],
		correctOptionId: '5B',
		video: {
            pauseTime:50
        }
	},
	{
		id: 6,
		question: 'Ja! Kijk, hier zijn foto`s van Marans.',
		options: [
			{ id: '6A', text: 'Oui ! Regarde, voir des photos de Marans.' },
			{ id: '6B', text: 'Oui ! Regarde, voici des photos de Marans.' },
		],
		correctOptionId: '6B',
		video: {
            pauseTime:60
        }
	},
	{
		id: 7,
		question: 'Tot later!',
		options: [
			{ id: '7A', text: 'A plus !' },
			{ id: '7B', text: 'Au plus !' },
		],
		correctOptionId: '7A',
		video: {
            pauseTime:70
        }
	}
	// Add more questions here...
];

export default function handler(req, res) {
	try {
		if (req.method === 'GET') {
			console.log('Fetching Role-Play Exercise...');
			res.status(200).json(questions);
			console.log('Returning Role-Play Exercise as JSON...');
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
