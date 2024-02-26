"use client";
import React, { useState } from "react";
import Image from "next/image";
import Button from "../Button";
import { useRouter } from "next/navigation";
import Modal from "./Modal";
import { useCharacterStore } from "@/utils/store";

const Carousel = ({ imagePaths }: { imagePaths: string[] }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const setSelectedImagePath = useCharacterStore(
    (state) => state.setSelectedImagePath
  );

  const handleNext = () => {
    setCurrentImage((prevImage) =>
      prevImage === imagePaths.length - 1 ? 0 : prevImage + 1
    );
  };

  const handlePrev = () => {
    setCurrentImage((prevImage) =>
      prevImage === 0 ? imagePaths.length - 1 : prevImage - 1
    );
  };

  const handleChooseCharacter = () => {
    setShowModal(true);
  };

  const handleYesClick = () => {
    setSelectedImagePath(imagePaths[currentImage]);
    router.push(`/location`);
  };

  const handleNoClick = () => {
    setShowModal(false);
  };

  const imageTransitionStyle = {
    transition: "transform 0.5s ease-in-out",
    transform: `translateX(${currentImage * -100}%)`,
  };

  return (
    <div className="relative flex flex-col items-center justify-center mt-20">
      {/* Carousel controls and images */}
      <div className="flex items-center justify-between w-full max-w-3xl">
        <Button onClick={handlePrev} bgColor="#55ac78">
          &#x2190;
        </Button>
        <div className="overflow-hidden flex justify-center w-full">
          <div className="flex w-full" style={imageTransitionStyle}>
            {imagePaths.map((path, index) => (
              <div
                className="flex-shrink-0 w-full flex justify-center"
                key={index}
              >
                <Image
                  src={path}
                  alt={`Character ${index + 1}`}
                  width={150}
                  height={300}
                  className="rounded-lg shadow-md max-w-full h-auto"
                  fill={false}
                />
              </div>
            ))}
          </div>
        </div>
        <Button onClick={handleNext} bgColor="#55ac78">
          &#x2192;
        </Button>
      </div>
      <div className="mt-4">
        <Button onClick={handleChooseCharacter} bgColor="#55ac78" className="circle-button">
          Choose Character
        </Button>
      </div>
      <Modal
        imagePath={imagePaths[currentImage]}
        onYesClick={handleYesClick}
        onNoClick={handleNoClick}
        show={showModal}
      />
    </div>
  );
};

export default Carousel;
