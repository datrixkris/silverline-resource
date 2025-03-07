import ButtonTitle from "@/app/components/generic/ButtonTitle";
import React from "react";

const ContactSection = () => {
  return (
    <section className="">
      <div className="space-y-16 mb-16 maximum-width">
        <div className="space-y-10">
          {/* title button */}
          <div className="w-fit mx-auto">
            <ButtonTitle text="Contact us" />
          </div>

          <h2 className="text-4xl title-secondary mx-auto w-fit">
            If You Have Any Enquiries, Please Contact Us
          </h2>

          {/* text */}
          <p className="mx-auto max-w-[580px] text-center">
            Have questions or need assistance? We're here to help! Contact us
            today, and our team will get back to you as soon as possible.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
