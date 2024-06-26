import { useStaticQuery, graphql, Link } from 'gatsby';
import React from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import CompanyLogo from '../components/company-logo/company-logo';
import Seo from '../components/seo/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import CompanyLogoReverse from '../components/company-logo/company-logo-reverse';

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
                  video {
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
                  videoMobile{
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
                  logo
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
  const renderSection = (section, index) => {
    switch (section.fieldGroupName) {
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Hero':
        return (
          <ContainerBox key={index}  className='c-section--hero'>
            {/* <div className="c-hero__video">
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
            </div> */}
            <div className="c-hero">
              {/* {heroSection.title && (
                <h1 className="c-hero__title" style={{maxWidth: 850}}>{heroSection.title}</h1>
              )} */}
              {section.text && (
                <h1 className="c-hero__text">{section.text}</h1>
              )}
              <Link to="/services" className='c-btn'>What we do</Link>
            </div>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_LogoSection':
        return (
          <ContainerBox key={index} className='c-section--company-logo'>
            <div className="c-hero-logo__wrapper" style={{overflow: 'hidden'}}>
              <CompanyLogo />
              <CompanyLogoReverse />
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
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites':
        return (
          <ContainerBox key={index} className='c-section--capabilites pb-small'>
            <div className="c-capabilites">
              {section.title && (
                <h3 className="c-section__title">{section.title}</h3>
              )}
              {section.description && (
                <div className="c-capabilites__description">{section.description}</div>
              )}
              {section.items && (
                <div className="row c-capabilites__items">
                  {section.items.map((item, index) => (
                    <div className="col-md-6 c-capabilites__item"  key={index}>
                      <div className="c-capabilites__number">0{index+1}</div>
                      <div className="c-capabilites__title">{item.title}</div>
                      <div className="c-capabilites__text">{item.text}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </ContainerBox>
        )
      case 'Template_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial':
        return (
          <ContainerBox key={index} className={`c-section--featured-testimonial is-testimonial-${index}`}>
            <div className="c-work__testimonial">
              <div className="c-work-testimonial__text">
                <div className="c-work-testimonial__quote">
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" fill="none" viewBox="0 0 64 48"><path fill="#C6F0C2" d="m20 8 4-8h-8C7.16 0 0 11.16 0 20v28h28V20H12c0-12 8-12 8-12Zm28 12c0-12 8-12 8-12l4-8h-8c-8.84 0-16 11.16-16 20v28h28V20H48Z" opacity=".4"/></svg>
                </div>
                <span>{section.text}</span>
              </div>
              <div className="c-work-testimonial__info">
                {section.logo && (
                  <div className="c-work-testimonial__logo" dangerouslySetInnerHTML={{__html: section.logo}}></div>
                )}
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
            <ContainerBox key={index} className={`c-section--project is-${section.displayMode}`}>
              <div className="c-project">
                {section.projectList && (
                  <div className="c-project__items">
                    {section.projectList.map((project, index) => {
                      let imgClasses = "c-project__imgs media media--hover-effect";
                      if (section.displayMode === 'normal') {
                        if (index === 0) {
                          imgClasses += " media--square";
                        } else {
                          imgClasses += " media--box";
                        }
                      }
                      else{
                        if (index === 0) {
                          imgClasses += " media--box";
                        } else {
                          imgClasses += " media--square";
                        }
                      }
                      return(
                        <div className={`c-project__item c-project__item-${section.displayMode === 'normal' ? index : index + 3} is-media-${project.mediaSettings}`} key={index}>
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
                                  >
                                  <source src={project.video.localFile.url} type={project.video.mimeType} />
                                  Your browser does not support the video tag.
                                </video>
                              )}
                            </Link>
                          }
                          <h5 className='c-project__title'>
                          {project.cta.target === '_blank' ?
                            <a href={project.cta.url} target={project.cta.target} rel="nofollow, noopener" className='c-link c-link--blog'>
                            {project.title}
                            </a>
                            :
                            <Link to={project.cta.url} className='c-link c-link--blog'>
                            {project.title}
                            </Link>
                          }
                          </h5>
                          <div className='c-project__text'>{project.description}</div>
                          {project.cta.target === '_blank' ?
                            <a href={project.cta.url} target={project.cta.target} rel="nofollow, noopener" className='c-btn--secondary'>
                              {project.cta.title}
                              <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="#59CC51"/>
                                <path d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z" fill="white"/>
                              </svg>
                            </a>
                            :
                            <Link to={project.cta.url} className='c-btn--secondary'>
                              {project.cta.title}
                              <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="12" r="12" fill="#59CC51"/>
                                <path d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z" fill="white"/>
                              </svg>
                            </Link>
                          }
                          
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </ContainerBox>
          )
      default:
        return null
    }
  }
  return (
    <Layout>
      {pageBuilder && (
        pageBuilder.map((section, index) => (
          renderSection(section, index)
        ))
      )}
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
