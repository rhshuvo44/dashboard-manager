import React from "react";

const SectionTitle = ({ children }) => {
  return (
    <h2 className="my-10 font-bold text-xl text-center text-primary capitalize">
      {children}
    </h2>
  );
};

export default SectionTitle;
