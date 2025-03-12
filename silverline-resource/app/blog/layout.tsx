import React from "react";
import GenericHeader from "../components/generic/GenericHeader";
import BlogSection from "./components/BlogSection";
import FadeInUp from "../components/animations/FadeInUp";
import Footer from "../components/generic/Footer";

const BlogLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      {/* header banner */}
      <GenericHeader
        bannerUrl="https://res.cloudinary.com/dnpiachdz/image/upload/v1741792115/blog-banner-image_wli15l.png"
        breadcrumb="Blog"
      />

      <section className="space-y-24 py-20">
        <BlogSection />

        <section>{children}</section>
      </section>

      <FadeInUp>
        <Footer />
      </FadeInUp>
    </div>
  );
};

export default BlogLayout;
