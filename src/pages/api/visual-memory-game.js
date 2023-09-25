const visual_memory_game_data = [
    {
        id: 1,
        img: '/assets/img/square/square_5.png',
    },
    {
        id: 2,
        img: '/assets/img/square/square_5.png',
    },
    {
        id: 3,
        img: '/assets/img/square/square_5.png',
    },
    {
        id: 4,
        img: '/assets/img/square/square_5.png',
    },
    {
        id: 5,
        img: '/assets/img/square/square_5.png',
    },
    {
        id: 6,
        img: '/assets/img/square/square_5.png',
    },
    {
        id: 7,
        img: '/assets/img/square/square_5.png',
    },
    {
        id: 8,
        img: '/assets/img/square/square_5.png',
    },
    {
        id: 9,
        img: '/assets/img/square/square_5.png',
    },
];

export default function handler(req, res) {
    res.status(200).json(visual_memory_game_data);
}
