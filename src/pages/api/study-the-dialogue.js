const slides = [
	{
		exercise_id: 1,
		data: [
			{
				id: 1,
				slideNo: 1, // Added for the new version of the exercise
				video: {
					startTime: 0,
					pauseTime: 10,
				},
			},
			{
				id: 2,
				slideNo: 2, // Added for the new version of the exercise
				video: {
					startTime: 10,
					pauseTime: 20,
				},
			},
			{
				id: 3,
				slideNo: 3, // Added for the new version of the exercise
				video: {
					startTime: 20,
					pauseTime: 30,
				},
			},
			{
				id: 4,
				slideNo: 4, // Added for the new version of the exercise
				video: {
					startTime: 30,
					pauseTime: 40,
				},
			},
			{
				id: 5,
				slideNo: 5, // Added for the new version of the exercise
				video: {
					startTime: 40,
					pauseTime: 50,
				},
			},
			{
				id: 6,
				slideNo: 6, // Added for the new version of the exercise
				video: {
					startTime: 50,
					pauseTime: 60,
				},
			},
		],
	},
	{
		exercise_id: 2,
		data: [
			{
				id: 1,
				slideNo: 1, // Added for the new version of the exercise
				video: {
					startTime: 0,
					pauseTime: 5,
				},
			},
			{
				id: 2,
				slideNo: 2, // Added for the new version of the exercise
				video: {
					startTime: 5,
					pauseTime: 15,
				},
			},
			{
				id: 3,
				slideNo: 3, // Added for the new version of the exercise
				video: {
					startTime: 20,
					pauseTime: 20,
				},
			},
			{
				id: 4,
				slideNo: 4, // Added for the new version of the exercise
				video: {
					startTime: 30,
					pauseTime: 25,
				},
			},
			{
				id: 5,
				slideNo: 5, // Added for the new version of the exercise
				video: {
					startTime: 40,
					pauseTime: 30,
				},
			},
			{
				id: 6,
				slideNo: 6, // Added for the new version of the exercise
				video: {
					startTime: 50,
					pauseTime: 35,
				},
			},
		],
	},
	{
		exercise_id: 3,
		data: [
			{
				id: 1,
				slideNo: 1, // Added for the new version of the exercise
				video: {
					startTime: 0,
					pauseTime: 10,
				},
			},
			{
				id: 2,
				slideNo: 2, // Added for the new version of the exercise
				video: {
					startTime: 5,
					pauseTime: 15,
				},
			},
			{
				id: 3,
				slideNo: 3, // Added for the new version of the exercise
				video: {
					startTime: 20,
					pauseTime: 20,
				},
			},
			{
				id: 4,
				slideNo: 4, // Added for the new version of the exercise
				video: {
					startTime: 30,
					pauseTime: 25,
				},
			},
			{
				id: 5,
				slideNo: 5, // Added for the new version of the exercise
				video: {
					startTime: 40,
					pauseTime: 30,
				},
			},
			{
				id: 6,
				slideNo: 6, // Added for the new version of the exercise
				video: {
					startTime: 50,
					pauseTime: 35,
				},
			},
		],
	},
];
export default function handler(req, res) {
	try {
		if (req.method === 'GET') {
			console.log('Fetching Slides...');
			res.status(200).json(slides);
			console.log('Returning Slides as JSON...');
		} else {
			// Return an error message for unsupported HTTP methods
			console.error(`Unsupported HTTP method: ${req.method}`);
			res.status(405).json({ message: 'Method not allowed' });
		}
	} catch (error) {
		// Return an error message for failed fetch requests
		console.error(error);
		res.status(500).json({ message: 'Failed to fetch slides' });
	}
}
