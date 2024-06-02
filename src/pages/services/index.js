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
        logo={
          '<svg xmlns="http://www.w3.org/2000/svg" width="108" fill="none" viewBox="0 0 108 24"><g fill="#2E9E62" fill-rule="evenodd" clip-rule="evenodd"><path d="m21.133 10.285-.108.029c-1.209.098-1.193.096-1.732-.968a123.979 123.979 0 0 0-1.905-3.601 6.408 6.408 0 0 0-.61-.864 2.803 2.803 0 0 0-1.267-.97 2.835 2.835 0 0 0-1.598-.127c0 .135-.023.28-.023.413v16.001c-.001.215.012.43.039.642.076.827.352 1.152 1.196 1.3.383.07.773.118 1.177.175v1.3H4.85v-1.3c.355-.055.715-.104 1.075-.167 1.004-.174 1.314-.52 1.314-1.56V3.778c-1.036-.13-1.969.027-2.628.83a15.227 15.227 0 0 0-1.438 2.12c-.602 1.074-1.127 2.192-1.677 3.31a.411.411 0 0 1-.444.302c-.339-.026-.675 0-1.051 0l.457-7.838h20.237l.439 7.783ZM32.533 22.432v1.196H22.297v-1.21c.263-.035.526-.064.767-.11a.842.842 0 0 0 .599-.233.824.824 0 0 0 .253-.584.784.784 0 0 0 0-.136V11.018a.586.586 0 0 0-.232-.413c-.365-.26-.772-.486-1.143-.75a.589.589 0 0 1-.218-.381c-.04-.669-.026-.669.652-.85 1.94-.52 3.871-1.04 5.813-1.54a9.398 9.398 0 0 1 1.48-.133v4.551c.151-.468.327-.928.526-1.378.317-.697.699-1.363 1.14-1.99a3.157 3.157 0 0 1 1.668-1.063 3.185 3.185 0 0 1 1.98.132.648.648 0 0 1 .481.7c-.029 1.38 0 2.764 0 4.202h-.584a16.563 16.563 0 0 0-3.907.297c-1.42.343-1.42.343-1.42 1.779v6.262c-.005.214.006.429.032.642.006.247.097.485.258.674.161.19.382.318.628.366.467.125.95.208 1.463.307ZM51.64 17.865a.324.324 0 0 0-.071 0 5.49 5.49 0 0 1-3.117 1.934 5.535 5.535 0 0 1-3.65-.451c-1.664-.96-2.452-3.22-2.266-4.874h9.614c-.034-.658-.03-1.274-.113-1.87-.29-2.264-1.33-4.048-3.52-4.961a8.535 8.535 0 0 0-2.54-.593 8.126 8.126 0 0 0-3.857.502 8.046 8.046 0 0 0-3.169 2.234c-1.732 1.94-2.286 4.272-2.123 6.797a7.542 7.542 0 0 0 1.926 4.82c2.066 2.22 4.7 2.844 7.622 2.43 2.988-.408 4.788-2.236 5.68-5.013.207-.648.199-.648-.416-.955Zm-8.423-8.394c.192-.365.467-.682.804-.923a1.427 1.427 0 0 1 2.06.445c.227.362.384.763.463 1.183.147.925.218 1.86.323 2.83h-4.373c.063-1.23.16-2.435.723-3.535ZM61.388 7.021v2.955c.108-.125.205-.232.297-.344 1.487-1.742 3.343-2.702 5.698-2.6 2.615.09 4.307 1.685 4.362 4.275.066 3.167.03 6.337.032 9.513 0 1.331.131 1.471 1.469 1.604a.813.813 0 0 1 .137.034v1.207h-9.375v-1.246c.166-.02.34-.042.51-.07.836-.136.99-.33.99-1.142v-8.82c0-1.213-.58-1.803-1.813-1.767-.693.053-1.383.146-2.065.281-.221.034-.318.138-.318.383v9.99c0 .78.23 1.012 1.138 1.088.346.028.417.156.417.46v.827H53.46v-1.23l.722-.104c.626-.107.863-.367.863-.99V11.028a.626.626 0 0 0-.232-.414 3.71 3.71 0 0 0-.835-.52.836.836 0 0 1-.478-.414.822.822 0 0 1-.048-.626.408.408 0 0 1 .21-.28 374.682 374.682 0 0 1 6.515-1.725 5.013 5.013 0 0 1 1.212-.029ZM94.833 18.375h1.254c.228 0 .304.094.354.289A5.775 5.775 0 0 0 98 21.428c.473.48 1.061.833 1.71 1.028a4.073 4.073 0 0 0 1.998.088 1.927 1.927 0 0 0 1.092-.495c.3-.276.504-.64.58-1.04.08-.41.016-.836-.184-1.204a1.83 1.83 0 0 0-.91-.821c-.623-.302-1.301-.497-1.952-.742-.839-.322-1.735-.582-2.555-.98-2.273-1.108-3.138-2.824-2.965-5.136.19-2.48 1.506-4.07 3.9-4.73 2.565-.721 5.311-.434 7.667.8a.565.565 0 0 1 .355.583c-.021 1.056 0 2.107 0 3.191h-1.406c-.153-.434-.263-.874-.452-1.282a3.682 3.682 0 0 0-1.438-1.74 3.735 3.735 0 0 0-2.194-.582c-1.346.073-2.145 1.084-1.782 2.262a1.578 1.578 0 0 0 .883.994c.604.275 1.253.52 1.863.756.941.377 1.905.703 2.823 1.134 2.149 1.01 3.077 2.754 2.956 5.071-.129 2.385-1.314 4.067-3.611 4.822a11.412 11.412 0 0 1-8.92-.664.789.789 0 0 1-.497-.809c0-1.04-.083-2.08-.128-3.12-.008-.143 0-.268 0-.437ZM92.747 21.618a.74.74 0 0 1-.132 0 .816.816 0 0 1-.738-.52.793.793 0 0 1-.05-.312 6.228 6.228 0 0 1-.047-.939V.587c0-.174-.03-.34-.03-.587-2.696.237-5.24.988-7.841 1.389-.074 1.016-.074 1.016.762 1.433.176.096.36.187.546.26a.417.417 0 0 1 .29.455v4.415a4.303 4.303 0 0 0-2.224-.756c-3.043-.164-5.608.78-7.359 3.341a9.433 9.433 0 0 0-1.524 5.1 10.768 10.768 0 0 0 .801 4.868c.4.93 1.044 1.738 1.865 2.34a5.807 5.807 0 0 0 5.779.625 5.74 5.74 0 0 0 2.33-1.886c.087-.13.187-.26.308-.413v2.754c.393.028.789.028 1.182 0 2.192-.307 4.376-.637 6.57-.973a.346.346 0 0 0 .24-.208v-1.126h-.728Zm-7.577-1.126c-1.55.351-2.72-.148-3.498-1.53a8.322 8.322 0 0 1-.928-3.66 10.247 10.247 0 0 1 .418-4.136c.178-.497.44-.96.773-1.373a2.227 2.227 0 0 1 1.026-.699 2.248 2.248 0 0 1 1.244-.044 1.3 1.3 0 0 1 .689.31c.192.17.33.392.394.639.134.47.21.955.229 1.443v4.187c0 1.467 0 2.941.016 4.42.005.282-.103.38-.363.443Z"></path></g></svg>'
        }
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
