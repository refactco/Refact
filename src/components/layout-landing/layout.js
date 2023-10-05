import React from 'react';
import "normalize.css";
import "slick-carousel/slick/slick.css";
import "../../assets/styles/main.scss";
import { register } from 'swiper/element/bundle';
import HeaderLanding from '../header-landing/header';
import FooterLanding from '../footer-landing/footer';
register();
const LayoutLanding = ({ children }) => {
  return (
    <>
      <HeaderLanding />
      {children}
      <FooterLanding />
    </>
  );
}

export default LayoutLanding;