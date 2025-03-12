import ButtonTitle from "@/app/components/generic/ButtonTitle";
import React from "react";
import AboutCompany from "./AboutCompany";
import MissionVision, { MissionVisionProps } from "./MissionVision";
import ScaleNormal from "@/app/components/animations/ScaleNormal";
import StaggeredFadeUp from "@/app/components/animations/StaggeredFadeUp";

const missionVisionData: MissionVisionProps[] = [
  {
    imgUrl:
      "https://res.cloudinary.com/dnpiachdz/image/upload/v1741792115/mission_kwlgon.png",
    title: "Mission",
    description:
      "A company that inspires and fulfils growth to customer expectation by creating value for money and providing the highest level of service in the construction industry while developing a highly successful team.",
    flexReverse: false,
  },
  {
    imgUrl:
      "https://res.cloudinary.com/dnpiachdz/image/upload/v1741792117/vision_v4zapb.png",
    title: "Vision",
    description:
      "To be the leading construction firm recognised for transforming visions into reality, building with integrity, excellence and innovation.",
    flexReverse: true,
  },
];

const AboutUsSection = () => {
  return (
    <section className="space-y-16 maximum-width">
      {/* title button */}
      <ScaleNormal>
        <div className="w-fit mx-auto">
          <ButtonTitle text="About us" />
        </div>
      </ScaleNormal>

      {/*  about company*/}
      <AboutCompany />

      {/* mission and vision */}
      {missionVisionData.map((data, index) => (
        <StaggeredFadeUp key={index} index={index}>
          <MissionVision data={data} key={index} />
        </StaggeredFadeUp>
      ))}
    </section>
  );
};

export default AboutUsSection;
