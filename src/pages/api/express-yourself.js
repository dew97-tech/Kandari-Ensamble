const express_yourself_exercise = [
	{
		exercise_id: 1,
		data: [
			{
				id: 1,
				question: 'Hoi, ik heet Charlie.',
				correctAnswer: 'Salut, je m`appelle Charlie.',
				video: {
					pauseTime: 10,
				},
			},
			{
				id: 2,
				question: 'Het gaat goed met me, dank je !',
				correctAnswer: 'Je vais bien, merci !',
				video: {
					pauseTime: 20,
				},
			},
			{
				id: 3,
				question: 'En jij, hoe gaat het ?',
				correctAnswer: 'Et toi, ça va ?',
				video: {
					pauseTime: 30,
				},
			},
			{
				id: 4,
				question: 'Ja, we wonen hier.',
				correctAnswer: 'Oui, nous habitons ici.',
				video: {
					pauseTime: 40,
				},
			},
			{
				id: 5,
				question: 'We zijn Marandais!',
				correctAnswer: 'Nous sommes Marandais !',
				video: {
					pauseTime: 50,
				},
			},
			{
				id: 6,
				question: 'Ja! Kijk, hier zijn foto`s van Marans.',
				correctAnswer: 'Oui ! Regarde, voici des photos de Marans.',
				video: {
					pauseTime: 60,
				},
			},
			{
				id: 7,
				question: 'Tot later!',
				correctAnswer: 'A plus !',
				video: {
					pauseTime: 70,
				},
			},
		],
	},
];

export default function handler(req, res) {
	try {
		if (req.method === 'GET') {
			console.log('Fetching Exprress-Yourself Exercise...');
			res.status(200).json(express_yourself_exercise);
			console.log('Returning Exprress-Yourself Exercise as JSON...');
		} else {
			// Return an error message for unsupported HTTP methods
			console.error(`Unsupported HTTP method: ${req.method}`);
			res.status(405).json({ message: 'Method not allowed' });
		}
	} catch (error) {
		// Return an error message for failed fetch requests
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch express_yourself_exercise' });
	}
}
