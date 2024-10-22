import React, { useEffect } from 'react';
import Header from '../header/header';
import "normalize.css";
import "slick-carousel/slick/slick.css";
import "../../assets/styles/main.scss";
import Footer from '../footer/footer';
import { register } from 'swiper/element/bundle';
import Prism from 'prismjs'; 
import 'prismjs/themes/prism.css';
import CtaSection from '../cta/cta';
import { useLocation } from '@reach/router';
import FloatButton from '../float-btn/float-btn';

register();
const Layout = ({ children }) => {
  const location = useLocation();
  useEffect(() => {
    if (typeof window !== 'undefined' && window.Prism) {
      Prism.highlightAll();
    }
  }, [children]);
  return (
    <>
      <Header />
      {children}
      {location.pathname !== '/contact' && location.pathname !== '/contact/' && <FloatButton />}
      {location.pathname !== '/newsletters' && location.pathname !== '/newsletters/' && <CtaSection />}
      <Footer />
    </>
  );
}

export default Layout;