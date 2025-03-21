"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import LocationIcon from "../icons/LocationIcon";
import PhoneIcon from "../icons/PhoneIcon";
import MailIcon from "../icons/MailIcon";
import FadeInUp from "../animations/FadeInUp";

const services = [
  { name: "Single and Multi-storey Construction", link: "/services#services" },
  { name: "Complex Building Construction", link: "/services#services" },
  { name: "Civil Engineering", link: "/services#services" },
  { name: "Renovation", link: "/services#services" },
  { name: "Logistics & Procurement", link: "/services#services" },
];

const links = [
  { name: "Home", link: "/" },
  { name: "About Us", link: "/about" },
  { name: "What We Do", link: "/services" },
  { name: "Projects", link: "/projects" },
  { name: "Blog", link: "/blog" },
  { name: "Contact Us", link: "/contact" },
];

const Footer = () => {
  const pathname = usePathname();

  return (
    <footer>
      <div className="py-24 bg-local-secondary text-white">
        <div className="maximum-width flex sm:flex-row flex-col gap-14 justify-between">
          {/* about silver line */}
          <div className="sm:w-[40%] lg:w-[30%]">
            <FadeInUp>
              {/* logo */}
              <div className="logo max-w-[300px] mb-5">
                <Image
                  className="w-full"
                  src="/logo-light.svg"
                  alt="logo"
                  width={320}
                  height={107}
                />
              </div>

              <p className=" leading-8">
                Silverline Resource Company Limited provides many services to
                its prospective clients in the Ghanaian with steps of developing
                in other African countries.
              </p>
            </FadeInUp>
          </div>

          {/* others */}
          <div className="sm:w-[60%] lg:w-[70%] flex sm:flex-row flex-col gap-14 lg:justify-between sm:self-end flex-wrap lg:flex-nowrap">
            <div className="lg:w-1/3">
              <FadeInUp>
                <h3 className="title-local-primary mb-5 text-2xl">Services</h3>

                {services.map((service, index) => (
                  <a
                    href={service.link}
                    key={index}
                    className={`mb-1 block w-fit hover:text-local-primary capitalize`}
                  >
                    {service.name}
                  </a>
                ))}
              </FadeInUp>
            </div>
            <div className="lg:w-1/3">
              <FadeInUp>
                <h3 className="title-local-primary mb-5 text-2xl">
                  Quick links
                </h3>

                {links.map((link, index) => (
                  <Link
                    href={link.link}
                    key={index}
                    className={`mb-1 block w-fit hover:text-local-primary capitalize ${
                      pathname === link.link ||
                      (link.link !== "/" &&
                        pathname.includes(link.link.replace("/", "")))
                        ? "text-local-primary"
                        : ""
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </FadeInUp>
            </div>
            <div className="lg:w-1/3">
              <FadeInUp>
                <h3 className="title-local-primary mb-5 text-2xl">
                  Our Office
                </h3>

                <div className="mb-1 flex gap-1">
                  <div className="w-fit shrink-0">
                    <LocationIcon className="text-local-primary relative top-1" />
                  </div>
                  <p className="">M30 Pulsar Street, Ashongman, Accra, Ghana</p>
                </div>
                <div className="mb-1 flex gap-1">
                  <div className="w-fit shrink-0">
                    <PhoneIcon className="text-local-primary relative top-1" />
                  </div>
                  <div className="">
                    <a className="block" href="tel:+233503500960">
                      +233 50 350 0960
                    </a>
                    <a className="block" href="tel:+233506835379">
                      +233 50 683 5379
                    </a>
                  </div>
                </div>
                <div className="mb-1 flex gap-1">
                  <div className="w-fit shrink-0">
                    <MailIcon className="text-local-primary relative top-1" />
                  </div>
                  <a
                    href="mailto:info@silverlineresource.com"
                    className="block"
                  >
                    info@silverlineresource.com
                  </a>
                </div>
                <div className="mt-2 flex gap-1 items-center">
                  <div className="flex gap-1 relative top-1">
                    <div
                      className={` size-6 rounded-full flex items-center justify-center `}
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
                      className={` size-6 rounded-full flex items-center justify-center `}
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
                      className={` size-6 rounded-full flex items-center justify-center `}
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
                  <p className="">silverlineresource</p>
                </div>
              </FadeInUp>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 maximum-width bg-white">
        <p className="text-center text-sm">
          {" "}
          Silverline Resource, All Rights Reserved &copy;{" "}
          {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
