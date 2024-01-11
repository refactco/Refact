import React from "react";
import ContainerBox from "../container-box/container-box";
import { Link } from "gatsby";

const CtaSection = () => {
  return (
    <ContainerBox className="c-section--cta">
      <div className="c-cta">
        <div className="c-cta__col">
          <h4 className="c-cta__title">
            Looking to build something new?
          </h4>
        </div>
        <div className="c-cta__col">
          <div className="c-cta__text">
            Whatever stage your project is at, we want to help you make it a big success.
          </div>
          <Link to="/contact" className='c-btn'>Get in Touch</Link>
        </div>
      </div>
    </ContainerBox>
  );
};

export default CtaSection;
