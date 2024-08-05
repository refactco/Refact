import React from "react";
import ContainerBox from "../container-box/container-box";
import NewsletterForm from "../newsletter/email-subscriber";

const CtaSection = () => {
  return (
    <ContainerBox className="c-section--cta">
      <div className="c-cta">
        <div className="c-cta__col">
          <h4 className="c-cta__title">
            Sound Smarter in Meetings
          </h4>
          <div className="c-cta__text">
            Weekly media tech news in easy-to-read chunks. 
          </div>
        </div>
        <div className="c-cta__col">
          <NewsletterForm />
        </div>
      </div>
    </ContainerBox>
  );
};

export default CtaSection;
