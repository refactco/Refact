import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"
import SharePage from "../components/share-page/share-page"

const ServicesPage = ({data}) => {
  const servicesContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = servicesContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader');
  const textSection = servicesContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_TextSection');
  const textButton = servicesContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_TextButton');
  return (
    <Layout>
      {heroSection && (
        <ContainerBox className="o-section c-section--page-header">
        <div className="c-page-header is-full">
          {heroSection.subtitle && (
          <div className="c-page-header__sub-title">
            {heroSection.subtitle}
          </div>
          )}
          <h1 className="c-page-header__title" style={{maxWidth: 934}}>
            {heroSection.title}
          </h1>
          <div className="c-page-header__text" dangerouslySetInnerHTML={{__html:heroSection.text}}></div>
          {heroSection.cta && (
          <div className="c-page-header__cta">
            {heroSection.cta.target === '_blank' ? 
              <a href={heroSection.cta.url} target='_blank' rel="nofollow, noreferrer" className="c-btn">
                {heroSection.cta.title}
              </a>
              : 
              <Link to={heroSection.cta.url} className="c-btn">
                {heroSection.cta.title}
              </Link>
              }
          </div>
          )}
        </div>
      </ContainerBox>
      )}
      {textSection && (
        <ContainerBox className="c-section--team">
          <div className="c-team">
            {textSection.title && (
              <h3 className="c-section__title">{textSection.title}</h3>
            )}
            {textSection.description && (
              <div className="c-team__description mb-0" dangerouslySetInnerHTML={{__html:textSection.description}}></div>
            )}
            </div>
        </ContainerBox>
      )}
      {textButton && (
        <ContainerBox className="c-section--textbutton">
          <div className="c-team">
            {textButton.title && (
              <h3 className="c-section__title">{textButton.title}</h3>
            )}
            {textButton.cta && (
              <div className="c-textbutton__cta">
                {textButton.cta.target === '_blank' ?
                  <a href={textButton.cta.url} target='_blank' rel="nofollow, noreferrer" className="c-btn">
                    {textButton.cta.title}
                  </a>
                  :
                  <Link to={textButton.cta.url} className="c-btn">
                    {textButton.cta.title}
                  </Link>
                }
                <div className="c-textbutton-cta__share">
                  <div className="c-textbutton-cta__share-title">Share this survey:</div>
                  <SharePage postUrl={typeof window !== 'undefined' ? window.location.href : ''} postTitle={textButton.title} />
                </div>
              </div>
            )}
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
    wpPage(slug: {eq: "survey"}) {
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
                cta {
                  target
                  title
                  url
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                description
                fieldGroupName
                title
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                fieldGroupName
                title
                cta {
                  target
                  title
                  url
                }
              }
            }
          }
        }
      }
    }
  }
`