"use client";

import React from "react";
import Button from "../generic/ButtonTitle";
import WhatWeDoGrid from "../generic/WhatWeDoGrid";
import ScaleNormal from "../animations/ScaleNormal";
import FadeInUp from "../animations/FadeInUp";

const WhatWeDoSection = () => {
  return (
    <section className="maximum-width">
      {/* content */}
      <div className="flex flex-col gap-10 items-center justify-center text-center max-w-[830px] mx-auto">
        {/* title button */}

        <ScaleNormal>
          <Button text="What we do" />
        </ScaleNormal>
        {/* title */}
        <FadeInUp>
          <h2 className=" title-local-secondary text-4xl">
            Silverline resource
          </h2>
        </FadeInUp>
        {/* text */}
        <FadeInUp>
          <p className="">
            Our operations are managed by professionally trained and
            self-motivated individuals in the scope of building technology,
            construction, project management, consultancy services, and broader
            experience in civil and plumbing engineering works.
          </p>
        </FadeInUp>
      </div>

      {/* cards */}
      <div className="mt-16">
        <WhatWeDoGrid />
      </div>
    </section>
  );
};

export default WhatWeDoSection;
