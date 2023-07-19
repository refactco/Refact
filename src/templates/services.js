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
        <div className="c-page-header">
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
                        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="none" viewBox="0 0 10 10"><path fill="#59CC51" d="M9 9.796c.44 0 .796-.356.796-.796V1.838a.796.796 0 1 0-1.591 0v6.366H1.838a.796.796 0 1 0 0 1.592H9ZM.437 1.562l8 8 1.126-1.125-8-8L.437 1.562Z"/></svg>
                        {item.title}
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
                  subList {
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
`