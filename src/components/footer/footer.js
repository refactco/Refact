import React, { useEffect, useState } from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import { PopupModal } from 'react-calendly';
import Button, { BgMode, BtnType } from '../button/button';

const Footer = () => {
  const data = useStaticQuery(graphql`
    query FooterQuery {
      footerNav: wpMenuItem(menu: {node: {locations: {eq: MENU_FOOTER}}}) {
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
  const footerNav = data.footerNav.menu.node;
  const [isOpen, setIsOpen] = useState(false);
  const handleLinkClick = () => {
    setIsOpen(true);
  };
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://widget.clutch.co/static/js/widget.js';
      script.async = true;
      script.onload = () => {
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }, []);

    useEffect(() => {
      if (isScriptLoaded) {
        if (window.CLUTCHCO) {
          window.CLUTCHCO.Init();
        }
      }
    }, [isScriptLoaded]);
  return (
    <>
      <footer className="o-section c-section--footer">
        <div className="o-section__wrapper">
          <div className="c-footer">
            <div className="c-footer__main">
              <div className="c-footer__col">
                <div className="c-footer__menu">
                  {typeof window !== 'undefined' && (
                    <ul className='s-footer-nav' id='footer_menu'>
                    {footerNav.menuItems.nodes.map((item, index) => {
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
                              <button className='c-btn-link' style={{ display: "block", margin: "0 auto" }}
                              onClick={handleLinkClick}>
                                {label}
                              </button>
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
                  </div>
                </div>
              <div className="c-footer__col">
                <div className="c-footer-cta">
                  <h4 className="c-footer-cta__title">
                    Got big goals?
                  </h4>
                  <div className="c-footer-cta__text">
                    Whatever stage your project is at, we want to help you make it a huge success.
                  </div>
                  <Button 
                    url='/contact'
                    text='Work with us'
                    type={BtnType.SECONDARY} 
                    bgMode={BgMode.DARK} 
                  />
                </div>
              </div>
            </div>

            <div className="c-footer__copyright">
              <div className="c-copyright__col">
                <div className="c-logo">
                  <Link to="/" aria-label="Refact" title="Refact">
                    <svg width="70" viewBox="0 0 104 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="M12.023 13.774c2.24-1.234 3.357-3.385 3.351-6.454a6.79 6.79 0 0 0-1.911-5.143A7.577 7.577 0 0 0 8.028.351H.571v23.143h4.672v-8.477h2.323l3.488 8.46h5.023v-.223l-4.054-9.48ZM10 10.191a2.46 2.46 0 0 1-2.1.926H5.243V4.26h2.743c1.811 0 2.717 1.16 2.717 3.48A4.046 4.046 0 0 1 10 10.191ZM32.44 4.217v-3.9H19.18V23.46h8.34l1.114-3.883h-4.782v-6.103h6.531l1.08-3.77h-7.611V4.216h8.588ZM49.36 4.217v-3.9H39.074L36.503 9.43v14.048h4.68V14.05h7.269v-3.883h-7.27V4.217h8.178ZM60.683.317h-4.286L49.163 23.46h4.946l1.243-4.74h6.377l1.234 4.74h4.997L60.683.317Zm-4.286 14.52 2.169-8.254 2.16 8.254h-4.329ZM79.677 19.012a3.078 3.078 0 0 1-2.571.857 2.837 2.837 0 0 1-2.649-1.286c-.514-.857-.771-2.443-.771-4.74V9.472a9.283 9.283 0 0 1 .857-4.286A2.845 2.845 0 0 1 77.2 3.875a2.983 2.983 0 0 1 2.571.925 6.257 6.257 0 0 1 .755 3.429h4.697a9.6 9.6 0 0 0-2.237-6.077C81.674.737 79.763.035 77.234.035a7.414 7.414 0 0 0-6 2.571c-1.44 1.714-2.16 4.166-2.16 7.354v3.892c0 3.197.695 5.648 2.092 7.371a7.278 7.278 0 0 0 6 2.572 7.835 7.835 0 0 0 5.785-2.04c1.372-1.355 2.109-3.352 2.229-6H80.5a5.915 5.915 0 0 1-.823 3.257ZM87.563.317v3.9h5.631v19.26h4.689V4.217h5.726v-3.9H87.563Z"/></g></svg>
                  </Link>
                </div>
                <span>
                  Copyright &copy; {new Date().getFullYear()} Refact, LLC.
                </span>
                <Link to="/privacy-policy" title="Privacy Policy" className='c-link'>
                  Privacy Policy
                </Link>
              </div>
              <div className="c-copyright__col has-badges">
                <div className="c-footer__badges">
                  <div className='c-footer-clutch-wrapper'>
                  <div className="clutch-widget"
                    data-url="https://widget.clutch.co"
                    data-widget-type="2"
                    data-height="30"
                    data-nofollow="true"
                    data-expandifr="true"
                    data-clutchcompany-id="1149819"></div>
                  </div>
                  <a href="https://www.designrush.com/agency/profile/refact" title="DesignRush" target="_blank" rel="noreferrer" aria-label="DesignRush">
                    <svg xmlns="http://www.w3.org/2000/svg" width="84" fill="none" viewBox="0 0 84 38"><rect width="84" height="38" fill="#fff" rx="4"/><g><path fill="#003233" d="M28 10.172h3.354c2.7 0 4.582 1.92 4.582 4.395v.043c0 2.475-1.841 4.395-4.582 4.395H28v-8.833Zm3.354 7.04c1.555 0 2.577-1.066 2.577-2.602v-.043c0-1.536-1.022-2.646-2.577-2.646h-1.431v5.292h1.431ZM37.572 10.172h6.504v1.707h-4.582v1.792h4.05v1.707h-4.05v1.835h4.663v1.707h-6.544l-.041-8.748ZM45.221 17.68l1.145-1.365c.778.64 1.596 1.067 2.577 1.067.778 0 1.228-.342 1.228-.811v-.043c0-.512-.328-.768-1.718-1.11-1.718-.469-2.864-.938-2.864-2.688v-.042c0-1.58 1.227-2.646 3.027-2.646 1.227 0 2.332.384 3.19 1.11l-.98 1.493c-.737-.555-1.514-.853-2.25-.853-.737 0-1.105.341-1.105.768v-.043c0 .555.368.768 1.84 1.152 1.76.47 2.7 1.11 2.7 2.603v.043c0 1.75-1.309 2.731-3.15 2.731a5.54 5.54 0 0 1-3.64-1.366ZM53.73 10.172h1.881v8.79h-1.882v-8.79ZM57.41 14.566c0-2.518 1.882-4.566 4.5-4.566 1.555 0 2.455.427 3.355 1.238l-1.187 1.493c-.654-.555-1.227-.896-2.25-.896-1.39 0-2.454 1.237-2.454 2.731v.043c0 1.621 1.064 2.816 2.618 2.816.696 0 1.31-.17 1.8-.555v-1.237h-1.923v-1.664h3.723v3.798c-.9.768-2.086 1.408-3.682 1.408-2.7-.128-4.5-2.006-4.5-4.609ZM67.392 10.172h1.758l4.01 5.377v-5.377H75v8.79h-1.595l-4.173-5.59v5.59h-1.84v-8.79ZM28.341 21.088h3.927c1.105 0 1.923.341 2.495.896.491.512.737 1.195.737 2.006v.042c0 1.409-.737 2.305-1.841 2.731l2.086 3.116h-2.209l-1.84-2.817h-1.514v2.817H28.26v-8.791h.081Zm3.804 4.224c.941 0 1.432-.512 1.432-1.237v-.043c0-.81-.532-1.237-1.472-1.237h-1.882v2.517h1.922ZM37.095 26.08v-5.036h1.882v4.95c0 1.45.695 2.133 1.84 2.133 1.146 0 1.841-.725 1.841-2.133V21h1.882v4.95c0 2.646-1.473 3.969-3.764 3.969-2.29 0-3.681-1.28-3.681-3.84ZM45.89 28.598l1.145-1.366c.777.64 1.595 1.067 2.577 1.067.777 0 1.227-.342 1.227-.811v-.043c0-.512-.327-.768-1.718-1.11-1.718-.469-2.863-.938-2.863-2.688v-.042c0-1.58 1.227-2.646 3.027-2.646 1.227 0 2.331.384 3.19 1.11l-.981 1.493c-.737-.555-1.514-.853-2.25-.853s-1.105.341-1.105.768v-.043c0 .555.369.768 1.841 1.152 1.76.47 2.7 1.11 2.7 2.603v.043c0 1.75-1.31 2.731-3.15 2.731a5.62 5.62 0 0 1-3.64-1.366ZM54.316 21.088h1.882v3.5h3.477v-3.5h1.881v8.79h-1.881V26.38h-3.477v3.5h-1.882v-8.791Z"/><path fill="#59CC51" d="M16.233 22.375c-.047-.047-.047 0 0 0l-.236-.14-.047-.047-5.564-3.938s-.047 0-.047-.047l-.094-.094-.048-.047h-.094L8.5 16.938l3.16.47c.14 0 .188.046.33.093.046 0 .14.047.14.047.142.047.19.094.284.14.094.047.14.094.235.141.047.047.142.094.142.14.047.048.094.048.141.095.094.046.142.093.142.14.141.14.235.281.377.375l2.499 3.516.047.047.236.234Z"/><path fill="#003233" d="m16.233 27.813-.236-.375-.047-.047-7.403-10.453 1.603 1.125.283.187 5.564 3.938h.047l.189.14s.047 0 .047.047l.235-.188 7.497-5.25-7.544 10.5-.047.047-.188.328Z"/><path fill="#59CC51" d="m16.233 20.593-.236-.375-.047-.047-1.84-2.531 1.84.375h.047l.236.046.235-.046 1.792-.422-1.792 2.625v.047l-.235.328ZM24.06 16.89l-2.358.328-.896.14a2.59 2.59 0 0 0-1.791 1.078L16.515 22l-.047.047-.235.328.283-.281.047-.047-.33.328 6.365-4.5 1.462-.984ZM17.412 9.484c0 2.063-3.584 3.141-3.584 5.344-.047.516.094 1.031.33 1.5 0 0-1.367-1.312-1.367-2.719 0-1.406 1.32-3.515 1.32-3.515 0 .937.377 1.219.754 1.265h.047c.425 0 .66-.328.66-.796 0-.47-.518-.938-.518-1.876 0-.89 1.132-2.343 1.132-2.343.801.937 1.226 2.015 1.226 3.14Z"/><path fill="#59CC51" d="M16.421 16.984c-1.131 0-1.98-.89-1.98-1.968v-.047c0-2.39 3.348-2.625 3.348-5.86.094.141.99 1.36.99 2.672 0 1.64-1.556 2.063-1.556 2.86 0 .328.141.562.613.562.047 0 .094 0 .141-.047a2.517 2.517 0 0 0 1.556-2.203c0 .047.472 4.031-3.112 4.031Z"/><path fill="#E5F7E3" d="M17.883 15.203c.047 0 .094 0 .142-.047-.472.14-2.216.563-2.216-.656 0-1.5 2.593-1.828 2.593-3.094 0-.797-.189-1.594-.613-2.297.094.141.99 1.36.99 2.672 0 1.64-1.556 2.063-1.556 2.86.047.328.236.562.66.562ZM16.469 10.328c0 1.172-1.51 1.078-1.604 1.031h.142c.424 0 .66-.328.66-.796 0-.47-.519-.938-.519-1.876 0-.89 1.132-2.343 1.132-2.343a4.187 4.187 0 0 0-.613 1.922c0 1.078.802 1.171.802 2.062Z"/><path fill="#003233" d="m15.526 30.813-1.038-.704h1.273l.425-1.265.377 1.265h1.273l-1.037.703.377 1.22-1.037-.75-1.085.75.472-1.22ZM20.948 30.813l-1.038-.704h1.274l.424-1.265.377 1.265h1.273l-1.037.703.377 1.22-1.037-.75-1.085.75.472-1.22ZM10.15 30.813l-1.037-.704h1.273l.425-1.265.377 1.265h1.273l-1.038.703.378 1.22-1.038-.75-1.037.75.424-1.22Z"/></g></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
export default Footer