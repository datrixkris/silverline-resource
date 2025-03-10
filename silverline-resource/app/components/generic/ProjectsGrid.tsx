import React from "react";
import ProjectsCard, { ProjectCardProps } from "./ProjectsCard";
import StaggeredFadeUp from "../animations/StaggeredFadeUp";

const projects: ProjectCardProps[] = [
  {
    title: "Silverline Resource Company",
    description:
      "Silverline Resource Company Limited provides many services to its prospective clients in the Ghanaian market and wishes to extend its businesses to other",
    image: {
      src: "/images/project-1.png",
      alt: "Silverline Resource Company Preview",
    },
  },
  {
    title: "Silverline Resource Company",
    description:
      "Silverline Resource Company Limited provides many services to its prospective clients in the Ghanaian market and wishes to extend its businesses to other",
    image: {
      src: "/images/project-2.png",
      alt: "Silverline Resource Company Preview",
    },
  },
  {
    title: "Silverline Resource Company",
    description:
      "Silverline Resource Company Limited provides many services to its prospective clients in the Ghanaian market and wishes to extend its businesses to other",
    image: {
      src: "/images/project-3.png",
      alt: "Silverline Resource Company Preview",
    },
  },
];

const ProjectsGrid = () => {
  return (
    <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <StaggeredFadeUp key={index} index={index}>
          <ProjectsCard project={project} key={index} />
        </StaggeredFadeUp>
      ))}
    </section>
  );
};

export default ProjectsGrid;
