import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import Button, { BgMode, BtnType } from '../components/button/button';
import PatternBg from '../components/patterns/pattern-bg';
import MarqueeLogo from '../components/marquee/marquee';
import ClutchWidget from '../components/clutch-widget/clutch-widget';

const Homepage = () => {
  const data = useStaticQuery(graphql`
    query HomePageQuery {
      homePage: wpPage(isFrontPage: {eq: true}) {
        id
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Hero {
                  fieldGroupName
                  text
                  title
                  cta {
                    target
                    title
                    url
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
                  description
                  fieldGroupName
                  items {
                    fieldGroupName
                    text
                    title
                  }
                  title
                  cta {
                    target
                    url
                    title
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project {
                  fieldGroupName
                  title
                  subhead
                  projectList {
                    cover {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    video{
                      altText
                      filename
                      localFile {
                        url
                        id
                      }
                      height
                      width
                      mimeType
                    }
                    description
                    fieldGroupName
                    title
                    cta {
                      target
                      title
                      url
                    }
                    mediaSettings
                  }
                  cta {
                    target
                    title
                    url
                  }
                  displayMode
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_LogoSection {
                  fieldGroupName
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                  desktop
                  fieldGroupName
                  mobile
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                  description
                  fieldGroupName
                  title
                  cta {
                    title
                    target
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  `);
  const pageBuilder = data.homePage.template.pageBuilder.pageBuilder;
  const heroAndCapabilities = pageBuilder.filter(
    section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Hero' || 
               section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites'
  );
  const renderSection = (section, index) => {
    switch (section.fieldGroupName) {
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_LogoSection':
        return (
          <ContainerBox key={index} className='c-section--clutch'>
            <ClutchWidget />
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
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextButton':
        return (
          <ContainerBox key={index} className={`c-section--our-partners`}>
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
              <MarqueeLogo type="partners" speed={30} disableDesktop={true} />
            </div>
            <PatternBg pattern="lightTop" className='is-our-partners' />
          </ContainerBox>
        )
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_Project':
          return (
            <ContainerBox key={index} className={`c-section--project-home`}>
              {section.title && (
                <div className="c-project__header c-section">
                  <h2 className="c-section__title">{section.subhead}</h2>
                  <div className="c-section__desc">
                    {section.title}
                  </div>
                </div>
              )}
              {section.projectList && (
                  <div className="c-projects">
                    {section.projectList.map((project, index) => {
                      let imgClasses = "c-project__imgs media media--hover-effect media--landscape";
                      return(
                        <div className={`c-projects__item c-projects__item-${section.displayMode === 'normal' ? index : index + 3} is-media-${project.mediaSettings}`} key={index}>
                          <div className='c-projects-item__col'>
                            {project.cta.target === '_blank' ?
                              <a href={project.cta.url} target={project.cta.target} rel="noopener noreferrer" className={imgClasses} title={project.title}>
                                {(project.mediaSettings === 'image' || project.mediaSettings === 'both') && (
                                  <GatsbyImage image={project.cover.localFile.childImageSharp.gatsbyImageData} alt={project.cover.altText} />
                                )}
                                {(project.mediaSettings === 'video' || project.mediaSettings === 'both') && (
                                  <video
                                    alt={project.video.altText}
                                    width={project.video.width}
                                    height={project.video.height}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    >
                                      <source src={project.video.localFile.url} type={project.video.mimeType} />
                                      Your browser does not support the video tag.
                                  </video>
                                )}
                              </a>
                              :
                              <Link to={project.cta.url} className={imgClasses} title={project.title}>
                                {(project.mediaSettings === 'image' || project.mediaSettings === 'both') && (
                                  <GatsbyImage image={project.cover.localFile.childImageSharp.gatsbyImageData} alt={project.cover.altText} />
                                )}
                                {(project.mediaSettings === 'video' || project.mediaSettings === 'both') && (
                                  <video
                                    alt={project.video.altText}
                                    width={project.video.width}
                                    height={project.video.height}
                                    autoPlay
                                    muted
                                    loop
                                    playsInline
                                    >
                                    <source src={project.video.localFile.url} type={project.video.mimeType} />
                                    Your browser does not support the video tag.
                                  </video>
                                )}
                              </Link>
                            }
                          </div>
                          <div className='c-projects-item__col'>
                            <div className='c-projects-item__info'>
                              <h4 className='c-project__title'>
                              {project.cta.target === '_blank' ?
                                <a href={project.cta.url} target={project.cta.target} rel="nofollow, noopener" className='c-link c-link--blog'>
                                {project.title}
                                </a>
                                :
                                <Link to={project.cta.url} className='c-link c-link--blog'>
                                {project.title}
                                </Link>
                              }
                              </h4>
                              <div className='c-project__text'>{project.description}</div>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              {section.cta && (
                <div className='c-sf__cta'>
                  <Button 
                    target={section.cta.target} 
                    url={section.cta.url} 
                    text={section.cta.title} 
                    type={BtnType.SECONDARY} 
                    bgMode={BgMode.DARK} 
                  />
                </div>
              )}
              <PatternBg pattern="projectRightPattern" className='is-project-pattern-1' />
              <PatternBg pattern="projectLeftPattern" className='is-project-pattern-2' />
              <PatternBg pattern="projectRightPattern" className='is-project-pattern-3 ' />
              <PatternBg pattern="highlightLeft" className='is-project-pattern-4' />
              <PatternBg pattern="highlightRight" className='is-project-pattern-5' />
            </ContainerBox>
          )
      default:
        return null
    }
  }
  return (
    <Layout>
      <ContainerBox className="c-section--home">
        {heroAndCapabilities.map((section, index) => (
          <React.Fragment key={index}>
            {section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Hero' && (
              <>
                <div className='c-hero__wrapper'>
                  <div className="c-hero">
                    {section.title && (
                      <h1 className="c-hero__title" style={{maxWidth: 710}}>{section.title}</h1>
                    )}
                    {section.text && (
                      <div className="c-hero__text">{section.text}</div>
                    )}
                    {section.cta && (
                      <Button 
                        target={section.cta.target} 
                        url={section.cta.url} 
                        text={section.cta.title} 
                        type={BtnType.PRIMARY} 
                        bgMode={BgMode.DARK} 
                      />
                    )}
                  </div>
                </div>
                <div className='c-marquee__hero'>
                  <MarqueeLogo type="clients" speed={40} />
                </div>
              </>
            )}
            {section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites' && (
              <div className='c-hero__wrapper'>
                <div className="c-sf">
                  {section.items && (
                    <div className="c-sf__list">
                      <div className="c-sf-list__items">
                        {section.title && (
                          <div className="c-section__title">{section.title}</div>
                        )}
                        {section.description && (
                          <div className="c-section__desc" dangerouslySetInnerHTML={{__html: section.description}} />
                        )}
                        {section.cta && (
                        <div className='c-section__cta'>
                          <Button 
                            target={section.cta.target} 
                            url={section.cta.url} 
                            text={section.cta.title} 
                            type={BtnType.SECONDARY} 
                            bgMode={BgMode.DARK}
                          />
                        </div>
                        )}
                      </div>
                      {section.items.map((item, index) => (
                        <div className="c-sf-list__items" key={index}>
                          <div className="c-sf__num">0{index+1}</div>
                          <div className="c-sf__title">{item.title}</div>
                          <div className="c-sf__text" dangerouslySetInnerHTML={{__html: item.text}} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
        <PatternBg pattern="heroPattern" className='is-hero-pattern' />
      </ContainerBox>
      {/* Render other sections normally */}
      {pageBuilder.filter(section => section.fieldGroupName !== 'Template_PageBuilder_Pagebuilder_PageBuilder_Hero' && 
        section.fieldGroupName !== 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites').map((section, index) => (
          renderSection(section, index)
      ))}
    </Layout>
  )
}
export default Homepage

export function Head() {
  return (
    <>
      <Seo />
      <body className="home" />
    </>
  )
}
