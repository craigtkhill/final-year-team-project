import Carousel from "@/components/Carousel/Carousel";

// fetch the images using an api

const characters = [
  {
    id: 1,
    name: "Rick",
    image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
  },
  {
    id: 2,
    name: "Morty",
    image: "https://rickandmortyapi.com/api/character/avatar/2.jpeg",
  },
  {
    id: 3,
    name: "Summer",
    image: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
  },
  {
    id: 4,
    name: "Beth",
    image: "https://rickandmortyapi.com/api/character/avatar/4.jpeg",
  },
  {
    id: 5,
    name: "Jerry",
    image: "https://rickandmortyapi.com/api/character/avatar/5.jpeg",
  },
];

export default function Character() {
  return (
    <div className="max-w-lg">
      <Carousel images={characters} />
    </div>
  );
}
