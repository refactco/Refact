import React from 'react';
import { Link } from 'gatsby';

const FooterLanding = () => {

  return (
    <footer className="o-section c-section--footer is-landing">
      <div className='o-section__wrapper'>
        <div className='row c-footer__landing'>
          <div className='col-md-6 c-footer-landing__col'>
            <div className='c-footer-landing__wrap'>
              <div className='c-footer-landing__text'>Powered by</div>
              <div className="c-logo">
                <svg width="70" viewBox="0 0 104 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g fill="#fff"><path d="M12.023 13.774c2.24-1.234 3.357-3.385 3.351-6.454a6.79 6.79 0 0 0-1.911-5.143A7.577 7.577 0 0 0 8.028.351H.571v23.143h4.672v-8.477h2.323l3.488 8.46h5.023v-.223l-4.054-9.48ZM10 10.191a2.46 2.46 0 0 1-2.1.926H5.243V4.26h2.743c1.811 0 2.717 1.16 2.717 3.48A4.046 4.046 0 0 1 10 10.191ZM32.44 4.217v-3.9H19.18V23.46h8.34l1.114-3.883h-4.782v-6.103h6.531l1.08-3.77h-7.611V4.216h8.588ZM49.36 4.217v-3.9H39.074L36.503 9.43v14.048h4.68V14.05h7.269v-3.883h-7.27V4.217h8.178ZM60.683.317h-4.286L49.163 23.46h4.946l1.243-4.74h6.377l1.234 4.74h4.997L60.683.317Zm-4.286 14.52 2.169-8.254 2.16 8.254h-4.329ZM79.677 19.012a3.078 3.078 0 0 1-2.571.857 2.837 2.837 0 0 1-2.649-1.286c-.514-.857-.771-2.443-.771-4.74V9.472a9.283 9.283 0 0 1 .857-4.286A2.845 2.845 0 0 1 77.2 3.875a2.983 2.983 0 0 1 2.571.925 6.257 6.257 0 0 1 .755 3.429h4.697a9.6 9.6 0 0 0-2.237-6.077C81.674.737 79.763.035 77.234.035a7.414 7.414 0 0 0-6 2.571c-1.44 1.714-2.16 4.166-2.16 7.354v3.892c0 3.197.695 5.648 2.092 7.371a7.278 7.278 0 0 0 6 2.572 7.835 7.835 0 0 0 5.785-2.04c1.372-1.355 2.109-3.352 2.229-6H80.5a5.915 5.915 0 0 1-.823 3.257ZM87.563.317v3.9h5.631v19.26h4.689V4.217h5.726v-3.9H87.563Z"/></g></svg>
              </div>
              <span>
                Copyright &copy; {new Date().getFullYear()} Refact, LLC.
              </span>
            </div>
          </div>
          <div className='col-md-6 c-footer-landing__col'>
            <div className='c-footer-landing__nav'>
              <Link to="/privacy-policy" className="c-link">
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
export default FooterLanding