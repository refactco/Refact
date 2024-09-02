import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import Button, { BgMode, BtnType } from '../components/button/button';
import PatternBg from '../components/patterns/pattern-bg';
import MarqueeLogo from '../components/marquee/marquee';

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
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeaturedPost {
                  description
                  fieldGroupName
                  title
                  cta {
                    target
                    title
                    url
                  }
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
                  mediaSettings
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
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial {
                  fieldGroupName
                  name
                  position
                  text
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
          <ContainerBox key={index} className='c-section--section-title'>
            <div className='c-case-studies__headline'>
              <div className="c-page-header__sub-title c-sf__headline">Case Studies</div>
              <div className="c-sf__desc">
                Every project is unique, but all clients get clear communication and winning results.
              </div>
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
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial':
        return (
          <ContainerBox key={index} className={`c-section--featured-testimonial is-testimonial-${index}`}>
            <div className="c-work__testimonial">
              <div className="c-work-testimonial__text">
                <div className="c-work-testimonial__quote">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" fill="none" viewBox="0 0 64 48"><path fill="#D9EED6" d="m20 8 4-8h-8C7.16 0 0 11.16 0 20v28h28V20H12c0-12 8-12 8-12Zm28 12c0-12 8-12 8-12l4-8h-8c-8.84 0-16 11.16-16 20v28h28V20H48Z" /></svg>
                </div>
                <span dangerouslySetInnerHTML={{__html: section.text}} />
              </div>
              <div className="c-work-testimonial__info">
                {section.name && (
                  <div className="c-work-testimonial__name">{section.name}</div>
                )}
                {section.position && (
                  <div className="c-work-testimonial__position">{section.position}</div>
                )}
              </div>
            </div>
          </ContainerBox>
        )
        case 'Template_PageBuilder_Pagebuilder_PageBuilder_FeaturedPost':
          return (
            <ContainerBox key={index} className='c-section--project is-featured'>
              <div className="c-project">
                <div className="c-project__items">
                  <div className={`c-project__item c-project__item-2 is-media-${section.mediaSettings}`}>
                    {section.cta.target === '_blank' ?
                      <a href={section.cta.url} target={section.cta.target} rel="noopener noreferrer" className="c-project__imgs media media--hover-effect media--landscape">
                        {(section.mediaSettings === 'image' || section.mediaSettings === 'both') && (
                          <GatsbyImage image={section.cover.localFile.childImageSharp.gatsbyImageData} alt={section.cover.altText} />
                        )}
                        {(section.mediaSettings === 'video' || section.mediaSettings === 'both') && (
                          <video
                            alt={section.video.altText}
                            width={section.video.width}
                            height={section.video.height}
                            autoPlay
                            muted
                            loop
                            playsInline
                          >
                            <source src={section.video.localFile.url} type={section.video.mimeType} />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </a>
                      :
                      <Link to={section.cta.url} className="c-project__imgs media media--hover-effect media--landscape">
                       {(section.mediaSettings === 'image' || section.mediaSettings === 'both') && (
                          <GatsbyImage image={section.cover.localFile.childImageSharp.gatsbyImageData} alt={section.cover.altText} />
                        )}
                        {(section.mediaSettings === 'video' || section.mediaSettings === 'both') && (
                          <video
                            alt={section.video.altText}
                            width={section.video.width}
                            height={section.video.height}
                            autoPlay
                            muted
                            loop
                            playsInline
                            >
                            <source src={section.video.localFile.url} type={section.video.mimeType} />
                            Your browser does not support the video tag.
                          </video>
                        )}
                      </Link>
                    }
                    <h5 className='c-project__title'>
                    {section.cta.target === '_blank' ?
                      <a href={section.cta.url} target={section.cta.target} rel="nofollow, noopener" className='c-link c-link--blog'>
                      {section.title}
                      </a>
                      :
                      <Link to={section.cta.url} className='c-link c-link--blog'>
                      {section.title}
                      </Link>
                    }
                    </h5>
                    <div className='c-project__text'>{section.description}</div>
                    {section.cta.target === '_blank' ?
                      <a href={section.cta.url} target={section.cta.target} rel="nofollow, noopener" className='c-btn--secondary'>
                        {section.cta.title}
                        <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="12" fill="#59CC51"/>
                          <path d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z" fill="white"/>
                        </svg>
                      </a>
                      :
                      <Link to={section.cta.url} className='c-btn--secondary'>
                        {section.cta.title}
                        <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="12" fill="#59CC51"/>
                          <path d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z" fill="white"/>
                        </svg>
                      </Link>
                    }
                  </div>
                </div>
              </div>
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
                              <a href={project.cta.url} target={project.cta.target} rel="noopener noreferrer" className={imgClasses}>
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
                              <Link to={project.cta.url} className={imgClasses}>
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
                <MarqueeLogo />
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
        <PatternBg pattern="heroHighlight" className='is-hero-highlight' />
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
