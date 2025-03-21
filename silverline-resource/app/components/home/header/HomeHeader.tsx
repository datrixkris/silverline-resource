"use client";

import React, { useEffect, useState } from "react";
import NavBar from "../../generic/NavBar";
import CarouselIndicators from "./CarouselIndicators";
import MainSlide from "./MainSlide";
import SlideOne from "./SlideOne";
import SlideTwo from "./SlideTwo";
import { AnimatePresence } from "framer-motion";
import FadeInOut from "../../animations/FadeInOut";

const slides = [MainSlide, SlideOne, SlideTwo];

const HomeHeader = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % slides.length); // Loops back to 0
    }, 10000); // Runs every 8 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [index]);

  const SlideComponent = slides[index];

  return (
    <div className="relative">
      {/* navigation */}
      <NavBar type="white" />

      {/* header content */}
      <div className=" [@media(max-height:600px)]:h-[600px] h-dvh ">
        <AnimatePresence mode="sync">
          <FadeInOut key={index}>
            <SlideComponent />
          </FadeInOut>
        </AnimatePresence>
      </div>

      {/* carousel indicators */}
      <CarouselIndicators current={index} setCurrent={setIndex} />
    </div>
  );
};

export default HomeHeader;
