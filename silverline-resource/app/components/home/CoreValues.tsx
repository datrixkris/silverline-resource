import Image from "next/image";
import React from "react";
import FadeIn from "../animations/FadeIn";
import StaggeredFadeUp from "../animations/StaggeredFadeUp";

const values: ValuesCardProps[] = [
  {
    title: "PROFESSIONALISM",
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
    title: "CREATIVITY",
    description:
      "Fostering a culture of collaboration to share ideas, solve challenges and provide innovative designs and skills in execution are cherished at Silverline.",
    icon: { src: "/icons/creativity.svg", alt: "creativity icon" },
  },
];

const CoreValues = () => {
  return (
    <section className="flex gap-10">
      {/* image */}
      <div className="w-[45%] aspect-square hidden lg:block overflow-clip rounded-3xl">
        <FadeIn>
          <Image
            src="https://res.cloudinary.com/dnpiachdz/image/upload/v1741792117/values-image_uromxk.png"
            alt="core values image"
            width={500}
            height={500}
            className="size-full object-cover"
          />
        </FadeIn>
      </div>

      <div className="lg:w-[55%]">
        <div className="grid sm:grid-cols-2 gap-8">
          {values.map((value, index) => (
            <StaggeredFadeUp index={index} key={index}>
              <ValuesCard value={value} key={index} />
            </StaggeredFadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValues;

export interface ValuesCardProps {
  title: string;
  description: string;
  icon: { src: string; alt: string };
}

const ValuesCard = ({ value }: { value: ValuesCardProps }) => {
  return (
    <div className="p-8 h-full space-y-4 border border-local-secondary rounded-[20px] text-center">
      <div className="size-16 rounded-full bg-local-secondary mx-auto flex items-center justify-center p-2 ">
        <Image
          src={value.icon.src}
          alt={value.icon.alt}
          width={60}
          height={60}
          className="size-full"
        />
      </div>

      <h3 className="title-local-secondary text-xl">{value.title}</h3>

      <p className="">{value.description}</p>
    </div>
  );
};
