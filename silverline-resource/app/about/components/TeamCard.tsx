import React from "react";
import Image from "next/image";

export interface TeamCardProps {
  id: number;
  name: string;
  position: string;
  picture: string;
}

const TeamCard = ({ team }: { team: TeamCardProps }) => {
  return (
    <div className=" rounded-[50px]">
      {/* image */}
      <div className="aspect-square rounded-[30px] overflow-clip">
        <Image
          src={team.picture}
          alt={team.name}
          width={400}
          height={400}
          className="w-full h-full object-center"
        />
      </div>

      {/* content */}
      <div className="text-center p-6">
        <h4 className="font-bold mb-4">{team.name}</h4>
        <p className="">{team.position}</p>
      </div>
    </div>
  );
};

export default TeamCard;
