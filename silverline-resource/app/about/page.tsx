import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import AboutUsSection from "./components/AboutUsSection";
import CoreValuesSection from "./components/CoreValuesSection";
import TeamSection from "./components/TeamSection";

const About = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="/images/about-banner-image.png"
        breadcrumb="About us"
      />

      <main className="space-y-24 py-20">
        <AboutUsSection />
        <CoreValuesSection />
        <TeamSection />
      </main>
    </div>
  );
};

export default About;
