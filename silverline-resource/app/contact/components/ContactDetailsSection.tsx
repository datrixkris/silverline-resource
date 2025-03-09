import React from "react";
import Form from "./Form";
import ContactDetails from "./ContactDetails";

const ContactDetailsSection = () => {
  return (
    <section className="flex sm:flex-row flex-col gap-10 md:gap-16 maximum-width">
      <div className="sm:w-[55%]">
        <Form />
      </div>
      <div className="sm:w-[45%]">
        <ContactDetails />
      </div>
    </section>
  );
};

export default ContactDetailsSection;
