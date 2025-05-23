"use client";

import FadeIn from "@/app/components/animations/FadeIn";
import FadeInUp from "@/app/components/animations/FadeInUp";
import React from "react";

const AboutCompany = () => {
  return (
    <div className="flex gap-14 items-center">
      {/* content */}
      <div className="lg:w-[45%]">
        <FadeInUp>
          <h2 className="title-local-secondary text-4xl mb-3">
            Silverline resource company limited
          </h2>
        </FadeInUp>

        {/* image */}
        <FadeInUp>
          <div className="my-8 rounded-[20px] overflow-clip lg:hidden">
            <video
              controls
              autoPlay
              loop
              muted
              id="desktop"
              className="w-full object-cover"
            >
              <source
                src="https://res.cloudinary.com/dnpiachdz/video/upload/v1741789880/Silverline_Ad_New_high_Compressed_rcdibb.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </FadeInUp>

        <div
          className="space-y-2
        "
        >
          <FadeInUp>
            <p className="">
              Silverline Resource Company Limited is a Private Limited Liability
              Company, legally registered under the laws of Ghana on June 1,
              2020. Our business operation and office are located at M30 Pulsar
              St., Ashongman, Accra. Silverline is a resource company focusing
              on building and road construction, civil engineering works,
              electromechanical equipment installation, retrofitting, logistics,
              and procurement services.
            </p>
          </FadeInUp>
          <FadeInUp>
            <p className="">
              Our operations are managed by skilled, professionally trained, and
              self-motivated staff in building and road construction, project
              management, consultancy services, retrofitting of structures, and
              a broad experience in civil and MEP works.
            </p>
          </FadeInUp>
          <FadeInUp>
            <p className="">
              Silverline Resource Company Limited envisions promising business
              prospects for the future, aiming to achieve significant milestones
              in the industry and the environment within which we serve our
              clients, both within Ghana and globally.
            </p>
          </FadeInUp>
        </div>
      </div>

      {/* image */}
      <div className="hidden lg:block w-[55%] rounded-[20px] overflow-clip">
        <FadeIn>
          <video
            controls
            autoPlay
            loop
            muted
            id="desktop"
            className="w-full object-cover hidden lg:block "
          >
            <source
              src="https://res.cloudinary.com/dnpiachdz/video/upload/v1741789880/Silverline_Ad_New_high_Compressed_rcdibb.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </FadeIn>
      </div>
    </div>
  );
};

export default AboutCompany;
