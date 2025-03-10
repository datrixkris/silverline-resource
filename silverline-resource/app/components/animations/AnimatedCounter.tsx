"use client";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useState } from "react";

export default function AnimatedCounter() {
  const [count, setCount] = useState(1);
  const motionValue = useMotionValue(1);
  const rounded = useTransform(motionValue, (latest) => Math.floor(latest));

  const startAnimation = () => {
    animate(motionValue, 200, {
      duration: 2, // 5s duration
      ease: "linear", // Prevents slow-down at 199
    });
  };

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => setCount(v));
    return () => unsubscribe();
  }, [rounded]);

  return (
    <motion.span
      className=""
      whileInView={{ opacity: 1 }} // Ensure it runs only when in view
      viewport={{ once: true }} // Runs only once when it enters the viewport
      onViewportEnter={startAnimation} // Triggers animation when in view
    >
      {count}
    </motion.span>
  );
}
