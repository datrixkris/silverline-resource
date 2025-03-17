import React from "react";
import Button from "../generic/ButtonTitle";
import ProjectsGrid from "../generic/ProjectsGrid";
import ScaleNormal from "../animations/ScaleNormal";
import FadeInUp from "../animations/FadeInUp";

const ProjectsSection = () => {
  return (
    <section className="maximum-width">
      {/* content */}
      <div className="flex flex-col gap-10 items-center justify-center text-center max-w-[1200px] mx-auto">
        {/* title button */}
        <ScaleNormal>
          <Button text="projects" />
        </ScaleNormal>
        {/* title */}

        <FadeInUp>
          <h2 className=" title-local-secondary text-4xl">
            Past, present, and future wonders
          </h2>
        </FadeInUp>
        {/* text */}

        <FadeInUp>
          <p className="">
            We have journeyed through the years in meeting customers&apos;
            desires. We walk our projects with our esteemed customers, as their
            satisfaction is our major goal. Rooted in tradition, we honour our
            heritage by upholding the craftsmanship and values that have defined
            us since our beginning. We thrive on innovation and adaptability,
            harnessing cutting-edge technology and sustainable practices to
            deliver superior results that exceed expectations. Join us to bring
            your dream to reality with our professionals readily at your
            service.
          </p>
        </FadeInUp>
      </div>

      {/* cards */}
      <div className="mt-16">
        <ProjectsGrid dataLength={3} />
      </div>
    </section>
  );
};

export default ProjectsSection;
