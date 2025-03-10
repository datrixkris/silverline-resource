import ButtonTitle from "@/app/components/generic/ButtonTitle";
import React from "react";
import AboutCompany from "./AboutCompany";
import MissionVision, { MissionVisionProps } from "./MissionVision";

const missionVisionData: MissionVisionProps[] = [
  {
    imgUrl: "/images/mission.png",
    title: "Mission",
    description:
      "A company that inspires and fulfils growth to customer expectation by creating value for money and providing the highest level of service in the construction industry while developing a highly successful team.",
    flexReverse: false,
  },
  {
    imgUrl: "/images/vision.png",
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
      <div className="w-fit mx-auto">
        <ButtonTitle text="About us" />
      </div>

      {/*  about company*/}
      <AboutCompany />

      {/* mission and vision */}
      {missionVisionData.map((data, index) => (
        <MissionVision data={data} key={index} />
      ))}
    </section>
  );
};

export default AboutUsSection;
