import React from 'react';
import ContainerBox from '../container-box/container-box';
import PatternBg from '../patterns/pattern-bg';
import MarqueeLogo from '../marquee/marquee';
import Button, {BgMode, BtnType} from '../button/button';

const ServiceHero = ({ title, description }) => {
  return (
    <>
      <ContainerBox className="c-section--home is-service-hero">
        <div className='c-hero__wrapper'>
          <div className="c-hero">
            <Button 
              url="/services"
              text="Back to Services"
              type={BtnType.SECONDARY} 
              bgMode={BgMode.DARK}
              icon='arrowleft'
            />
            <h1 className="c-page-header__title">
              {title}
            </h1>
            <div
              className="c-page-header__text"
              style={{ maxWidth: 880 }}
              dangerouslySetInnerHTML={{
                __html: description,
              }}
            ></div>
          </div>
        </div>
        <div className='c-marquee__hero'>
          <MarqueeLogo type="clients" speed={40} />
        </div>
        <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
        <PatternBg pattern="heroPattern" className='is-hero-pattern' />
      </ContainerBox>
    </>
  );
};

export default ServiceHero;
