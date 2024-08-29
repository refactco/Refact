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
                    <div className="c-tools__details">
                      {item.image && (
                        <div className="c-tools-item__image">
                          {item.cta ? (
                            <>
                            {item.cta.target === '_blank' ?
                              <a href={item.cta.url} target={item.cta.target} rel="noopener noreferrer" className="c-btn--secondary">
                                <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
                              </a>
                              :
                              <Link to={item.cta.url} className="c-btn--secondary">
                                <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
                              </Link>
                            }
                            </>
                          ):
                          (
                            <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
                          )}
                          {item.badge && (
                            <div className="c-tools-item__badge">{item.badge}</div>
                          )}
                        </div>
                      )}
                      <div className="c-tools-item__info">
                        <h2 className="c-tools__item-title">
                        {item.cta ? (
                          <>
                          {item.cta.target === '_blank' ?
                          <a href={item.cta.url} target={item.cta.target} rel="noopener noreferrer">
                            {item.title}
                          </a>
                          :
                          <Link to={item.cta.url}>
                            {item.title}
                          </Link>
                        }
                          </>
                        ):
                        (
                          <>{item.title}</>
                        )}
                        </h2>
                        {item.description && (
                          <div className="c-tools__item-desc" dangerouslySetInnerHTML={{__html:item.description}}></div>
                        )}
                      </div>
                    </div>
                      <div className="c-tools-item__cta">
                        {item.github && (
                          <a href={item.github} target="_blank" rel="noopener noreferrer" className="c-btn c-btn--github c-btn--green">
                            <svg xmlns="http://www.w3.org/2000/svg" width="32" fill="none" viewBox="0 0 32 32"><path fill="currentColor" d="M15.988 2.385C8.259 2.382 2 8.638 2 16.36c0 6.106 3.916 11.297 9.369 13.203.734.184.622-.338.622-.694v-2.422c-4.241.497-4.413-2.31-4.697-2.778-.575-.981-1.935-1.231-1.528-1.7.965-.497 1.95.125 3.09 1.81.825 1.221 2.435 1.015 3.25.812.178-.734.56-1.39 1.085-1.9-4.394-.787-6.225-3.469-6.225-6.656 0-1.547.509-2.969 1.509-4.116-.637-1.89.06-3.51.153-3.75 1.816-.162 3.703 1.3 3.85 1.416 1.031-.278 2.21-.425 3.528-.425 1.325 0 2.506.153 3.547.434.353-.269 2.103-1.525 3.79-1.372.091.24.773 1.822.173 3.688 1.012 1.15 1.528 2.584 1.528 4.134 0 3.194-1.844 5.878-6.25 6.653a3.982 3.982 0 0 1 1.19 2.844v3.516c.025.28 0 .559.47.559 5.534-1.866 9.518-7.094 9.518-13.253 0-7.725-6.263-13.978-13.985-13.978Z"/></svg>
                            Download
                          </a>
                        )}
                       {item.cta && (
                        <>
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
                        </>
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
      <Seo title={post.seo.title} description={post.seo.metaDesc} featuredImage={post.seo.opengraphImage.localFile.url} />
      <body className="is-toolkit-page" />
    </>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "toolkit"}) {
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
                  github
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