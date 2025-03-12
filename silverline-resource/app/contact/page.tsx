import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import ContactSection from "./components/ContactSection";
import ContactDetailsSection from "./components/ContactDetailsSection";
import Map from "./components/Map";
import type { Metadata } from "next";
import FadeInUp from "../components/animations/FadeInUp";
import Footer from "../components/generic/Footer";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Silverline Resource | Contact Us",
  description:
    "Get in touch with Silverline Resource for expert construction solutions. Whether you have a project inquiry or need consultation, our team is ready to assist. Contact us today to build with excellence.",
  openGraph: {
    title: "Silverline Resource | Contact Us",
    description:
      "Get in touch with Silverline Resource for expert construction solutions. Whether you have a project inquiry or need consultation, our team is ready to assist. Contact us today to build with excellence.",
    url: `${siteUrl}/contact/`,
    siteName: "Silverline Resource | Contact Us",
    images: [
      {
        url: "/images/contact-header-image.png",
        width: 1200,
        height: 630,
        alt: "silverline",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silverline Resource | Contact Us",
    description:
      "Get in touch with Silverline Resource for expert construction solutions. Whether you have a project inquiry or need consultation, our team is ready to assist. Contact us today to build with excellence.",
    images: ["/images/contact-header-image.png"],
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Follow links on this page
  },
  alternates: {
    canonical: `${siteUrl}/contact/`,
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#ffffff",
};

const Contact = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="https://res.cloudinary.com/dnpiachdz/image/upload/v1741792114/contact-header-image_zfiywe.png"
        breadcrumb="Contact us"
      />

      <main className="space-y-24 py-20">
        <ContactSection />
        <ContactDetailsSection />
        <Map />
      </main>

      <FadeInUp>
        <Footer />
      </FadeInUp>
    </div>
  );
};

export default Contact;
