"use client";

import React from "react";
import { motion } from "framer-motion";

const FadeInUp = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }} // Start small & transparent
      whileInView={{ y: 0, opacity: 1 }} // Animate when in view
      transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth effect
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% visible
      className=""
    >
      {children}
    </motion.div>
  );
};

export default FadeInUp;
