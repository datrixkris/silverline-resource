import React from "react";

const Map = () => {
  return (
    <div className="maximum-width">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3970.2198984430256!2d-0.2243872250139177!3d5.681323994300262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNcKwNDAnNTIuOCJOIDDCsDEzJzE4LjUiVw!5e0!3m2!1sfr!2sng!4v1742463188662!5m2!1sfr!2sng"
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
