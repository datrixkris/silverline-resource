import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import AboutUsSection from "./components/AboutUsSection";
import CoreValuesSection from "./components/CoreValuesSection";
import TeamSection from "./components/TeamSection";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Silverline Resource | About Us",
  description:
    "Silverline is a resource company focusing on building and road construction, civil engineering works, electromechanical equipment installation, retrofitting, logistics, and procurement services.",
  openGraph: {
    title: "Silverline Resource | About Us",
    description:
      "Silverline is a resource company focusing on building and road construction, civil engineering works, electromechanical equipment installation, retrofitting, logistics, and procurement services.",
    url: `${siteUrl}/about/`,
    siteName: "Silverline Resource | About Us",
    images: [
      {
        url: "/images/about-banner-image.png",
        width: 1200,
        height: 630,
        alt: "silverline",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silverline Resource | About Us",
    description:
      "Silverline is a resource company focusing on building and road construction, civil engineering works, electromechanical equipment installation, retrofitting, logistics, and procurement services.",
    images: ["/images/about-banner-image.png"],
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Follow links on this page
  },
  alternates: {
    canonical: `${siteUrl}/about/`,
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#ffffff",
};

const About = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="/images/about-banner-image.png"
        breadcrumb="About us"
      />

      <main className="space-y-24 py-20">
        <AboutUsSection />
        <CoreValuesSection />
        <TeamSection />
      </main>
    </div>
  );
};

export default About;
