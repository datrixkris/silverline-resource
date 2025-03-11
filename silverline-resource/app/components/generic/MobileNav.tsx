import React, { useState } from "react";
import HamburgerIcon from "../icons/HamburgerIcon";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "../icons/CloseIcon";

export interface Links {
  name: string;
  link: string;
}

const MobileNav = ({
  links,
  className,
}: {
  links: Links[];
  className?: string;
}) => {
  const pathname = usePathname();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="">
      {/* hamburger */}
      <div className="w-fit" onClick={() => setShowDropdown(!showDropdown)}>
        <AnimatePresence mode="wait">
          {showDropdown ? (
            <motion.div
              key="close"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-fit"
            >
              <CloseIcon
                className={`w-12 h-9 rounded-full hover:cursor-pointer ${className}`}
              />
            </motion.div>
          ) : (
            <motion.div
              key="hamburger"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="w-fit"
            >
              <HamburgerIcon
                className={`w-12 h-9 ring-2 ring-secondary rounded-md hover:cursor-pointer ${className}`}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* dropdown */}
      <AnimatePresence>
        {showDropdown && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
            }}
            exit={{ height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t overflow-hidden border-gray-300 shadow-md absolute top-full left-0 right-0 bg-white h-auto z-50 divide-y divide-gray-300 maximum-width"
          >
            {links.map((link, index) => {
              return (
                <Link
                  href={link.link}
                  key={index}
                  className={`px-5 py-3 block hover:text-primary text-secondary font-medium ${
                    pathname === link.link ? "!text-primary" : ""
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}

            {/* socials */}
            <div className="flex items-center justify-center py-3 px-5">
              <div
                className={` size-10 rounded-full flex items-center justify-center `}
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
                className={` size-10 rounded-full flex items-center justify-center `}
              >
                <Image
                  className="w-full"
                  src="/icons/instagram.svg"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </div>
              {/* <div
                className={` size-10 rounded-full flex items-center justify-center `}
              >
                <Image
                  className="w-full"
                  src="/icons/twitter.svg"
                  alt="logo"
                  width={30}
                  height={30}
                />
              </div> */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNav;
