import React from "react";
import Form from "./Form";
import ContactDetails from "./ContactDetails";
import ScaleNormal from "@/app/components/animations/ScaleNormal";

const ContactDetailsSection = () => {
  return (
    <section className="flex sm:flex-row flex-col gap-10 md:gap-16 maximum-width">
      <div className="sm:w-[55%]">
        <ScaleNormal>
          <Form />
        </ScaleNormal>
      </div>
      <div className="sm:w-[45%]">
        <ContactDetails />
      </div>
    </section>
  );
};

export default ContactDetailsSection;
