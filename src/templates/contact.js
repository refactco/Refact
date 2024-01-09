import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"

const ContactPage = ({data}) => {
  const contactContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = contactContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader');
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
      <ContainerBox className="c-section--contact">
        <div className="c-contact">
          <p>Please add contact form here.</p>
        </div>
      </ContainerBox>
    </Layout>
  )
}

export default ContactPage

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title="Contact | Refact" description={post.content} />
    </>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "contact"}) {
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
                subtitle
                text
                title
              }
            }
          }
        }
      }
    }
  }
`