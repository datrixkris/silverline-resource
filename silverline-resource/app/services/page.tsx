import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import ServicesSection from "./components/ServicesSection";

const Services = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="/images/services-banner-image.png"
        breadcrumb="What we do"
        navbarType="white"
      />

      <main className="space-y-24 pt-20">
        <ServicesSection />
      </main>
    </div>
  );
};

export default Services;
