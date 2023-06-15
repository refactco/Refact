import React, { Fragment } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import BaseComponent from '../base/base-component';


export default class Layout extends BaseComponent {
  declareTranslateCollection() {
    return 'layout';
  }

  render() {
    const { children } = this.props;

    return (
      <Fragment>
        <Header />
        {children}
        <Footer />
      </Fragment>
    );
  }
}
