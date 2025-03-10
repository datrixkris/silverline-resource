"use client";

import React from "react";
import NavBar from "../generic/NavBar";
import { motion } from "framer-motion";

const HomeHeader = () => {
  return (
    <>
      {/* navigation */}
      <NavBar type="white" />

      {/* header content */}
      <header className="bg-[url('/images/home-banner-image.png')] [@media(max-height:600px)]:h-[600px] h-dvh bg-cover text-white ">
        {/* content */}
        <div className="flex justify-center flex-col py-[200px] h-full maximum-width relative">
          {/* texts */}
          {/* <div className="space-y-8 max-w-[700px] [@media(min-height:600px)]:-translate-y-14"> */}
          {/* <motion.div
              initial={{ scale: 0, opacity: 0 }} // Start from invisible and small
              animate={{ scale: 1, opacity: 1 }} // Animate to full size
              transition={{
                duration: 1, // Smooth transition duration
                ease: "easeInOut", // Smooth and steady effect
              }}
              className="w-fit rounded-4xl px-8 py-1 font-bold border-3 border-primary"
            >
              Welcome to Silverline Resource Company Limited
            </motion.div>

            <h2 className="font-bold text-4xl">
              Where Building Dreams is Not Just a Job, It&apos;s Our Passion
            </h2> */}
          <SequentialText />
          {/* </div> */}

          {/* carousel indicators */}
          <div className="flex items-center justify-center gap-5 absolute bottom-20 left-1/2 -translate-x-1/2">
            <div className="size-5 rounded-full bg-primary"></div>
            <div className="size-5 rounded-full bg-secondary"></div>
            <div className="size-5 rounded-full bg-secondary"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;

function SequentialText() {
  const words = [
    "Where",
    "Building",
    "Dreams",
    "is",
    "Not",
    "Just",
    "a",
    "Job,",
    "It's",
    "Our",
    "Passion",
  ];

  return (
    <div className="space-y-8 max-w-[700px] [@media(min-height:600px)]:-translate-y-14">
      {/* Box Animation */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="w-fit rounded-4xl px-8 py-1 font-bold border-3 border-primary"
      >
        Welcome to Silverline Resource Company Limited
      </motion.div>

      {/* Text Animation (Appears word by word) */}
      <motion.h2
        initial="hidden"
        animate="visible"
        variants={{
          visible: {
            transition: {
              delayChildren: 1, // ⏳ Waits 5 seconds before starting
              staggerChildren: 0.2, // Each word appears with delay
            },
          }, // Each word appears with delay
        }}
        className="font-bold text-4xl"
      >
        {words.map((word, index) => (
          <motion.span
            key={index}
            variants={{
              hidden: { opacity: 0, y: 15 },
              visible: { opacity: 1, y: 0 },
            }}
            transition={{ duration: 0.9 }}
            className="inline-block mr-2"
          >
            {word}
          </motion.span>
        ))}
      </motion.h2>
    </div>
  );
}
