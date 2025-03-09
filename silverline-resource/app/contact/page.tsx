import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import ContactSection from "./components/ContactSection";
import ContactDetailsSection from "./components/ContactDetailsSection";
import Map from "./components/Map";

const Contact = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="/images/contact-header-image.png"
        breadcrumb="Contact us"
      />

      <main className="space-y-24 py-20">
        <ContactSection />
        <ContactDetailsSection />
        <Map />
      </main>
    </div>
  );
};

export default Contact;
