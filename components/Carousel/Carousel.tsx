"use client";
import React from "react";
import { useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";

type Image = {
  id: number;
  name: string;
  image: string;
};

const Carousel = ({ images }: { images: Image[] }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = () => {
    setCurrentImage((prevImage) =>
      prevImage === images.length - 1 ? 0 : prevImage + 1
    );
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? images.length - 1 : prevImage - 1
    );
  };

  const router = useRouter();

  const handleChooseCharacter = () => {
    router.push("/explore");
  };

  return (
    <>
      <div className="flex items-center justify-center mt-20">
        <Image
          src={images[currentImage].image}
          alt={images[currentImage].name}
          width={400}
          height={600}
          className="rounded-lg shadow-md max-w-full h-auto"
        />
      </div>
      <div className="flex items-center justify-center space-x-10 mt-5">
        <Button text="Prev" onClick={handlePrev} />
        <Button text="Choose Character" onClick={handleChooseCharacter} />
        <Button text="Next" onClick={handleNext} />
      </div>
    </>
  );
};

export default Carousel;
