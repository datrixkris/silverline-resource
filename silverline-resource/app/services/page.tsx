import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import ServicesSection from "./components/ServicesSection";
import type { Metadata } from "next";
import FadeInUp from "../components/animations/FadeInUp";
import Footer from "../components/generic/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Silverline Resource | Our Services",
  description:
    "Silverline Resource Company Limited offers a diverse range of services and products to prospective clients in the Ghanaian market, with plans to extend business operations to other African countries",
  openGraph: {
    title: "Silverline Resource | Our Services",
    description:
      "Silverline Resource Company Limited offers a diverse range of services and products to prospective clients in the Ghanaian market, with plans to extend business operations to other African countries",
    url: `${siteUrl}/services/`,
    siteName: "Silverline Resource | Our Services",
    images: [
      {
        url: "/images/services-banner-image.png",
        width: 1200,
        height: 630,
        alt: "silverline",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silverline Resource | Our Services",
    description:
      "Silverline Resource Company Limited offers a diverse range of services and products to prospective clients in the Ghanaian market, with plans to extend business operations to other African countries",
    images: ["/images/services-banner-image.png"],
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Follow links on this page
  },
  alternates: {
    canonical: `${siteUrl}/services/`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const Services = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="https://res.cloudinary.com/dnpiachdz/image/upload/v1741792117/services-banner-image_oifjgy.png"
        breadcrumb="What we do"
        navbarType="white"
      />

      <main className="space-y-24 pt-20">
        <ServicesSection />
      </main>

      <FadeInUp>
        <Footer />
      </FadeInUp>
    </div>
  );
};

export default Services;
