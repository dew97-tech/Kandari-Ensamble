const visual_memory_game_data = [
   {
      id: 1,
      img: "/assets/exercises/memory-game/the_boy.jpg",
      img_data: "le garçon",
   },
   {
      id: 2,
      img: "/assets/exercises/memory-game/hi.jpg",
      img_data: "salut",
   },
   {
      id: 3,
      img: "/assets/exercises/memory-game/my_name_is.jpg",
      img_data: "je m’appelle",
   },
   {
      id: 4,
      img: "/assets/exercises/memory-game/it_is_going_well.jpg",
      img_data: "ça va bien",
   },
   {
      id: 5,
      img: "/assets/exercises/memory-game/the_parents.jpg",
      img_data: "les parents",
   },
   {
      id: 6,
      img: "/assets/exercises/memory-game/to_live.jpg",
      img_data: "habiter",
   },
   {
      id: 7,
      img: "/assets/exercises/memory-game/here.jpg",
      img_data: "ici",
   },
   {
      id: 8,
      img: "/assets/exercises/memory-game/To_leave.jpg",
      img_data: "partir",
   },
   {
      id: 9,
      img: "/assets/exercises/memory-game/good_bye.jpg",
      img_data: "au revoir",
   },
];

export default function handler(req, res) {
   res.status(200).json(visual_memory_game_data);
}
