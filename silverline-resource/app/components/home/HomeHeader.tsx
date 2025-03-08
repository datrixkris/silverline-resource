import React from "react";
import NavBar from "../generic/NavBar";

const HomeHeader = () => {
  return (
    <>
      {/* navigation */}
      <NavBar type="white" />

      {/* header content */}
      <header className="bg-[url('/images/home-banner-image.png')] [@media(max-height:600px)]:h-[600px] h-dvh bg-cover text-white ">
        {/* content */}
        <div className="flex justify-center flex-col py-[200px] h-full maximum-width relative">
          {/* texts */}
          <div className="space-y-8 max-w-[700px] [@media(min-height:600px)]:-translate-y-14">
            <div className="w-fit rounded-4xl px-8 py-1 font-bold border-3 border-primary">
              Welcome to Silverline Resource Company Limited
            </div>

            <h2 className="font-bold text-4xl">
              Where Building Dreams is Not Just a Job, It&apos;s Our Passion
            </h2>
          </div>

          {/* carousel indicators */}
          <div className="flex items-center justify-center gap-5 absolute bottom-20 left-1/2 -translate-x-1/2">
            <div className="size-5 rounded-full bg-primary"></div>
            <div className="size-5 rounded-full bg-secondary"></div>
            <div className="size-5 rounded-full bg-secondary"></div>
          </div>
        </div>
      </header>
    </>
  );
};

export default HomeHeader;
