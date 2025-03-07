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
          <div className="w-fit mx-auto">
            <ButtonTitle text="What we do" />
          </div>

          <h2 className="text-4xl title-secondary mx-auto w-fit">
            Silverline resource
          </h2>

          {/* text */}
          <p className="mx-auto max-w-[850px] text-center">
            Silverline Resource Company Limited offers a diverse range of
            services and products to prospective clients in the Ghanaian market,
            with plans to extend business operations to other African countries.
            Our major services include:
          </p>
        </div>
      </div>

      <div className="bg-background space-y-16 py-16 pb-24">
        <WhatWeDoGrid />

        <div className="maximum-width">
          <ContactBanner />
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
