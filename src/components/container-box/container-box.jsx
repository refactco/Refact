import React from "react";

const ContainerBox = ({ className, id, children }) => {
  const consumedClassName = ["o-section", className].join(" ");

  return (
    <section className={consumedClassName} id={id}>
      <div className="o-section__wrapper">
        {children}
      </div>
    </section>
  );
};

export default ContainerBox;
