"use client";

import React from "react";
import { motion } from "framer-motion";

export default function StaggeredFadeUp({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const itemVariants = {
    hidden: { opacity: 0, y: 50 }, // Start invisible & lower
    visible: { opacity: 1, y: 0 }, // Fade in & move up
  };

  return (
    <div className="space-y-4">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }} // Trigger when 30% visible
        variants={itemVariants}
        transition={{ duration: 0.8, ease: "easeInOut", delay: index * 0.2 }} // Staggers only visible items
        className="h-full"
      >
        {children}
      </motion.div>
    </div>
  );
}
