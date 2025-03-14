import React from "react";

const CarouselIndicators = ({
  current,
  setCurrent,
}: {
  current: number;
  setCurrent: (index: number) => void;
}) => {
  return (
    <div className="flex items-center justify-center gap-5 absolute [@media(max-height:600px)]:bottom-10 bottom-20 left-1/2 -translate-x-1/2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          onClick={() => setCurrent(index)}
          className={`size-5 rounded-full transition-all duration-300 cursor-pointer md:hover:bg-local-primary md:hover:scale-125 ${
            index === current ? "bg-local-primary" : "bg-local-secondary"
          }`}
        ></div>
      ))}
    </div>
  );
};

export default CarouselIndicators;
