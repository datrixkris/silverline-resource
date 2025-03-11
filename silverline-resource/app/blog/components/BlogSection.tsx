import FadeInUp from "@/app/components/animations/FadeInUp";
import ScaleNormal from "@/app/components/animations/ScaleNormal";
import ButtonTitle from "@/app/components/generic/ButtonTitle";
import React from "react";

const BlogSection = () => {
  return (
    <section className="">
      <div className="space-y-16 mb-16 maximum-width">
        <div className="space-y-10">
          {/* title button */}
          <ScaleNormal>
            <div className="w-fit mx-auto">
              <ButtonTitle text="Blog" />
            </div>
          </ScaleNormal>

          <FadeInUp>
            <h2 className="text-4xl title-secondary mx-auto w-fit text-center">
              Past, present, and future wonders
            </h2>
          </FadeInUp>

          {/* text */}
          <FadeInUp>
            <p className="mx-auto max-w-[825px] text-center">
              Silverline Resource Company Limited provides many services to its
              prospective clients in the Ghanaian market and wishes to extend
              its businesses to other African countries by 2022. The following
              are its major businesses it undertakes as a company...
            </p>
          </FadeInUp>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
