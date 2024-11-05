import { graphql } from 'gatsby';
import React from 'react';
import Seo from '../../components/seo/seo';
import ServiceHero from '../../components/service-hero/service-hero';
import ServiceLayout from '../../components/service-layout/service-layout';
import ServiceSubItemList from '../../components/service-sub-item-list/service-sub-item-list';

const ServiceProductDevelopmentPage = ({ data }) => {
  const serviceContent = data.wpPage.template.pageBuilder.pageBuilder;
  const serviceTemplate = serviceContent.find(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_Services'
  );

  const currentService = serviceTemplate.services.find(
    (service) =>
      service.slug === 'product-development' ||
      service.title === 'Product Development'
  );

  return (
    <ServiceLayout>
      <ServiceHero
        title={currentService.title}
        description={currentService.desc}
      />
      <ServiceSubItemList subList={currentService.subList} />
    </ServiceLayout>
  );
};

export default ServiceProductDevelopmentPage;

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
      seo {
        title
        metaDesc
      }
      template {
        ... on WpTemplate_PageBuilder {
          pageBuilder {
            fieldGroupName
            pageBuilder {
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
