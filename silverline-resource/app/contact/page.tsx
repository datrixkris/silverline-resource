import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import ContactSection from "./components/ContactSection";

const Contact = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="/images/contact-header-image.png"
        breadcrumb="Contact us"
      />

      <main className="space-y-24 pt-20">
        <ContactSection />
      </main>
    </div>
  );
};

export default Contact;
