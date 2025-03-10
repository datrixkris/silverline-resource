import React from "react";
import HomeHeader from "./components/home/HomeHeader";
import WhatWeDoSection from "./components/home/WhatWeDoSection";
import ContactBanner from "./components/generic/ContactBanner";
import ProjectsSection from "./components/home/ProjectsSection";
import ValuesSection from "./components/home/ValuesSection";
import FadeUpOnScroll from "./components/animations/FadeUpOnScroll";
// import NavBar from "./components/NavBar";

const HomePage = () => {
  return (
    <div className="">
      {/* header */}
      <HomeHeader />

      <main className="bg-background space-y-20 pt-20">
        <WhatWeDoSection />

        {/* banner */}
        <div className=" bg-white py-14">
          <div className="maximum-width">
            <FadeUpOnScroll>
              <ContactBanner />
            </FadeUpOnScroll>
          </div>
        </div>

        <ProjectsSection />

        {/* why choose us */}
        <div className=" bg-white py-14">
          {/* <div className="maximum-width"> */}
          <ValuesSection />
          {/* </div> */}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
