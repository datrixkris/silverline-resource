"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const services = [
  { name: "Single and Multi-storey Construction" },
  { name: "Complex Building Construction" },
  { name: "Civil Engineering" },
  { name: "Renovation" },
  { name: "Logistics & Procurement" },
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
      <div className="py-24 bg-secondary text-white">
        <div className="maximum-width flex sm:flex-row flex-col gap-14 justify-between">
          {/* about silver line */}
          <div className="sm:w-[40%] lg:w-[30%]">
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
              Silverline Resource Company Limited provides many services and
              products to its prospective clients in the Ghanaian market and
              wishes to extend its businesses to other African countries by
              2022. The following are its major businesses it undertakes as a
              company...
            </p>
          </div>

          {/* others */}
          <div className="sm:w-[60%] lg:w-[70%] flex sm:flex-row flex-col gap-14 lg:justify-between sm:self-end flex-wrap lg:flex-nowrap">
            <div className="lg:w-1/3">
              <h3 className="title-primary mb-5 text-2xl">Services</h3>

              {services.map((service, index) => (
                <p key={index} className="mb-1">
                  {service.name}
                </p>
              ))}
            </div>
            <div className="lg:w-1/3">
              <h3 className="title-primary mb-5 text-2xl">Quick links</h3>

              {links.map((link, index) => (
                <Link
                  href={link.link}
                  key={index}
                  className={`mb-1 block w-fit hover:text-primary ${
                    pathname === link.link ? "text-primary" : ""
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
            <div className="lg:w-1/3">
              <h3 className="title-primary mb-5 text-2xl">Our Office</h3>

              <div className="mb-1">
                <p className="">M30 Pulsar Street, Ashongman, Accra, Ghana</p>
              </div>
              <div className="mb-1">
                <a className="block" href="tel:+233503500960">
                  +233 50 350 0960
                </a>
                <a className="block" href="tel:+233506835379">
                  +233 50 683 5379
                </a>
              </div>
              <div className="mb-1">
                <a href="mailto:info@silverlineresource.com" className="block">
                  info@silverlineresource.com
                </a>
              </div>
              <div className="mb-1">
                <p className="">silverlineresource</p>
              </div>
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
