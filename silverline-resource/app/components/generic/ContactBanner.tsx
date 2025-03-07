import React from "react";
import Button from "./Button";

const ContactBanner = () => {
  return (
    <div className="py-14 lg:py-20 px-8 lg:px-24 bg-[url('/images/contact-banner-image.png')] rounded-[20px] bg-cover">
      <div className="flex md:justify-between gap-5 flex-wrap md:flex-nowrap items-center text-center md:text-left justify-center">
        {/* content */}
        <div className="xl:ml-20">
          <div className="max-w-[480px]">
            <h3 className="title-primary text-[30px]">
              Have a building project in mind?
            </h3>
            <p className="text-white">
              As a trusted partner which applies modern trends in construction,
              count on us to execute the ideas you have with efficiency.
            </p>
          </div>
        </div>

        {/* button */}
        <div className="lg:mx-auto self-end">
          <Button text="contact us" link="/contact" />
        </div>
      </div>
    </div>
  );
};

export default ContactBanner;
