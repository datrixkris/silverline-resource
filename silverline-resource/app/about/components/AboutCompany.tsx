import Image from "next/image";
import React from "react";

const AboutCompany = () => {
  return (
    <div className="flex gap-14 items-center">
      {/* content */}
      <div className="lg:w-[45%]">
        <h2 className="title-secondary text-4xl mb-3">
          Silverline resource company limited
        </h2>

        {/* image */}
        <div className="my-8 rounded-[20px] overflow-clip lg:hidden">
          <Image
            src="/images/about-company.png"
            alt="about company img"
            height={500}
            width={650}
            className="w-full object-cover"
          />
        </div>

        <div
          className="space-y-2
        "
        >
          <p className="">
            Silverline Resource Company Limited is a Private Limited Liability
            Company, legally registered under the laws of Ghana on June 1, 2020.
            Our business operation and office are located at M30 Pulsar St.,
            Ashongman, Accra. Silverline is a resource company focusing on
            building and road construction, civil engineering works,
            electromechanical equipment installation, retrofitting, logistics,
            and procurement services.
          </p>
          <p className="">
            Our operations are managed by skilled, professionally trained, and
            self-motivated staff in building and road construction, project
            management, consultancy services, retrofitting of structures, and a
            broad experience in civil and MEP works.
          </p>
          <p className="">
            Silverline Resource Company Limited envisions promising business
            prospects for the future, aiming to achieve significant milestones
            in the industry and the environment within which we serve our
            clients, both within Ghana and globally.
          </p>
        </div>
      </div>

      {/* image */}
      <div className="hidden lg:block w-[55%] rounded-[20px] overflow-clip">
        <Image
          src="/images/about-company.png"
          alt="about company img"
          height={500}
          width={650}
          className="w-full object-cover"
        />
      </div>
    </div>
  );
};

export default AboutCompany;
