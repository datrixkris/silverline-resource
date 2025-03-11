import FadeInUp from "@/app/components/animations/FadeInUp";
import FadeUpOnScroll from "@/app/components/animations/FadeUpOnScroll";
import ScaleNormal from "@/app/components/animations/ScaleNormal";
import ButtonTitle from "@/app/components/generic/ButtonTitle";
import ContactBanner from "@/app/components/generic/ContactBanner";
import WhatWeDoGrid from "@/app/components/generic/WhatWeDoGrid";
import React from "react";

const ServicesSection = () => {
  return (
    <section className="">
      <div className="space-y-16 mb-16 maximum-width">
        <div className="space-y-10">
          {/* title button */}
          <ScaleNormal>
            <div className="w-fit mx-auto">
              <ButtonTitle text="What we do" />
            </div>
          </ScaleNormal>

          <FadeInUp>
            <h2 className="text-4xl title-secondary mx-auto w-fit">
              Silverline resource
            </h2>
          </FadeInUp>

          {/* text */}
          <FadeInUp>
            <p className="mx-auto max-w-[850px] text-center">
              Silverline Resource Company Limited offers a diverse range of
              services and products to prospective clients in the Ghanaian
              market, with plans to extend business operations to other African
              countries. Our major services include:
            </p>
          </FadeInUp>
        </div>
      </div>

      <div className="bg-background space-y-16 py-16 pb-24">
        <div className="maximum-width">
          <WhatWeDoGrid />
        </div>

        <div className="maximum-width">
          <ScaleNormal>
            <ContactBanner />
          </ScaleNormal>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
