import Carousel from "@/components/Carousel/Carousel";

const characters = [
  "/characters/char1.png",
  "/characters/char2.png",
  "/characters/char3.png",
  "/characters/char4.png",
  "/characters/char5.png",
  "/characters/char6.png",
  "/characters/char7.png",
  "/characters/char8.png",
];

export default function Character() {
  return (
    <div className="max-w-lg">
      <Carousel imagePaths={characters} />
    </div>
  );
}
