import React from 'react';
import BaseComponent from '../base/base-component';

export default class Footer extends BaseComponent {
  render() {
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
