import ButtonTitle from "@/app/components/generic/ButtonTitle";
import ContactBanner from "@/app/components/generic/ContactBanner";
import ProjectsGrid from "@/app/components/generic/ProjectsGrid";
import React from "react";

const ProjectSection = () => {
  return (
    <section className="">
      <div className="space-y-16 mb-16 maximum-width">
        <div className="space-y-10">
          {/* title button */}
          <div className="w-fit mx-auto">
            <ButtonTitle text="Projects" />
          </div>

          <h2 className="text-4xl title-secondary mx-auto w-fit">
            PAST, PRESENT, AND FUTURE WONDERS
          </h2>

          {/* text */}
          <p className="mx-auto max-w-[1180px] text-center">
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
        </div>
      </div>

      <div className="bg-background space-y-16 py-16 pb-24">
        <ProjectsGrid />

        <div className="maximum-width">
          <ContactBanner />
        </div>
      </div>
    </section>
  );
};

export default ProjectSection;
