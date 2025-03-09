"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

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
  const [isScrolled, setIsScrolled] = useState(false);
  const [navColor, setNavColor] = useState(type);

  useEffect(() => {
    const checkScroll = () => {
      setIsScrolled(window.scrollY > 50);
      window.scrollY > 50 ? setNavColor(undefined) : setNavColor(type);
    };

    checkScroll(); // Check scroll position on mount
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <nav
      className={`f fixed z-50 left-0 right-0 transition-all duration-300  ${
        navColor === "white" ? "text-white" : ""
      } ${isScrolled ? "bg-white py-2 shadow-md" : "bg-transparent py-10"}`}
    >
      <div className="flex justify-between items-center maximum-width">
        {/* logo */}
        <div className="logo w-[130px] lg:w-[160px]">
          {navColor === "white" ? (
            <Image
              className="w-full"
              src="/logo-light.svg"
              alt="logo"
              width={200}
              height={60}
            />
          ) : (
            <Image
              className="w-full"
              src="/logo-dark.svg"
              alt="logo"
              width={200}
              height={60}
            />
          )}
        </div>

        {/* links */}
        <div className="links md:flex gap-5 lg:gap-10 hidden items-center">
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

          {/* socials */}
          <div className="flex gap-1">
            <div
              className={` size-8 rounded-full flex items-center justify-center ${
                isScrolled ? "" : "p-0.5 bg-white"
              }`}
            >
              <Image
                className="w-full"
                src="/icons/facebook.svg"
                alt="logo"
                width={30}
                height={30}
              />
            </div>
            <div
              className={` size-8 rounded-full flex items-center justify-center ${
                isScrolled ? "" : "p-0.5 bg-white"
              }`}
            >
              <Image
                className="w-full"
                src="/icons/instagram.svg"
                alt="logo"
                width={30}
                height={30}
              />
            </div>
            <div
              className={` size-8 rounded-full flex items-center justify-center ${
                isScrolled ? "" : "p-0.5 bg-white"
              }`}
            >
              <Image
                className="w-full"
                src="/icons/twitter.svg"
                alt="logo"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
