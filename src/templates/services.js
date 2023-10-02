import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"

const ServicesPage = ({data}) => {
  const servicesContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = servicesContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader');
  const serviceSection = servicesContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Services');
  return (
    <Layout>
      {heroSection && (
        <ContainerBox className="o-section c-section--page-header">
        <div className="c-page-header is-full">
          <div className="c-page-header__sub-title">
            {heroSection.subtitle}
          </div>
          <h1 className="c-page-header__title">
            {heroSection.title}
          </h1>
          <div className="c-page-header__text" dangerouslySetInnerHTML={{__html:heroSection.text}}></div>
        </div>
      </ContainerBox>
      )}
      {serviceSection && (
        <ContainerBox className="o-section c-section--services">
          <div className="c-services">
            {serviceSection.services.map((service, index) => (
              <div className="c-services__item" key={index}>
                <h3 className="c-services__title">{service.title}</h3>
                <div className="c-services__desc" dangerouslySetInnerHTML={{__html:service.desc}}></div>
                {service.subList && (
                  <ul className="c-services__sub-list">
                    {service.subList.map((item, index) => (
                      <li className="c-services__sub-list-item" key={index}>
                        <div className="c-services-sub-list__headline">
                          <div className="c-services-sub-list__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" width="9" fill="none" viewBox="0 0 9 2"><path stroke="#59CC51" d="M0 1h9"/></svg>
                          </div>
                          {item.title}
                        </div>
                        {item.activateSubitem && (
                          <ul className="c-services__subitems-list">
                            {item.subItem.map((subItem, index) => (
                              <li className="c-services-subitems__item" key={index}>
                                {subItem.title}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </ContainerBox>
      )}
    </Layout>
  )
}

export default ServicesPage

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title="Services | Refact" description={post.content} />
    </>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "services"}) {
      id
      content
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
                  subList {
                    ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services_services_SubList_Item {
                      activateSubitem
                      fieldGroupName
                      subItem {
                        fieldGroupName
                        title
                      }
                      title
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
`