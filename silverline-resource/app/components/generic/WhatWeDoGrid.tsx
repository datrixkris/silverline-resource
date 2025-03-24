"use client";

import React, { useEffect, useState } from "react";
import WhatWeDoCard, { ServicesCardProps } from "./WhatWeDoCard";
import StaggeredFadeUp from "../animations/StaggeredFadeUp";
import { api } from "@/app/utils/api";
import SkeletonCardGrid from "./SkeletonCardGrid";

// const services: ServicesCardProps[] = [
//   {
//     title: "Single and Multi-storey Construction",
//     description:
//       "Our team excels in designing and constructing client-oriented single and multi-storey buildings that prioritise functionality, aesthetics and durability. This is done through innovative engineering, sustainable practices, the application of advanced technologies and the use of quality materials that last a lifetime.",
//     icon: {
//       src: { iconLight: "/icons/house.svg", iconDark: "/icons/house.png" },
//       alt: "House icon",
//     },
//   },
//   {
//     title: "Complex Building Construction",
//     description:
//       "Our extensive experience and cutting-edge techniques enable us to take even the most challenging construction projects with confidence and precision. We provide innovative and sustainable solution in construction with tailored approach.",
//     icon: {
//       src: {
//         iconLight: "/icons/building.png",
//         iconDark: "/icons/building.svg",
//       },
//       alt: "building icon",
//     },
//   },
//   {
//     title: "Civil Engineering",
//     description:
//       "Silverline Resource Company Limited provides many services to its prospective clients in the Ghanaian market with steps of developing in other African countries.",
//     icon: {
//       src: {
//         iconLight: "/icons/helmet-cog.png",
//         iconDark: "/icons/helmet-cog.svg",
//       },
//       alt: "helmet-cog icon",
//     },
//   },
//   {
//     title: "renovation",
//     description:
//       "We carry our remodeling, refurbishing and structural retrofitting of edifices to meet industry standards and customer's preferences",
//     icon: {
//       src: {
//         iconLight: "/icons/renovate.png",
//         iconDark: "/icons/renovate.svg",
//       },
//       alt: "renovate icon",
//     },
//   },
//   {
//     title: "LOGISTICS & PROCUREMENT",
//     description:
//       "Delivery with a focus: your trusted partner in global logistics. We provide logistics services to agencies, organisations and any entity to ensure safe, reliable delivery at the right expectation of clients. Quality service is key in our service delivery which draws our clients to engage us when the need arises",
//     icon: {
//       src: {
//         iconLight: "/icons/logistics.png",
//         iconDark: "/icons/logistics.svg",
//       },
//       alt: "logistics icon",
//     },
//   },
// ];

const WhatWeDoGrid = () => {
  const [services, setServices] = useState<ServicesCardProps[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await api.get("services");
        setServices(response.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <section>
      {loading ? (
        <SkeletonCardGrid />
      ) : (
        <div className="flex flex-wrap  justify-center gap-x-4 gap-y-7">
          {services.map((service, index) => (
            <StaggeredFadeUp index={index} key={index}>
              <WhatWeDoCard service={service} />
            </StaggeredFadeUp>
          ))}
        </div>
      )}
    </section>
  );
};

export default WhatWeDoGrid;
