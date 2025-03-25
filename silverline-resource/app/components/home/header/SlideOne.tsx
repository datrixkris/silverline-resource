import React from "react";
import { motion } from "framer-motion";
import { SlideData } from "./HomeHeader";

const SlideOne = ({ slideData }: { slideData: SlideData }) => {
  return (
    <header
      className={`bg-cover bg-center text-white absolute inset-0 w-full h-full`}
      style={{
        backgroundImage: slideData?.image
          ? `url(${slideData.image})`
          : "url('https://res.cloudinary.com/dnpiachdz/image/upload/v1741792329/home-banner-image2_zoc0bz.jpg')",
      }}
    >
      {/* overlay */}
      <div className="absolute inset-0 bg-black/30"></div>
      {/* content */}
      <div className="flex justify-center flex-col py-[200px] h-full maximum-width relative">
        <SequentialText text={slideData?.content} />
        {/* </div> */}
      </div>
    </header>
  );
};

export default SlideOne;

function SequentialText({ text }: { text: string | undefined }) {
  const words = text
    ? text
    : "Collaborative decision making in meeting client's objectives";

  return (
    <div className="space-y-8 max-w-[700px] [@media(min-height:600px)]:-translate-y-14">
      {/* Box Animation */}
      {/* <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="w-fit rounded-4xl px-8 py-1 font-bold border-3 border-local-primary"
      >
        Welcome to Silverline Resource Company Limited
      </motion.div> */}

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
        {words.split(" ").map((word, index) => (
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
