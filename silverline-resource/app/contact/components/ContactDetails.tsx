import FadeInUp from "@/app/components/animations/FadeInUp";
import LocationIcon from "@/app/components/icons/LocationIcon";
import MailIcon from "@/app/components/icons/MailIcon";
import PhoneIcon from "@/app/components/icons/PhoneIcon";
import React from "react";

const ContactDetails = () => {
  return (
    <div>
      <FadeInUp>
        <h3 className="text-3xl font-bold">Contact Details</h3>
      </FadeInUp>

      <div className="divide-y divide-secondary">
        {/* our office */}
        <FadeInUp>
          <div className="flex gap-4 py-5">
            {/* icon */}
            <div className="size-12 shrink-0 rounded-full bg-secondary p-2 flex items-center justify-center">
              <LocationIcon className="text-white size-full" />
            </div>

            {/* content */}
            <div className="">
              <h4 className="text-primary font-bold text-xl mb-3">
                Our Office
              </h4>
              <p className="max-w-[255px]">
                M30 Pulsar Street, Ashongman, Accra, Ghana
              </p>
            </div>
          </div>
        </FadeInUp>

        {/* Call us */}
        <FadeInUp>
          <div className="flex gap-4 py-5">
            {/* icon */}
            <div className="size-12 shrink-0 rounded-full bg-secondary p-2 flex items-center justify-center">
              <PhoneIcon className="text-white size-full" />
            </div>

            {/* content */}
            <div className="">
              <h4 className="text-primary font-bold text-xl mb-3">Call us</h4>
              <p className="max-w-[255px]">
                <a href="tel:+233503500960">+233 50 350 0960</a>
              </p>
              <p className="max-w-[255px]">
                <a href="tel:+233506835379">+233 50 683 5379</a>
              </p>
            </div>
          </div>
        </FadeInUp>

        {/* mail us */}
        <FadeInUp>
          <div className="flex gap-4 py-5">
            {/* icon */}
            <div className="size-12 shrink-0 rounded-full bg-secondary p-2 flex items-center justify-center">
              <MailIcon className="text-white size-full" />
            </div>

            {/* content */}
            <div className="">
              <h4 className="text-primary font-bold text-xl mb-3">Mail us</h4>
              <p className="max-w-[255px]">
                <a href="mailto:info@silverlineresource.com">
                  info@silverlineresource.com
                </a>
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </div>
  );
};

export default ContactDetails;
