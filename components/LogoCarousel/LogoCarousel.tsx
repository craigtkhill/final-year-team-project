import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import styles from "./LogoCarousel.module.css";

const LogoCarousel: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth >= 768); // Adjust the breakpoint as needed
    };

    handleResize(); // Call the function initially to set the initial state

    window.addEventListener("resize", handleResize); // Listen for window resize events

    return () => {
      window.removeEventListener("resize", handleResize); // Clean up the event listener
    };
  }, []);

  return (
    <div className={`w-full overflow-hidden ${styles.carouselWrapper}`}>
      {isMobile ? (
        <div className="flex flex-wrap justify-center space-x-24">
          <div className="relative w-[150px] h-[100px]">
            <Image
              src="/logos/applied-psychology-logo.png"
              fill
              style={{ objectFit: "contain" }}
              alt="UCC Applied Psychology Logo"
            />
          </div>
          <div className="relative w-[150px] h-[100px]">
            <Image
              src="/logos/ucc-logo.png"
              fill
              style={{ objectFit: "contain" }}
              alt="University College Cork Logo"
            />
          </div>
          <div className="relative w-[100px] h-[100px]">
            <Image
              src="/logos/behaviair-logo.png"
              fill
              style={{ objectFit: "contain" }}
              alt="BehaviAir Logo"
            />
          </div>
        </div>
      ) : (
        <Swiper
          modules={[Autoplay]}
          spaceBetween={-150}
          slidesPerView="auto"
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
            pauseOnMouseEnter: false,
          }}
          speed={5000}
          loop={true}
        >
          <SwiperSlide className="flex justify-center items-center">
            <div className="relative w-[150px] h-[100px]">
              <Image
                src="/logos/applied-psychology-logo.png"
                fill
                style={{ objectFit: "contain" }}
                alt="UCC Applied Psychology Logo"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center">
            <div className="relative w-[150px] h-[100px]">
              <Image
                src="/logos/ucc-logo.png"
                fill
                style={{ objectFit: "contain" }}
                alt="University College Cork Logo"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide className="flex justify-center items-center">
            <div className="relative w-[100px] h-[100px]">
              <Image
                src="/logos/behaviair-logo.png"
                fill
                style={{ objectFit: "contain" }}
                alt="BehaviAir Logo"
              />
            </div>
          </SwiperSlide>
        </Swiper>
      )}
    </div>
  );
};

export default LogoCarousel;
