import React from "react";

const Map = () => {
  return (
    <div className="maximum-width">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3970.339009993461!2d-0.21538022454410932!3d5.664019132553049!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xfdf9d49ad279981%3A0xd856c8a04a5ea8d0!2sSilverline%20Resource%20Limited!5e0!3m2!1sen!2sgh!4v1741503408044!5m2!1sen!2sgh"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full lg:aspect-[1560/527] aspect-[2/1]"
      ></iframe>
    </div>
  );
};

export default Map;
