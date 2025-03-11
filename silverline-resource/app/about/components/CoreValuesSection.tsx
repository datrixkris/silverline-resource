import ButtonTitle from "@/app/components/generic/ButtonTitle";
import React from "react";
import CoreValueCard, { ValuesCardProps } from "./CoreValueCard";
import ScaleNormal from "@/app/components/animations/ScaleNormal";
import FadeInUp from "@/app/components/animations/FadeInUp";
import StaggeredFadeUp from "@/app/components/animations/StaggeredFadeUp";

const values: ValuesCardProps[] = [
  {
    title: "Professionalism",
    description:
      "Compliance to safety, performing our duties according to ethical standards, effective communication and quality workmanship to set standards are what we stand for",
    icon: { src: "/icons/professionalism.svg", alt: "professionalism icon" },
  },
  {
    title: "Innovation",
    description:
      "Application of smart technologies, Building Information Modelling for detailed planning and durable materials improves our client relationship.",
    icon: { src: "/icons/innovation.svg", alt: "innovation icon" },
  },
  {
    title: "Integrity",
    description:
      "We maintain fairness, provide infrastructure that stands the test of time and we avoid behavior that would compromise on ethical standards of our clients or that of our institution",
    icon: { src: "/icons/integrity.svg", alt: "integrity icon" },
  },
  {
    title: "Creativity",
    description:
      "Fostering a culture of collaboration to share ideas, solve challenges and provide innovative designs and skills in execution are cherished at Silverline.",
    icon: { src: "/icons/creativity.svg", alt: "creativity icon" },
  },
  {
    title: "Accountability",
    description:
      "Ethics, accurate budgeting, spending and reporting with clear roles and responsibilities are values we adhere to.",
    icon: { src: "/icons/accountability.svg", alt: "accountability icon" },
  },
  {
    title: "Trust",
    description:
      "We maintain open and honest communication, high quality standards and responsiveness to our stakeholders.",
    icon: { src: "/icons/trust.svg", alt: "trust icon" },
  },
];

const CoreValuesSection = () => {
  return (
    <section className="space-y-16 maximum-width">
      {/* title button */}
      <div className="w-fit mx-auto">
        <ScaleNormal>
          <ButtonTitle text="Our core values" />
        </ScaleNormal>
      </div>

      {/* text */}
      <FadeInUp>
        <p className="mx-auto max-w-[890px] text-center">
          The following core values reflect our commitment to ethical conduct,
          client satisfaction, innovation, and professionalism in all aspects of
          our business operations. The following core values reflect our
          commitment to ethical conduct, client satisfaction, innovation, and
          professionalism in all aspects of our business operations.
        </p>
      </FadeInUp>

      {/* values */}
      <div className=" grid md:grid-cols-2 gap-5">
        {values.map((value, index) => (
          <StaggeredFadeUp key={index} index={index}>
            <CoreValueCard value={value} key={index} />
          </StaggeredFadeUp>
        ))}
      </div>
    </section>
  );
};

export default CoreValuesSection;
