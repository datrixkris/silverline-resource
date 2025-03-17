import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-full rounded-lg overflow-hidden shadow-lg bg-white">
      {/* Card image skeleton */}
      <div className="w-full h-48 bg-gray-200 animate-pulse"></div>

      {/* Card content */}
      <div className="p-4">
        {/* Title skeleton */}
        <div className="h-6 bg-gray-200 rounded-md w-3/4 mb-4 animate-pulse"></div>

        {/* Description skeleton - 3 lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded-md w-full animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-md w-5/6 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded-md w-4/6 animate-pulse"></div>
        </div>

        {/* Button skeleton */}
        <div className="mt-4 flex justify-between items-center">
          <div className="h-8 bg-gray-200 rounded-md w-1/3 animate-pulse"></div>
          <div className="h-8 bg-gray-200 rounded-full w-8 animate-pulse"></div>
        </div>
      </div>
    </div>
  );
};

// Creating a grid of skeleton cards for demonstration
const SkeletonCardGrid = ({ gridClassname }: { gridClassname?: string }) => {
  return (
    <div className=" p-6">
      <div
        className={`${
          gridClassname
            ? gridClassname
            : "grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        }`}
      >
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
};

export default SkeletonCardGrid;
