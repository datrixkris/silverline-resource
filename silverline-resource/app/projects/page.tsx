import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import ProjectSection from "./components/ProjectSection";

const Projects = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="/images/project-banner-image.png"
        breadcrumb="Projects"
      />

      <main className="space-y-24 pt-20">
        <ProjectSection />
      </main>
    </div>
  );
};

export default Projects;
