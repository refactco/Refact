import React from "react";
import ContainerBox from "../container-box/container-box";
import { PopupButton } from "react-calendly";

const CtaSection = () => {
  return (
    <ContainerBox className="c-section--cta">
      <div className="c-cta">
        <div className="c-cta__col">
          <h4 className="c-cta__title">
            Looking for a growth partner for media startup?
          </h4>
        </div>
        <div className="c-cta__col">
          <div className="c-cta__text">
            Get in touch and tell us about your project! We’d love to hear from you.
          </div>
          {typeof window !== 'undefined' && (
            <>
            <PopupButton
              url="https://calendly.com/saeedreza/30min"
              rootElement={document.body}
              text="Get in Touch"
              className='c-btn'
            />
            </>
          )}
        </div>
      </div>
    </ContainerBox>
  );
};

export default CtaSection;
