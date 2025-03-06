import React from "react";

interface ButtonTitleProps {
  text: string;
  className?: string;
}

const ButtonTitle = ({ text, className }: ButtonTitleProps) => {
  return (
    <button
      className={`uppercase rounded-[20px] font-bold text-2xl px-11 py-6 border-primary border-3   ${className}`}
    >
      {text}
    </button>
  );
};

export default ButtonTitle;
