"use client";
import React from "react";
import Image from "next/image";
import FadeInUp from "../animations/FadeInUp";
import AnimatedCounter from "../animations/AnimatedCounter";
import { motion } from "framer-motion";

const BuildingTrust = () => {
  return (
    <section className="min-[900px]:flex-row flex-col flex gap-10 items-center ">
      {/* images */}
      <div className="min-[900px]:w-[55%] flex gap-5 relative pb-[180px]">
        <motion.div
          initial={{ y: -80 }} // Starts lower (no opacity change)
          whileInView={{ y: 0 }} // Moves up sharply
          viewport={{ once: true, amount: 0.3 }} // Triggers when 30% is visible
          transition={{
            delay: 1, // 1s delay before animation starts
            duration: 0.3, // Fast animation
            ease: [0.25, 1, 0.5, 1], // Snappy, brittle easing
          }}
          className="w-1/2 relative top-[140px] md:top-[180px] overflow-clip  rounded-[20px] h-[500px] md:h-[700px]"
        >
          <Image
            src="https://res.cloudinary.com/dnpiachdz/image/upload/v1741792113/building-trust-1_hvjpr6.png"
            alt="core values image"
            width={350}
            height={700}
            className="size-full object-cover"
          />
        </motion.div>
        <motion.div
          initial={{ y: 120 }} // Starts lower (no opacity change)
          whileInView={{ y: 0 }} // Moves up sharply
          viewport={{ once: true, amount: 0.3 }} // Triggers when 30% is visible
          transition={{
            delay: 1, // 1s delay before animation starts
            duration: 0.3, // Fast animation
            ease: [0.25, 1, 0.5, 1], // Snappy, brittle easing
          }}
          className="w-1/2 overflow-clip rounded-[20px] h-[500px] md:h-[700px]"
        >
          <Image
            src="https://res.cloudinary.com/dnpiachdz/image/upload/v1741792113/building-trust-2_colbsq.png"
            alt="core values image"
            width={350}
            height={700}
            className="size-full object-cover"
          />
        </motion.div>
      </div>
      {/* content */}
      <div className="min-[900px]:w-[45%] space-y-8 text-center">
        <FadeInUp>
          <h3 className="title-local-secondary text-4xl ">
            Decades of building trust, brick by brick
          </h3>
        </FadeInUp>

        <FadeInUp>
          <p className="">
            For the Decades of Building trust Brick by Brick, Let us change it
            to your Trusted Partner. Silverline has provided trusted
            construction service, time and again in the area of Transportation,
            Health, Sports, Domestic and Commercial Dwelling as well as other
            infrastructural development. We stand by guiding principles and
            values as we deliver exceptional services to our clients.
          </p>
        </FadeInUp>

        <FadeInUp>
          <div className="w-fit mx-auto">
            <h3 className="text-4xl title-local-primary">
              <AnimatedCounter />
              K+
            </h3>

            <p className="">Beneficiaries and counting</p>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
};

export default BuildingTrust;
