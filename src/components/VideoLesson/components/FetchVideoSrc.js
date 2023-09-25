const FetchVideoSrc = async () => {
	try {
		const res = await fetch('/api/video-src');
		const data = await res.json();
		return data;
	} catch (error) {
		console.error(error);
		throw new Error('Failed to fetch video source');
	}
};

export default FetchVideoSrc;
