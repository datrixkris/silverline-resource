import ButtonTitle from "@/app/components/generic/ButtonTitle";
import React from "react";

const BlogSection = () => {
  return (
    <section className="">
      <div className="space-y-16 mb-16 maximum-width">
        <div className="space-y-10">
          {/* title button */}
          <div className="w-fit mx-auto">
            <ButtonTitle text="Blog" />
          </div>

          <h2 className="text-4xl title-secondary mx-auto w-fit">
            PAST, PRESENT, AND FUTURE WONDERS
          </h2>

          {/* text */}
          <p className="mx-auto max-w-[825px] text-center">
            Silverline Resource Company Limited provides many services to its
            prospective clients in the Ghanaian market and wishes to extend its
            businesses to other African countries by 2022. The following are its
            major businesses it undertakes as a company...
          </p>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
