"use client";

import React from "react";
import { motion } from "framer-motion";

const FadeInOut = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }} // Starts faded & slightly small
      animate={{ opacity: 1 }} // Fully visible & normal size
      exit={{ opacity: 0 }} // Fades out & slightly expands
      transition={{ duration: 1.5, ease: "easeInOut" }} // Smooth transition
      className=""
    >
      {children}
    </motion.div>
  );
};

export default FadeInOut;
