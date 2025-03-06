import React from "react";
import Button from "../ButtonTitle";
import WhatWeDoGrid from "../WhatWeDoGrid";

const WhatWeDoSection = () => {
  return (
    <section className="maximum-width">
      {/* content */}
      <div className="flex flex-col gap-10 items-center justify-center text-center max-w-[830px] mx-auto">
        {/* title button */}
        <Button text="What we do" />
        {/* title */}
        <h2 className=" title-secondary text-4xl">Silverline resource</h2>
        {/* text */}
        <p className="">
          Our operations are managed by professionally trained and
          self-motivated individuals in the scope of building technology,
          construction, project management, consultancy services, and broader
          experience in civil and plumbing engineering works.
        </p>
      </div>

      {/* cards */}
      <div className="mt-16">
        <WhatWeDoGrid />
      </div>
    </section>
  );
};

export default WhatWeDoSection;
