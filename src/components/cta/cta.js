import React from "react";
import ContainerBox from "../container-box/container-box";
import { PopupButton } from "react-calendly";

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
            Whatever stage you are in your next project, we want to help you make it a big success.
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
