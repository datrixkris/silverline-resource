"use client";
import { motion, useScroll, useTransform } from "framer-motion";

export default function FadeUpOnScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const { scrollYProgress } = useScroll(); // Track scroll position

  // Map scroll progress to opacity and translateY
  const opacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const translateY = useTransform(scrollYProgress, [0.2, 0.5], [0, 0]);

  return (
    <motion.div
      style={{ opacity, y: translateY }} // Bind scroll-based animations
      className=""
    >
      {children}
    </motion.div>
  );
}
