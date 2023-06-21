import { useStaticQuery, graphql, Link } from 'gatsby';
import React, { useState } from 'react';
import { PopupModal } from 'react-calendly';

const Header  = () => {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      headerNav: wpMenuItem(menu: {node: {locations: {eq: MENU_HEADER}}}) {
        menu {
          node {
            slug
            nodeType
            name
            menuItems {
              nodes {
                label
                cssClasses
                url
              }
            }
          }
        }
      }
    }
  `);
  const headerNav = data.headerNav.menu.node;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(true);
  };

  const onHamburgerClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
  };

  const mobileClassName = `c-header__wrap js-nav ${isMobileNavOpen ? 'is-open' : ''}`;
  return (
    <header className="o-section c-section--header js-navigation">
      <div className="o-section__wrapper">
        <div className="c-header">
          <div className="c-header__col">
            <div className="c-header__logo">
              <Link to="/" className="c-link c-link--logo" aria-label="Refact" rel="home">
                <svg width="104" viewBox="0 0 104 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="M12.023 13.774c2.24-1.234 3.357-3.385 3.351-6.454a6.79 6.79 0 0 0-1.911-5.143A7.577 7.577 0 0 0 8.028.351H.571v23.143h4.672v-8.477h2.323l3.488 8.46h5.023v-.223l-4.054-9.48ZM10 10.191a2.46 2.46 0 0 1-2.1.926H5.243V4.26h2.743c1.811 0 2.717 1.16 2.717 3.48A4.046 4.046 0 0 1 10 10.191ZM32.44 4.217v-3.9H19.18V23.46h8.34l1.114-3.883h-4.782v-6.103h6.531l1.08-3.77h-7.611V4.216h8.588ZM49.36 4.217v-3.9H39.074L36.503 9.43v14.048h4.68V14.05h7.269v-3.883h-7.27V4.217h8.178ZM60.683.317h-4.286L49.163 23.46h4.946l1.243-4.74h6.377l1.234 4.74h4.997L60.683.317Zm-4.286 14.52 2.169-8.254 2.16 8.254h-4.329ZM79.677 19.012a3.078 3.078 0 0 1-2.571.857 2.837 2.837 0 0 1-2.649-1.286c-.514-.857-.771-2.443-.771-4.74V9.472a9.283 9.283 0 0 1 .857-4.286A2.845 2.845 0 0 1 77.2 3.875a2.983 2.983 0 0 1 2.571.925 6.257 6.257 0 0 1 .755 3.429h4.697a9.6 9.6 0 0 0-2.237-6.077C81.674.737 79.763.035 77.234.035a7.414 7.414 0 0 0-6 2.571c-1.44 1.714-2.16 4.166-2.16 7.354v3.892c0 3.197.695 5.648 2.092 7.371a7.278 7.278 0 0 0 6 2.572 7.835 7.835 0 0 0 5.785-2.04c1.372-1.355 2.109-3.352 2.229-6H80.5a5.915 5.915 0 0 1-.823 3.257ZM87.563.317v3.9h5.631v19.26h4.689V4.217h5.726v-3.9H87.563Z"/></g></svg>
              </Link>
            </div>
          </div>
          <div className="c-header__col">
            <nav className={mobileClassName}>
            {typeof window !== 'undefined' && (
              <ul className='s-nav' id='navigation'>
                {headerNav.menuItems.nodes.map((item, index) => {
                  const { label, url, cssClasses } = item;
                  const isActive = window.location.pathname === url;
                  const className = [
                    'menu-item',
                    isActive ? 'current-menu-item' : '',
                    cssClasses,
                  ].join(' ');
                  return (
                    <li key={index} className={className}>
                      {className.includes('js-calendly-popup') ? (
                        <>
                        <a href={url} style={{ display: "block", margin: "0 auto" }}
                          onClick={handleLinkClick}>
                            {label}
                          </a>
                          <PopupModal
                            url="https://calendly.com/saeedreza/30min"
                            rootElement={document.body}
                            onModalClose={() => setIsOpen(false)}
                            open={isOpen}
                          />
                        </>
                      ) : (
                        <Link to={url} aria-label={label}>
                          {label}
                        </Link>
                      )}
                    </li>
                    
                  );
                })}
              </ul>
            )}
            </nav>        
            <div className="c-hamburger">
              <input className="c-hamburger__checkbox js-hamburger" type="checkbox" aria-label="Menu" 
                onClick={onHamburgerClick}
              />
              <span className="c-hamburger__icon"></span>
              <span className="c-hamburger__icon"></span>
              <span className="c-hamburger__icon"></span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
