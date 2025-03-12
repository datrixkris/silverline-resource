import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import ProjectSection from "./components/ProjectSection";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Silverline Resource | Our Projects",
  description:
    "Discover Silverline Resource's construction projects, where innovation meets excellence. From commercial developments to residential masterpieces, our commitment to quality and sustainability drives every build. Explore our work today.",
  openGraph: {
    title: "Silverline Resource | Our Projects",
    description:
      "Discover Silverline Resource's construction projects, where innovation meets excellence. From commercial developments to residential masterpieces, our commitment to quality and sustainability drives every build. Explore our work today.",
    url: `${siteUrl}/projects/`,
    siteName: "Silverline Resource | Our Projects",
    images: [
      {
        url: "/images/project-banner-image.png",
        width: 1200,
        height: 630,
        alt: "silverline",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silverline Resource | Our Projects",
    description:
      "Discover Silverline Resource's construction projects, where innovation meets excellence. From commercial developments to residential masterpieces, our commitment to quality and sustainability drives every build. Explore our work today.",
    images: ["/images/project-banner-image.png"],
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Follow links on this page
  },
  alternates: {
    canonical: `${siteUrl}/projects/`,
  },
  icons: {
    icon: "/favicon.ico",
  },
  themeColor: "#ffffff",
};

const Projects = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="/images/project-banner-image.png"
        breadcrumb="Projects"
      />

      <main className="space-y-24 pt-20">
        <ProjectSection />
      </main>
    </div>
  );
};

export default Projects;
