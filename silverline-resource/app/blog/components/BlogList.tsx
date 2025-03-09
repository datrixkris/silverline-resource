import React from "react";
import Image from "next/image";

const BlogList = () => {
  return (
    <div className="w-full space-y-5 sm:sticky sm:top-[20px] sm:h-screen overflow-scroll scrollbar-mac flex gap-4 sm:block">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="flex gap-2 text-xs sm:text-sm w-[200px] sm:w-auto"
          title="lskdjflskjdlfkjslkfjd"
        >
          <div className="shrink-0 size-[50px] sm:size-[60px] md:size-[85px] lg:size-[120px]">
            <Image
              src="/images/blog-thumbnail.png"
              alt="blog"
              width={135}
              height={135}
              className="w-full object-cover object-center"
            />
          </div>

          <div className="">
            <h4 className="line-clamp-1 lg:line-clamp-2 font-bold mb-1">
              Silverline something something provides many something
            </h4>
            <p className="line-clamp-2 md:line-clamp-3 lg:line-clamp-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur inventore, atque error fugit asperiores molestiae
              architecto aliquid nemo eligendi repellendus sint placeat
              exercitationem tempore porro illo ab adipisci animi provident?
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BlogList;
