import Image from "next/image";
import React from "react";

export interface ServicesCardProps {
  title: string;
  description: string;
  icon: { src: string; alt: string };
}

const WhatWeDoCard = ({ service }: { service: ServicesCardProps }) => {
  return (
    <div className="sm:w-[440px] p-10 text-center space-y-5 rounded-[20px] bg-white shadow-(--shadow-service-card) hover:bg-secondary hover:text-white transition-colors duration-300 h-full">
      <div className="w-fit mx-auto">
        <Image
          src={service.icon.src}
          alt={service.icon.alt}
          width={50}
          height={50}
        />
      </div>

      <h3 className="title-primary text-xl">{service.title}</h3>

      <p className="">{service.description}</p>
    </div>
  );
};

export default WhatWeDoCard;
