import React from 'react';
import Header from '../header/header';
import "normalize.css";
import "slick-carousel/slick/slick.css";
import "../../assets/styles/main.scss";
import Footer from '../footer/footer';
import { register } from 'swiper/element/bundle';
register();
const Layout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

export default Layout;