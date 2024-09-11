import React from "react";
import ContainerBox from "../container-box/container-box";
import NewsletterForm from "../newsletter/email-subscriber";
import PatternBg from "../patterns/pattern-bg";

const CtaSection = () => {
  return (
    <ContainerBox className="c-section--cta">
      <div className="c-cta">
        <div className="c-cta__col">
          <h4 className="c-cta__title">
            Sound smarter in meetings.
          </h4>
          <div className="c-cta__text">
            Weekly media tech news in easy-to-read chunks. 
          </div>
        </div>
        <div className="c-cta__col">
          <NewsletterForm />
        </div>
      </div>
      <PatternBg pattern="ctaRightPattern" className='is-cta-pattern-1' />
      <PatternBg pattern="ctaLeftPattern" className='is-cta-pattern-2' />
      <PatternBg pattern="hightlightBottom" className='is-cta-pattern-3' />
    </ContainerBox>
  );
};

export default CtaSection;
