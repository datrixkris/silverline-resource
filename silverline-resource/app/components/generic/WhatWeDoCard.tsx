"use client";

import Image from "next/image";
import React, { useState } from "react";

export interface ServicesCardProps {
  id: number;
  title: string;
  description: string;
  lightThemeIcon: string;
  darkThemeIcon: string;
}

const WhatWeDoCard = ({ service }: { service: ServicesCardProps }) => {
  const [icon, setIcon] = useState(service.darkThemeIcon);

  return (
    <div
      className="sm:w-[440px] p-10 text-center space-y-5 rounded-[20px] bg-white shadow-(--shadow-service-card) hover:bg-local-secondary hover:text-white transition-colors duration-300 h-full"
      onMouseEnter={() => setIcon(service.lightThemeIcon)}
      onMouseLeave={() => setIcon(service.darkThemeIcon)}
    >
      <div className="size-14 mx-auto">
        <Image
          src={icon}
          alt={service.title}
          width={50}
          height={50}
          className="w-full object-cover"
        />
      </div>

      <h3 className="title-local-primary text-xl">{service.title}</h3>

      <p className="">{service.description}</p>
    </div>
  );
};

export default WhatWeDoCard;
