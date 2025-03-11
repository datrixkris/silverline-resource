import React from "react";
import NavBar from "./NavBar";
import Link from "next/link";
import FadeInUp from "../animations/FadeInUp";

interface GenericHeaderProps {
  breadcrumb: string;
  bannerUrl: string;
  title?: string;
  navbarType?: "white";
}

const GenericHeader = ({
  breadcrumb,
  bannerUrl,
  title,
  navbarType,
}: GenericHeaderProps) => {
  return (
    <>
      {/* navigation */}
      <NavBar type={navbarType} />

      {/* header content */}
      <header
        className={`h-[450px] bg-cover bg-center`}
        style={{ backgroundImage: `url(${bannerUrl})` }}
      >
        <div className="flex justify-center flex-col h-full maximum-width relative">
          {/* content */}
          <div className="space-y-8 max-w-[700px] translate-y-10">
            {title && (
              <h2 className="font-bold text-4xl text-secondary">{title}</h2>
            )}

            <FadeInUp down={true}>
              <p className="font-bold">
                <Link href="/" className="hover:text-primary">
                  Home
                </Link>{" "}
                / <span className="text-primary">{breadcrumb}</span>
              </p>
            </FadeInUp>
          </div>
        </div>
      </header>
    </>
  );
};

export default GenericHeader;
