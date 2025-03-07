import React from "react";
import Image from "next/image";

export interface TeamCardProps {
  name: string;
  role: string;
  image: { src: string; alt: string };
}

const TeamCard = ({ team }: { team: TeamCardProps }) => {
  return (
    <div className=" rounded-[50px]">
      {/* image */}
      <div className="aspect-square rounded-[30px] overflow-clip">
        <Image
          src={team.image.src}
          alt={team.image.alt}
          width={400}
          height={400}
          className="w-full h-full object-center"
        />
      </div>

      {/* content */}
      <div className="text-center p-6">
        <h4 className="font-bold mb-4">{team.role}</h4>
        <p className="">{team.role}</p>
      </div>
    </div>
  );
};

export default TeamCard;
