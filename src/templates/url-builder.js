import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"
import Layout from "../components/layout/layout"
import CampaignURLGenerator from "../components/campaign-url-generator/campaign-url-generator"

const UrlBuilder = ({data}) => {
  const urlBuilder = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = urlBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader');



  return (
    <Layout>
      {heroSection && (
        <ContainerBox className="o-section c-section--page-header is-url-builder">
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
      <CampaignURLGenerator />
    </Layout>
  )
}

export default UrlBuilder

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title="Campaign URL Builder | Refact" description={post.content} />
    </>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "campaign-url-builder"}) {
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
                title
                text
                subtitle
              }
            }
          }
        }
      }
    }
  }
`