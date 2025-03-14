import ButtonTitle from "@/app/components/generic/ButtonTitle";
import React from "react";
import Image from "next/image";

export interface MissionVisionProps {
  imgUrl: string;
  flexReverse?: boolean;
  description: string;
  title: string;
}

const MissionVision = ({ data }: { data: MissionVisionProps }) => {
  return (
    <div
      className={`flex md:flex-row flex-col items-center gap-8 md:gap-14 px-8 sm:px-12 md:px-20 py-8 bg-local-secondary text-white rounded-[20px] ${
        data.flexReverse ? "md:flex-row-reverse flex-col" : ""
      }`}
    >
      <div className="md:w-[45%] space-y-4">
        <ButtonTitle text={data.title} />

        <p className="">{data.description}</p>
      </div>

      {/* image */}
      <div className="w-full md:w-[55%] rounded-[20px] overflow-clip">
        <Image
          src={data.imgUrl}
          alt="mission vision img"
          height={250}
          width={650}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default MissionVision;
