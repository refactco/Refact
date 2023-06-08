import { Link } from 'gatsby';
import { OutboundLink } from 'gatsby-plugin-google-gtag';
import React, { ReactNode } from 'react';
import BaseComponent from '../base/base-component';

import { IFooterMenuItem, IFooterProperties } from './footer-interface';

export default class Footer extends BaseComponent<IFooterProperties> {
  public render(): ReactNode {
    const { menuItems } = this.props;

    return (
      <footer className="o-section c-section--footer">
        <div className="o-section__wrapper">
          <div className="c-footer">
            hi
          </div>
        </div>
      </footer>
    );
  }
}
