import ButtonTitle from "@/app/components/generic/ButtonTitle";
import React from "react";
import TeamCard, { TeamCardProps } from "./TeamCard";

const team: TeamCardProps = {
  name: "Jane Doe",
  role: "Front-End Developer",
  image: {
    src: "/images/team-image.png",
    alt: "Jane Doe - Front-End Developer",
  },
};

const TeamSection = () => {
  return (
    <section className="space-y-16 maximum-width">
      {/* title button */}
      <div className="w-fit mx-auto">
        <ButtonTitle text="Our team" />
      </div>

      {/* text */}
      <p className="mx-auto max-w-[750px] text-center">
        Building Tomorrow Today: Our dedicated team transforms blueprints into
        reality with precision, innovation, and a passion for excellence
      </p>

      {/* teams */}
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <TeamCard team={team} key={index} />
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
