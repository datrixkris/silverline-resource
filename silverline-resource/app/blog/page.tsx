import React from "react";
import BlogContent from "./components/BlogContent";
import BlogList from "./components/BlogList";

const page = () => {
  return (
    <div className="flex sm:flex-row flex-col gap-4 md:gap-6 maximum-width">
      <aside className="sm:w-[30%] lg:w-[35%] sm:shrink-0">
        <BlogList />
      </aside>
      <main className="sm:w-[70px%] lg:[w-65%]">
        <BlogContent />
      </main>
    </div>
  );
};

export default page;
