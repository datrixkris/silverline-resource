import React from "react";
import Image from "next/image";

export interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  image: string;
}

const ProjectsCard = ({ project }: { project: ProjectCardProps }) => {
  return (
    <div className="bg-white p-5 rounded-[50px]">
      {/* image */}
      <div className="aspect-square rounded-[30px] overflow-clip">
        <Image
          src={project.image}
          alt={project.title}
          width={400}
          height={400}
          className="w-full h-full object-center"
        />
      </div>

      {/* content */}
      <div className="text-center p-6">
        <h4 className="font-bold mb-4">{project.title}</h4>
        <p className="">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectsCard;
