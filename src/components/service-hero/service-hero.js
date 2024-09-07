import React from 'react';
import CompanyLogo from '../company-logo/company-logo';
import ContainerBox from '../container-box/container-box';
import { Link } from 'gatsby';

const ServiceHero = ({ title, description }) => {
  return (
    <>
      <ContainerBox className="c-section--page-header c-service-hero">
        <div className="c-page-header is-full">
          <Link to="/services" className="c-page-header__sub-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="12" fill="#59CC51" transform="matrix(-1 0 0 1 24 0)"/><path fill="#fff" d="M6.47 12.53a.75.75 0 0 1 0-1.06l4.773-4.773a.75.75 0 0 1 1.06 1.06L8.061 12l4.242 4.243a.75.75 0 0 1-1.06 1.06L6.47 12.53Zm11.53.22H7v-1.5h11v1.5Z"/></svg>{' '}
            Back to Services
          </Link>
          <h1 className="c-page-header__title">
            {title}
          </h1>
          <div
            className="c-page-header__text"
            style={{ maxWidth: 880 }}
            dangerouslySetInnerHTML={{
              __html: description,
            }}
          ></div>
        </div>
      </ContainerBox>
      <ContainerBox className="c-section-services-logo">
        <div className="c-hero-logo__wrapper" style={{overflow: 'hidden'}}>
          <CompanyLogo />
        </div>
      </ContainerBox>
    </>
  );
};

export default ServiceHero;
