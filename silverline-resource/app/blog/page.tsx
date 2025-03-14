import React from "react";
// import BlogContent from "./components/BlogContent";
// import BlogList from "./components/BlogList";
import type { Metadata } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  title: "Silverline Resource | Our Blog",
  description:
    "Stay updated with the latest trends, insights, and expertise in the construction industry. The Silverline Resource blog covers innovations, best practices, and project highlights to keep you informed. Explore our articles today!",
  openGraph: {
    title: "Silverline Resource | Our Blog",
    description:
      "Stay updated with the latest trends, insights, and expertise in the construction industry. The Silverline Resource blog covers innovations, best practices, and project highlights to keep you informed. Explore our articles today!",
    url: `${siteUrl}/blog/`,
    siteName: "Silverline Resource | Our Blog",
    images: [
      {
        url: "/images/blog-banner-image.png",
        width: 1200,
        height: 630,
        alt: "silverline",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Silverline Resource | Our Blog",
    description:
      "Stay updated with the latest trends, insights, and expertise in the construction industry. The Silverline Resource blog covers innovations, best practices, and project highlights to keep you informed. Explore our articles today!",
    images: ["/images/blog-banner-image.png"],
  },
  robots: {
    index: true, // Allow search engines to index this page
    follow: true, // Follow links on this page
  },
  alternates: {
    canonical: `${siteUrl}/blog/`,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const page = () => {
  return (
    <div className="flex sm:flex-row flex-col gap-4 md:gap-6 maximum-width">
      {/* <aside className="sm:w-[30%] lg:w-[35%] sm:shrink-0">
        <BlogList />
      </aside>
      <main className="sm:w-[70px%] lg:[w-65%]">
        <BlogContent />
      </main> */}
      <div className="text-center text-2xl text-gray-400 w-full">
        Coming soon
      </div>
    </div>
  );
};

export default page;
