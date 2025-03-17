"use client";

import React, { useEffect, useState } from "react";
import ProjectsCard, { ProjectCardProps } from "./ProjectsCard";
import StaggeredFadeUp from "../animations/StaggeredFadeUp";
import { api } from "@/app/utils/api";
import SkeletonCardGrid from "./SkeletonCardGrid";

// const projects: ProjectCardProps[] = [
//   {
//     title: "Silverline Resource Company",
//     description:
//       "Silverline Resource Company Limited provides many services to its prospective clients in the Ghanaian market and wishes to extend its businesses to other",
//     image: {
//       src: "/images/project-1.png",
//       alt: "Silverline Resource Company Preview",
//     },
//   },
//   {
//     title: "Silverline Resource Company",
//     description:
//       "Silverline Resource Company Limited provides many services to its prospective clients in the Ghanaian market and wishes to extend its businesses to other",
//     image: {
//       src: "/images/project-2.png",
//       alt: "Silverline Resource Company Preview",
//     },
//   },
//   {
//     title: "Silverline Resource Company",
//     description:
//       "Silverline Resource Company Limited provides many services to its prospective clients in the Ghanaian market and wishes to extend its businesses to other",
//     image: {
//       src: "/images/project-3.png",
//       alt: "Silverline Resource Company Preview",
//     },
//   },
// ];

const ProjectsGrid = ({ dataLength }: { dataLength?: number }) => {
  const [projects, setProjects] = useState<ProjectCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("projects");
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="">
      {loading ? (
        <SkeletonCardGrid />
      ) : (
        <div className="">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {projects.slice(0, dataLength).map((project, index) => (
              <StaggeredFadeUp key={index} index={index}>
                <ProjectsCard project={project} key={index} />
              </StaggeredFadeUp>
            ))}
          </div>

          {projects.length < 1 && (
            <p className="text-gray-300 text-2xl text-center">
              No data to display
            </p>
          )}
        </div>
      )}
    </section>
  );
};

export default ProjectsGrid;
