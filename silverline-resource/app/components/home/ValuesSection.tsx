import React from "react";
import ButtonTitle from "../generic/ButtonTitle";
import CoreValues from "./CoreValues";
import BuildingTrust from "./BuildingTrust";

const ValuesSection = () => {
  return (
    <section className="maximum-width">
      {/* content */}
      <div className="flex flex-col gap-10 items-center justify-center text-center max-w-[1200px] mx-auto">
        {/* title button */}
        <ButtonTitle text="why choose us" />
        {/* title */}
        <h2 className=" title-secondary text-4xl">Our core values</h2>
      </div>

      <div className="mt-24">
        <CoreValues />
      </div>

      <div className="my-24">
        <BuildingTrust />
      </div>
    </section>
  );
};

export default ValuesSection;
