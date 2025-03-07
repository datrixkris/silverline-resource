import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import BlogSection from "./components/BlogSection";

const Blog = () => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="/images/blog-banner-image.png"
        breadcrumb="Blog"
      />

      <main className="space-y-24 py-20">
        <BlogSection />
      </main>
    </div>
  );
};

export default Blog;
