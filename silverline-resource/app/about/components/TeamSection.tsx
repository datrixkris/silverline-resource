import ButtonTitle from "@/app/components/generic/ButtonTitle";
import React from "react";
import TeamCard, { TeamCardProps } from "./TeamCard";
import ScaleNormal from "@/app/components/animations/ScaleNormal";
import FadeInUp from "@/app/components/animations/FadeInUp";
import StaggeredFadeUp from "@/app/components/animations/StaggeredFadeUp";

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
      <ScaleNormal>
        <div className="w-fit mx-auto">
          <ButtonTitle text="Our team" />
        </div>
      </ScaleNormal>

      {/* text */}
      <FadeInUp>
        <p className="mx-auto max-w-[750px] text-center">
          Building Tomorrow Today: Our dedicated team transforms blueprints into
          reality with precision, innovation, and a passion for excellence
        </p>
      </FadeInUp>

      {/* teams */}
      <div className=" grid sm:grid-cols-2 md:grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <StaggeredFadeUp key={index} index={index}>
            <TeamCard team={team} key={index} />
          </StaggeredFadeUp>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
