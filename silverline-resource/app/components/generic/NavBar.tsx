"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  { name: "Home", link: "/" },
  { name: "About us", link: "/about" },
  { name: "What we do", link: "/services" },
  { name: "Projects", link: "/projects" },
  { name: "Blog", link: "/blog" },
  { name: "Contact us", link: "/contact" },
];
const NavBar = ({ type }: { type?: "white" }) => {
  const pathname = usePathname();

  return (
    <nav
      className={`flex justify-between items-center maximum-width fixed bg-transparent z-50 left-0 right-0 py-10 ${
        type === "white" ? "text-white" : ""
      }`}
    >
      {/* logo */}
      <div className="logo w-[160px]">
        <Image
          className="w-full"
          src="/logo-light.svg"
          alt="logo"
          width={200}
          height={200}
        />
      </div>

      {/* links */}
      <div className="links sm:flex gap-10 hidden">
        {links.map((link, index) => {
          return (
            <Link
              href={link.link}
              key={index}
              className={`hover:text-primary font-medium ${
                pathname === link.link ? "text-primary" : ""
              }`}
            >
              <span>{link.name}</span>
            </Link>
          );
        })}
      </div>

      {/* socials */}
    </nav>
  );
};

export default NavBar;
