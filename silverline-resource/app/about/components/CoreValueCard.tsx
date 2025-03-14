import React from "react";
import Image from "next/image";

export interface ValuesCardProps {
  title: string;
  description: string;
  icon: { src: string; alt: string };
}

const CoreValueCard = ({ value }: { value: ValuesCardProps }) => {
  return (
    <div className="px-6 h-full sm:px-12 py-5 sm:py-8 flex gap-3 sm:gap-5 items-start bg-[#FF9032] rounded-[20px]">
      <div className="shrink-0 size-14 sm:size-16 lg:size-20 rounded-full bg-local-secondary flex items-center justify-center p-2 ">
        <Image
          src={value.icon.src}
          alt={value.icon.alt}
          width={80}
          height={80}
          className="size-full"
        />
      </div>

      {/* text */}
      <div className="">
        <h3 className="text-local-secondary mb-3 capitalize font-bold text-2xl">
          {value.title}
        </h3>

        <p className="capitalize">{value.description}</p>
      </div>
    </div>
  );
};

export default CoreValueCard;
