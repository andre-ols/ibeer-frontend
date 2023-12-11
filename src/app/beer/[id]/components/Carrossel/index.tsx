"use client";

import Image from "next/image";
import { FC, useState } from "react";

type CarouselProps = {
  images: string[];
};

export const Carousel: FC<CarouselProps> = ({ images }) => {
  console.log(images);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <div className="relative w-[500px] h-[500px] rounded-3xl overflow-hidden">
      {images.map((image, index) => (
        <Image
          key={index}
          src={images[currentIndex]}
          alt={`Slide ${currentIndex + 1}`}
          width={500}
          height={500}
          priority
          className={"absolute top-0 left-0 w-full h-full object-cover"}
        />
      ))}

      <button
        onClick={goToPrev}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        &#8249;
      </button>
      <button
        onClick={goToNext}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
      >
        &#8250;
      </button>
    </div>
  );
};
