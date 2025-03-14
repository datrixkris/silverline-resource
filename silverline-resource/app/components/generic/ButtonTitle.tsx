import React from "react";

interface ButtonTitleProps {
  text: string;
  className?: string;
}

const ButtonTitle = ({ text, className }: ButtonTitleProps) => {
  return (
    <button
      className={`uppercase rounded-[20px] font-bold text-2xl px-10 sm:px-14 py-3 sm:py-5 border-local-primary border-3   ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonTitle;
