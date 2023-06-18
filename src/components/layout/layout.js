import React from 'react';
import Header from '../header/header';
import "normalize.css";
import "slick-carousel/slick/slick.css";
import "../../assets/styles/main.scss";
import Footer from '../footer/footer';

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