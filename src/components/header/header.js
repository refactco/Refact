import React, { Fragment } from 'react';
import BaseComponent from '../base/base-component';
import ContainerBox from '../container-box/container-box';

export default class Header extends BaseComponent {
  constructor(properties) {
    super(properties);

    this.pathname = '';
    this.state = {
      isMobileNavOpen: false,
    };
  }

  componentDidMount() {
    this.pathname = window.location.pathname;
  }

  onHamburgerClick() {
    this.setState({
      isMobileNavOpen: !this.state.isMobileNavOpen,
    });
  }

  render() {
    const { subtitle, menuItems, breadCrumbItems = [] } = this.props;
    const { isMobileNavOpen } = this.state;
    const mobileClassName = [
      's-nav js-nav',
      isMobileNavOpen ? 'is-open' : '',
    ].join(' ');

    return (
      <Fragment>
        <header className="o-section c-section--header">
          <div className="o-section__wrapper">
            <div className="c-header">
              <div className="c-header__col"></div>
              <div className="c-header__col">
                <div className="c-hamburger__wrap">
                  <div
                    className="c-hamburger"
                    onClick={() => {
                      this.onHamburgerClick();
                    }}
                  >
                    <input
                      className="c-hamburger__checkbox js-hamburger"
                      type="checkbox"
                      aria-label="Menu"
                    />
                    <span className="c-hamburger__icon"></span>
                    <span className="c-hamburger__icon"></span>
                    <span className="c-hamburger__icon"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <ContainerBox className="c-section--tab">
          hi
        </ContainerBox>
      </Fragment>
    );
  }
}
