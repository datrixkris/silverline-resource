import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import BlogSection from "./components/BlogSection";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="/images/blog-banner-image.png"
        breadcrumb="Blog"
      />

      <section className="space-y-24 py-20">
        <BlogSection />

        <section>{children}</section>
      </section>
    </div>
  );
};

export default BlogLayout;
