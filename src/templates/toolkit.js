import React from "react"
import { Link, graphql } from "gatsby"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"

const ToolsPage = ({data}) => {
  const toolsContent = data.wpPage.template.pageBuilder.pageBuilder;
  const toolsSection = toolsContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_ToolsResources');


  return (
    <Layout>
      {toolsSection && (
        <ContainerBox className="c-section--tools">
          <div className="c-tools">
            <div className="c-section c-section--tools-headline">
              {toolsSection.title && (
                <h1 className="c-tools__title">{toolsSection.title}</h1>
              )}
              {toolsSection.description && (
                <div className="c-tools__desc" dangerouslySetInnerHTML={{__html:toolsSection.description}}></div>
              )}
            </div>
            <div className="row c-tools__list">
              {toolsSection.list.map((item, index) => (
                <div className="col-md-6 c-tools__item" key={index}>
                  <div className="c-tools__wrap">
                    {item.image && (
                      <div className="c-tools-item__image">
                        {item.cta.target === '_blank' ?
                          <a href={item.cta.url} target={item.cta.target} rel="noopener noreferrer" className="c-btn--secondary">
                            <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
                          </a>
                          :
                          <Link to={item.cta.url} className="c-btn--secondary">
                            <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
                          </Link>
                        }
                        {item.badge && (
                          <div className="c-tools-item__badge">{item.badge}</div>
                        )}
                      </div>
                    )}
                    <div className="c-tools-item__info">
                      <h2 className="c-tools__item-title">
                      {item.cta.target === '_blank' ?
                        <a href={item.cta.url} target={item.cta.target} rel="noopener noreferrer">
                          {item.title}
                        </a>
                        :
                        <Link to={item.cta.url}>
                          {item.title}
                        </Link>
                      }
                      </h2>
                      {item.description && (
                        <div className="c-tools__item-desc" dangerouslySetInnerHTML={{__html:item.description}}></div>
                      )}
                      {item.cta && (
                      <div className="c-tools-item__cta">
                        {item.cta.target === '_blank' ?
                          <a href={item.cta.url} target={item.cta.target} rel="noopener noreferrer" className="c-btn--secondary">
                            {item.cta.title}
                            <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="12" fill="#59CC51"/>
                              <path d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z" fill="white"/>
                            </svg>
                          </a>
                          :
                          <Link to={item.cta.url} className="c-btn--secondary">
                            {item.cta.title}
                            <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="12" cy="12" r="12" fill="#59CC51"/>
                              <path d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z" fill="white"/>
                            </svg>
                          </Link>
                        }
                      </div>
                    )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContainerBox>
      )}
    </Layout>
  )
}

export default ToolsPage

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title="Tools & Resources | Refact" description={post.content} />
      <body className="is-toolkit-page" />
    </>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "toolkit"}) {
      id
      content
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            fieldGroupName
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_ToolsResources {
                description
                fieldGroupName
                title
                list {
                  badge
                  cta {
                    target
                    title
                    url
                  }
                  description
                  fieldGroupName
                  image {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
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