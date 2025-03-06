import React from "react";
import Image from "next/image";

const BuildingTrust = () => {
  return (
    <section className="min-[900px]:flex-row flex-col flex gap-10 items-center ">
      {/* images */}
      <div className="min-[900px]:w-[55%] flex gap-5 relative pb-[180px]">
        <div className="w-1/2 relative top-[180px] overflow-clip  rounded-[20px] h-[700px]">
          <Image
            src="/images/building-trust-1.png"
            alt="core values image"
            width={350}
            height={700}
            className="size-full object-cover"
          />
        </div>
        <div className="w-1/2 overflow-clip rounded-[20px] h-[700px]">
          <Image
            src="/images/building-trust-2.png"
            alt="core values image"
            width={350}
            height={700}
            className="size-full object-cover"
          />
        </div>
      </div>
      {/* content */}
      <div className="min-[900px]:w-[45%] space-y-8 text-center">
        <h3 className="title-secondary text-4xl ">
          Decades of building trust, brick by brick
        </h3>

        <p className="">
          For the Decades of Building trust Brick by Brick, Let us change it to
          your Trusted Partner. Silverline has provided trusted construction
          service, time and again in the area of Transportation, Health, Sports,
          Domestic and Commercial Dwelling as well as other infrastructural
          development. We stand by guiding principles and values as we deliver
          exceptional services to our clients.
        </p>

        <div className="w-fit mx-auto">
          <h3 className="text-4xl title-primary">200K+</h3>
          <p className="">Beneficiaries and counting</p>
        </div>
      </div>
    </section>
  );
};

export default BuildingTrust;
