import { useStaticQuery, graphql, Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useState, useEffect } from 'react';
import { PopupModal } from 'react-calendly';
import { useLocation } from '@reach/router'; 
import useStickyHeader from './useStickyHeader';
const Header  = () => {
  useStickyHeader(); 
  const location = useLocation();
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
      subHeaderNav: wpMenuItem(menu: {node: {locations: {eq: SUB_HEADER}}}) {
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
      latestProject: wp {
        themeOptions {
          siteOptions {
            fieldGroupName
            latestProject {
              title
              fieldGroupName
              description
              cta {
                target
                title
                url
              }
              cover {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const headerNav = data.headerNav.menu.node;
  const subHeaderNav = data.subHeaderNav.menu.node;
  const latestProject = data.latestProject.themeOptions.siteOptions.latestProject;
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(true);    
  };

  const onHamburgerClick = () => {
    setIsMobileNavOpen(!isMobileNavOpen);
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('is-fixed');
    if (!isMobileNavOpen) {
      htmlElement.classList.add('is-fixed');
    }
  };

  useEffect(() => {
    const htmlElement = document.documentElement;
    htmlElement.classList.remove('is-fixed');
  }, [location.pathname]);

  const mobileClassName = `c-header__wrap js-nav ${isMobileNavOpen ? 'is-open' : ''}`;
  const mobileNavClassName = `o-section c-section--header js-navigation ${isMobileNavOpen ? 'is-active' : ''}`;
  return (
    <>
    <div className={mobileClassName}>
      <div className="c-header-wrap__col">
        <div className="c-header-wrap__inner">
          <div className="c-header-wrap__text">Main menu</div>
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
          {typeof window !== 'undefined' && (
            <ul className='s-nav s-nav--sub' id='navigation-subheader'>
              {subHeaderNav.menuItems.nodes.map((item, index) => {
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
          <div className="c-header-social">
            <div className="c-header-social__col">
              <a href="https://clutch.co/profile/refact" className="c-link" target='_blank' aria-label="Refact Client Reviews" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="90" fill="none" viewBox="0 0 90 51"><path fill="#000" d="M27.515 24.828h-4.097V50.43h4.097V24.828Zm14.341 17.435c0 3.918-3.296 4.23-4.276 4.23-2.45 0-2.895-2.291-2.895-3.674v-9.8h-4.097v9.779c0 2.428.762 4.43 2.098 5.766 1.18 1.18 2.948 1.826 4.863 1.826 1.359 0 3.282-.422 4.307-1.358v1.398h4.097V33.02h-4.097v9.243Zm12.292-15.388H50.05v6.145h-3.073v4.097h3.074V50.43h4.097V37.117h3.073V33.02h-3.073v-6.145Zm15.977 18.35c-.893.802-2.07 1.247-3.363 1.247-2.85 0-4.943-2.093-4.943-4.965 0-2.873 2.026-4.877 4.943-4.877 1.27 0 2.47.423 3.385 1.225l.622.534 2.763-2.76-.692-.625c-1.626-1.467-3.784-2.29-6.08-2.29-5.121 0-8.84 3.694-8.84 8.77 0 5.056 3.808 8.884 8.84 8.884 2.34 0 4.52-.824 6.125-2.315l.668-.624-2.806-2.76-.622.556Zm18.031-10.687c-1.18-1.18-2.563-1.824-4.478-1.824-1.358 0-2.897.422-3.921 1.357v-9.243h-4.098V50.43h4.098v-9.59c0-3.918 2.784-4.23 3.764-4.23 2.45 0 2.382 2.293 2.382 3.674V50.43H90V40.305c0-2.427-.507-4.43-1.844-5.767Z"/><path fill="#FF3D2E" d="M66.626 38.59a2.962 2.962 0 0 1 0 5.923 2.962 2.962 0 0 1 0-5.923Z"/><path fill="#000" d="M17.681 44c-1.558 1.603-3.674 2.47-5.901 2.47-4.565 0-7.883-3.583-7.883-8.503 0-4.943 3.318-8.527 7.883-8.527 2.205 0 4.298.867 5.88 2.448l.622.624 2.74-2.738-.602-.624c-2.27-2.338-5.344-3.606-8.64-3.606C5.055 25.544 0 30.887 0 37.988c0 7.08 5.078 12.4 11.78 12.4 3.319 0 6.392-1.29 8.663-3.627l.601-.624-2.716-2.782-.647.645ZM5.681 10.216V13h-.899V6.33h1.886c.422 0 .787.043 1.094.13.307.083.56.206.759.367.201.162.35.357.446.587.097.226.145.48.145.763 0 .236-.037.456-.112.66-.074.206-.183.39-.326.555-.14.162-.312.3-.516.415-.216.12-.449.207-.69.26.112.065.212.16.298.284L9.712 13h-.8c-.165 0-.286-.064-.363-.19l-1.732-2.384a.48.48 0 0 0-.172-.16.596.596 0 0 0-.28-.05h-.684Zm0-.656h.945c.264 0 .495-.031.694-.093.201-.065.369-.155.502-.27a1.13 1.13 0 0 0 .308-.42c.07-.17.104-.352.102-.535 0-.397-.132-.696-.396-.898-.26-.202-.65-.303-1.168-.303H5.68V9.56h.001Zm9.11-3.23v.735H11.59V9.28h2.593v.707H11.59v2.277h3.203V13h-4.11V6.33h4.11-.002Zm.527 0h.722a.3.3 0 0 1 .195.06c.05.04.087.09.112.153l1.885 4.707c.044.105.083.22.117.344.037.124.073.253.107.386.028-.133.057-.262.088-.386.034-.124.073-.24.117-.344l1.876-4.707a.371.371 0 0 1 .111-.144.285.285 0 0 1 .196-.07h.726l-2.719 6.67h-.814l-2.719-6.67ZM23.49 13h-.903V6.33h.903V13Zm5.895-6.67v.735h-3.203V9.28h2.593v.707h-2.593v2.277h3.203V13h-4.111V6.33H29.385Zm.554 0h.75c.08 0 .147.02.2.06a.3.3 0 0 1 .107.153l1.378 4.637c.05.189.093.38.126.573.021-.106.043-.207.065-.303.021-.1.046-.19.074-.27l1.569-4.637a.332.332 0 0 1 .107-.144.303.303 0 0 1 .2-.07h.26a.3.3 0 0 1 .196.06.33.33 0 0 1 .112.154l1.56 4.637c.055.16.105.346.148.554l.052-.293a1.89 1.89 0 0 1 .06-.261l1.383-4.637a.296.296 0 0 1 .102-.15.316.316 0 0 1 .2-.064h.703l-2.08 6.67h-.81l-1.69-5.087a2.819 2.819 0 0 1-.094-.335c-.028.112-.057.224-.088.335L32.829 13h-.81l-2.08-6.67Zm14.338 0v.735h-3.202V9.28h2.593v.707h-2.593v2.277h3.202V13h-4.11V6.33h4.11Zm7.081 3.337c0 .5-.079.954-.237 1.364-.158.41-.382.76-.67 1.052a3.017 3.017 0 0 1-1.038.68c-.404.158-.85.237-1.341.237h-2.495V6.33h2.495c.49 0 .937.08 1.34.24.404.159.75.386 1.039.68.288.293.512.643.67 1.053.158.41.237.864.237 1.364Zm-.926 0c0-.41-.056-.776-.168-1.1a2.315 2.315 0 0 0-.474-.818 2.026 2.026 0 0 0-.745-.512 2.574 2.574 0 0 0-.973-.177h-1.588v5.21h1.588c.357 0 .681-.06.973-.178.291-.118.54-.287.745-.507.205-.224.363-.497.474-.82.112-.322.168-.688.168-1.098Zm10.151 0c0 .5-.08.959-.237 1.378a3.02 3.02 0 0 1-1.713 1.778 3.522 3.522 0 0 1-1.341.247 3.52 3.52 0 0 1-1.34-.247 3.03 3.03 0 0 1-1.71-1.778 3.866 3.866 0 0 1-.237-1.378c0-.5.08-.958.238-1.373.158-.42.381-.78.67-1.08a3 3 0 0 1 1.038-.708c.404-.168.85-.251 1.34-.251.491 0 .938.083 1.342.25.406.169.754.404 1.042.709.289.3.512.66.67 1.08.159.415.238.873.238 1.373Zm-.926 0c0-.41-.056-.778-.168-1.103a2.31 2.31 0 0 0-.475-.824 2.048 2.048 0 0 0-.745-.522 2.528 2.528 0 0 0-.977-.181c-.357 0-.681.06-.973.18a2.09 2.09 0 0 0-.75.523 2.31 2.31 0 0 0-.474.824 3.388 3.388 0 0 0-.168 1.103c0 .41.056.777.168 1.103.111.323.27.598.474.824.208.224.458.396.75.517.292.118.616.177.973.177.36 0 .686-.06.977-.177.292-.121.54-.293.745-.517a2.36 2.36 0 0 0 .475-.824 3.38 3.38 0 0 0 .168-1.103Zm2.624-3.338c.08 0 .14.01.177.033.04.018.085.059.135.12l3.864 5.028a3.165 3.165 0 0 1-.024-.456V6.33h.792V13h-.457a.403.403 0 0 1-.181-.037.466.466 0 0 1-.14-.126l-3.859-5.023c.011.144.018.288.019.433V13h-.792V6.33h.466v-.001Z"/></svg>
              </a>
            </div>
            <div className="c-header-social__col">
              <div className="c-header-social__wrap">
                <a href="https://www.linkedin.com/company/refactco" className="c-link" target='_blank' aria-label="Refact LinkedIn" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M23 0H1C.4 0 0 .4 0 1v22c0 .6.4 1 1 1h22c.6 0 1-.4 1-1V1c0-.6-.4-1-1-1ZM7.1 20.5H3.6V9h3.6v11.5h-.1ZM5.3 7.4c-1.1 0-2.1-.9-2.1-2.1 0-1.1.9-2.1 2.1-2.1 1.1 0 2.1.9 2.1 2.1 0 1.2-.9 2.1-2.1 2.1Zm15.2 13.1h-3.6v-5.6c0-1.3 0-3-1.8-3-1.9 0-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6c.5-.9 1.6-1.8 3.4-1.8 3.6 0 4.3 2.4 4.3 5.5v6.2Z"/></svg>
                </a>
                <a href="https://github.com/refactco" className="c-link" target='_blank' aria-label="Refact Github" rel="noreferrer">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" fill="none" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M12 .3C5.4.3 0 5.7 0 12.3c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.2-.7 0-.7 0-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2 0-.4-.5-1.6.2-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.6 3.3-1.2 3.3-1.2.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.7 18.6.3 12 .3Z" clipRule="evenodd"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="c-header-wrap__col">
        <div className="c-header-wrap__post">
          <div className="c-header-wrap__text">latest Updates</div>
          {latestProject && (
            <div className='c-header__project'>
              <a href={latestProject.cta.url} target={latestProject.cta.target} rel="noopener noreferrer" className="c-project__img">
                <GatsbyImage image={latestProject.cover.localFile.childImageSharp.gatsbyImageData} alt={latestProject.cover.altText} />
              </a>
              <h5 className='c-project__title'>{latestProject.title}</h5>
              <div className='c-project__text'>{latestProject.description}</div>
              <a href={latestProject.cta.url} target={latestProject.cta.target} rel="nofollow, noopener" className='c-btn--secondary'>
                {latestProject.cta.title}
                <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="12" cy="12" r="12" fill="#59CC51"/>
                <path d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z" fill="white"/>
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className='site-header js-site-header'>
      <sticky-header class="refact-section">
        <header className={mobileNavClassName}>
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
                {window.location.pathname === '/contact/' ? (
                  null
                ) : (
                  <div className='c-header-cta'>
                    <Link to="/contact">Work with Us</Link>
                  </div>
                )}
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
      </sticky-header>
    </div>
    </>
  )
}
export default Header
