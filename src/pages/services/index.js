import { Link, graphql } from 'gatsby';
import React from 'react';
import ContainerBox from '../../components/container-box/container-box';
import Seo from '../../components/seo/seo';
import ServiceLayout from '../../components/service-layout/service-layout';
import Testimonial from '../../components/testimonial/testimonial';

const ServicesPage = ({ data }) => {
  const servicesContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = servicesContent.find(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader'
  );
  const serviceSection = servicesContent.find(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_Services'
  );

  return (
    <ServiceLayout>
      {heroSection && (
        <ContainerBox className="o-section c-section--page-header is-services">
          <div className="c-page-header">
            <div className="c-page-header__sub-title">
              {heroSection.subtitle}
            </div>
            <h1 className="c-page-header__title">{heroSection.title}</h1>
            <div
              className="c-page-header__text"
              dangerouslySetInnerHTML={{ __html: heroSection.text }}
            ></div>
          </div>
        </ContainerBox>
      )}
      <ContainerBox className="c-services-items">
        <div className="c-services-items__wrapper">
          <div className="c-services-items__list">
            {serviceSection.services.map((service, index) => (
              <Link to={`/services/${service.slug}`} className="c-services-items__item" key={index} title={service.title}>
                <div>
                  <span className="c-services-items__index">
                    {index < 9 ? `0${index + 1}` : index + 1}
                  </span>
                  <h2 className="c-services-items__title">{service.title}</h2>
                  <p
                    className="c-services-items__description"
                    dangerouslySetInnerHTML={{
                      __html: service.desc,
                    }}
                  >
                    {/* {service.desc} */}
                  </p>
                </div>
                <p className="c-services-items__link c-btn--secondary">
                  Discover More
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle cx="12" cy="12" r="12" fill="#31A329" />
                    <path
                      d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                      fill="white"
                    />
                  </svg>
                </p>
              </Link>
            ))}
          </div>
        </div>
      </ContainerBox>
      <Testimonial
        text="Trends has grown 5x since we started working with Refact. The agency
            is so great that we decided to continue working with them even after
            Trends was launched. They are responsible for nearly 100% of all our
            engineering work."
        name="Scott Garcia"
        position="Product Manager at Trends"
      />
    </ServiceLayout>
  );
};

export default ServicesPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} />
    </>
  );
}

export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "services" }) {
      id
      content
      seo {
        title
        metaDesc
      }
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            fieldGroupName
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                fieldGroupName
                fullWidth
                subtitle
                text
                title
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services {
                fieldGroupName
                services {
                  desc
                  fieldGroupName
                  title
                  slug
                  subList {
                    ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services_services_SubList_Item {
                      activateSubitem
                      fieldGroupName
                      subItem {
                        fieldGroupName
                        title
                      }
                      title
                      description
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
