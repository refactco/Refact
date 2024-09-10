import React from "react"
import { Link, graphql } from "gatsby"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/layout/layout"
import PatternBg from "../components/patterns/pattern-bg"
import Button, {BgMode, BtnType} from "../components/button/button"
import MarqueeLogo from "../components/marquee/marquee"
import RecommentPlugins from "../components/recomment-plugins/recomment-plugin"

const renderSection = (section, index) => {
  switch (section.fieldGroupName) {
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader':
      return (
        <ContainerBox key={index} className="c-section--work">
          <div className="c-page-header is-full">
            <h1 className="c-page-header__title">
              {section.title}
            </h1>
            <div
              className="c-page-header__text"
              dangerouslySetInnerHTML={{ __html: section.text }}
              style={{ maxWidth: 796 }}
            ></div>
          </div>
          <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
          <PatternBg pattern="pagePattern" className='is-page-pattern' />
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_CtaSection':
      return (
        <ContainerBox key={index} className="c-section--calltoaction">
          <div className="c-calltoaction">
            <h2 className="c-section__title">{section.title}</h2>
            {section.button && (
              <Button 
                target={section.button.target} 
                url={section.button.url} 
                text={section.button.title} 
                type={BtnType.PRIMARY} 
                bgMode={BgMode.LIGHT} 
              />
            )}
            <PatternBg pattern="testimonialRight" className='is-testimonial-right' />
          </div>
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_ToolsResources':
      return (
        <ContainerBox key={index} className="c-section--tools">
          <div className="c-tools">
            <div className="c-section c-section--tools-headline">
              {section.title && (
                <h1 className="c-section__title">{section.title}</h1>
              )}
              {section.description && (
                <div className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}}></div>
              )}
            </div>
            <div className="c-tools__list">
              {section.list.map((item, index) => (
                <div className="c-tools__item" key={index}>
                  <div className="c-tools__wrap">
                    <div className="c-tools__details">
                      {item.image && (
                        <div className="c-tools-item__image">
                          {item.cta ? (
                            <>
                            {item.cta.target === '_blank' ?
                              <a href={item.cta.url} target={item.cta.target} title={item.title} rel="noopener noreferrer" className="c-btn--secondary">
                                <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
                              </a>
                              :
                              <Link to={item.cta.url} className="c-btn--secondary" title={item.title}>
                                <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
                              </Link>
                            }
                            </>
                          ):
                          (
                            <GatsbyImage image={item.image.localFile.childImageSharp.gatsbyImageData} alt={item.image.altText} />
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
                        {item.comingSoonMode ?
                        (
                          <span className="c-tools-comingsoong">Coming Soon</span>
                          ) : (
                          <>
                            {item.github && (
                              <Button 
                                target="_blank" 
                                url={item.github} 
                                text="Download"
                                icon="github"
                                type={BtnType.PRIMARY} 
                                bgMode={BgMode.LIGHT} 
                              />
                            )}
                            {item.wordpress && (
                              <Button 
                                target="_blank" 
                                url={item.wordpress} 
                                text="Download"
                                icon="wordpress"
                                type={BtnType.PRIMARY} 
                                bgMode={BgMode.LIGHT} 
                              />
                            )}
                            {item.cta && (
                              <Button 
                                target={item.cta.target} 
                                url={item.cta.url} 
                                text={item.cta.title} 
                                type={BtnType.SECONDARY} 
                                bgMode={BgMode.LIGHT} 
                              />
                            )}
                          </>
                        )}
                      </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextButton':
      return (
        <ContainerBox key={index} className={`c-section--our-partners is-toolkit`}>
          <div className="c-our-partners">
            <div className='c-section is-center'>
              {section.title && (
              <h2 className='c-section__title'>{section.title}</h2>
              )}
              {section.description && (
              <div className='c-section__desc'>{section.description}</div>
              )}
              {section.cta && (
                <div className='c-section__cta'>
                  <Button 
                    target={section.cta.target} 
                    url={section.cta.url} 
                    text={section.cta.title} 
                    type={BtnType.PRIMARY} 
                    bgMode={BgMode.LIGHT} 
                  />
                </div>
              )}
            </div>
            <MarqueeLogo type="partners" speed={50} disableDesktop={true} />
          </div>
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_LogoSection':
      return (
        <ContainerBox key={index} className='c-section--plugins'>
          <div className='c-plugins'>
            <div className="c-section">
              <h2 className="c-section__title">Recommended Plugins</h2>
              <div className="c-section__desc">Other tools we use to deliver features websites need.</div>
            </div>
            <RecommentPlugins />
          </div>
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_Spacer':
      return (
        <ContainerBox key={index} className={`c-section--spacer c-section--spacer-${index}`}>
          <div className="c-spacer"></div>
          <style>
            {`
              .c-section--spacer-${index} .c-spacer {
                height: ${section.mobile}rem;
              }
              @media (min-width: 992px) {
                .c-section--spacer-${index} .c-spacer {
                  height: ${section.desktop}rem;
                }
              }
            `}
          </style>
        </ContainerBox>
      )
    default:
      return null
  }
}
const ToolsPage = ({data}) => {

  const toolkitContent = data.wpPage.template.pageBuilder.pageBuilder;
  return (
    <Layout>
      {toolkitContent && (
        toolkitContent.map((section, index) => (
          renderSection(section, index)
        ))
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
                  comingSoonMode
                  wordpress
                }
              }
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
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                description
                fieldGroupName
                cta {
                  title
                  target
                  url
                }
                title
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CtaSection {
                fieldGroupName
                title
                button {
                  target
                  title
                  url
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_LogoSection {
                fieldGroupName
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                desktop
                fieldGroupName
                mobile
              }
            }
          }
        }
      }
    }
  }
`