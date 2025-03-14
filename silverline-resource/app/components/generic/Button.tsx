import Link from "next/link";
import React from "react";

interface ButtonProps {
  text: string;
  link?: string;
}

const Button = ({ text, link }: ButtonProps) => {
  return (
    <>
      {link ? (
        <Link href={link}>
          <button
            className={`bg-local-primary rounded-[10px] text-white uppercase font-bold px-12 py-5 hover:scale-105 active:scale-100 transition-transform`}
          >
            {text}
          </button>
        </Link>
      ) : (
        <button
          className={`bg-local-primary rounded-[10px] text-white uppercase font-bold px-12 py-5 hover:scale-105 active:scale-100 transition-transform text-nowrap`}
        >
          {text}
        </button>
      )}
    </>
  );
};

export default Button;
