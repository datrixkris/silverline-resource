"use client";

import React from "react";
import { motion } from "framer-motion";

const ScaleNormal = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }} // Start small & transparent
      whileInView={{ scale: 1, opacity: 1 }} // Animate when in view
      transition={{ duration: 0.8, ease: "easeInOut" }} // Smooth effect
      viewport={{ once: true, amount: 0.2 }} // Triggers when 20% visible
      className=""
    >
      {children}
    </motion.div>
  );
};

export default ScaleNormal;
