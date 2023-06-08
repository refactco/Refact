import React, { Fragment, ReactNode } from 'react';
import Footer from '../footer/footer';
import Header from '../header/header';
import BaseComponent from '../base/base-component';
import { ILayoutProperties } from './layout-interface';

export default class Layout extends BaseComponent<ILayoutProperties> {
  protected declareTranslateCollection(): string {
    return 'layout';
  }

  public render(): ReactNode {
    const { children } = this.props;

    return (
      <Fragment>
        {children}
      </Fragment>
    );
  }
}
