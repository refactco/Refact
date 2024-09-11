import { graphql } from 'gatsby';
import React from 'react';
import ContainerBox from '../../components/container-box/container-box';
import Seo from '../../components/seo/seo';
import ServiceLayout from '../../components/service-layout/service-layout';
import Button, {BgMode, BtnType} from '../../components/button/button';
import PatternBg from '../../components/patterns/pattern-bg';
import ClutchWidget from '../../components/clutch-widget/clutch-widget';

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
      <ContainerBox className="c-section--services">
        {heroSection && (
          <div className="c-page-header">
            <h1 className="c-page-header__title">{heroSection.title}</h1>
            <div
              className="c-page-header__text"
              dangerouslySetInnerHTML={{ __html: heroSection.text }}
            ></div>
          </div>
        )}
        <div className="c-sf__list">
          {serviceSection.services.map((service, index) => (
            <div className="c-sf-list__items" key={index}>
              <div className='c-sf-list__info'>
                <div className="c-sf__num">0{index+1}</div>
                <div className="c-sf__title">{service.title}</div>
                <div className="c-sf__text" dangerouslySetInnerHTML={{__html: service.desc}} />
              </div>
              <Button 
                url={`/services/${service.slug}`}
                text="Discover More"
                title={`Discover more about ${service.title}`}
                type={BtnType.SECONDARY} 
                bgMode={BgMode.DARK} 
              />
            </div>
          ))}
        </div>
        <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
        <PatternBg pattern="heroPattern" className='is-hero-pattern' />
      </ContainerBox>
      <ContainerBox className='c-section--clutch'>
        <ClutchWidget />
      </ContainerBox>
    </ServiceLayout>
  );
};

export default ServicesPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} featuredImage={post.seo.opengraphImage.localFile.url} />
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
        opengraphImage {
          localFile {
            url
          }
        }
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
