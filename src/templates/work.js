import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import PatternBg from '../components/patterns/pattern-bg';
import ClientsLogo from '../components/clients-logo/clients-logo';
import Button, {BgMode, BtnType} from '../components/button/button';

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
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_TextButton':
      return (
        <ContainerBox key={index} className="c-section--textbutton is-work">
          <div className="c-section">
            {section.title && (
              <h3 className="c-section__title">{section.title}</h3>
            )}
            {section.description && (
              <div
                className="c-section__desc"
                dangerouslySetInnerHTML={{ __html: section.description }}
              ></div>
            )}
            {section.cta && (
              <div className="c-section__cta">
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
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_Project':
      return (
        <ContainerBox key={index} className={`c-section--project-home is-work-page`}>
          {section.title && (
            <div className="c-project__header">
              <div className="c-page-header__sub-title c-sf__headline">{section.subhead}</div>
              <div className="c-sf__desc">
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
              <Link to={section.cta.url} className="c-services-items__link c-btn--secondary">
                {section.cta.title}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle cx="12" cy="12" r="12" fill="#31A329" />
                  <path
                    d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                    fill="white"
                  />
                </svg>
              </Link>
            </div>
          )}
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial':
      return (
        <ContainerBox key={index} className={`c-section--featured-testimonial is-testimonial-work is-testimonial-${index}`}>
          <div className="c-work__testimonial">
            <div className="c-work-testimonial__text">
              <div className="c-work-testimonial__star">
                <svg xmlns="http://www.w3.org/2000/svg" width="121" height="19" fill="none" viewBox="0 0 121 19"><path fill="url(#r-1)" d="m9.824.232 2.697 5.484 6.03.88a.415.415 0 0 1 .23.708l-4.363 4.268 1.03 6.027a.413.413 0 0 1-.6.438L9.454 15.19 4.06 18.038a.414.414 0 0 1-.6-.437l1.03-6.03L.124 7.305a.416.416 0 0 1 .23-.708l6.03-.88L9.084.232a.411.411 0 0 1 .74 0Z"/><path fill="url(#r-2)" d="m35.347.232 2.698 5.484 6.03.88a.416.416 0 0 1 .23.708l-4.363 4.268 1.03 6.027a.415.415 0 0 1-.6.438l-5.395-2.846-5.394 2.847a.414.414 0 0 1-.6-.437l1.03-6.03-4.365-4.267a.416.416 0 0 1 .23-.708l6.03-.88 2.7-5.484a.412.412 0 0 1 .74 0Z"/><path fill="url(#r-3)" d="m60.87.232 2.698 5.484 6.03.88a.416.416 0 0 1 .23.708l-4.363 4.268 1.03 6.027a.414.414 0 0 1-.6.438L60.5 15.19l-5.395 2.847a.414.414 0 0 1-.6-.437l1.03-6.03-4.364-4.267a.415.415 0 0 1 .23-.708l6.03-.88L60.13.232a.41.41 0 0 1 .74 0Z"/><path fill="url(#r-4)" d="m86.394.232 2.698 5.484 6.03.88a.415.415 0 0 1 .23.708l-4.363 4.268 1.03 6.027a.414.414 0 0 1-.6.438l-5.395-2.846-5.394 2.847a.414.414 0 0 1-.6-.437l1.03-6.03-4.365-4.267a.416.416 0 0 1 .23-.708l6.03-.88 2.7-5.484a.411.411 0 0 1 .739 0Z"/><path fill="url(#r-5)" d="m111.917.232 2.698 5.484 6.031.88a.416.416 0 0 1 .229.708l-4.363 4.268 1.03 6.027a.417.417 0 0 1-.164.406.41.41 0 0 1-.436.032l-5.395-2.846-5.394 2.847a.411.411 0 0 1-.576-.211.407.407 0 0 1-.024-.226l1.03-6.03-4.364-4.267a.414.414 0 0 1 .022-.614.416.416 0 0 1 .207-.094l6.031-.88 2.699-5.484a.408.408 0 0 1 .588-.17c.065.042.118.1.151.17Z"/><defs><linearGradient id="r-1" x1="9.453" x2="9.453" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stopColor="#31A329"/><stop offset="1" stopColor="#2E8128"/></linearGradient><linearGradient id="r-2" x1="34.977" x2="34.977" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stopColor="#31A329"/><stop offset="1" stopColor="#2E8128"/></linearGradient><linearGradient id="r-3" x1="60.5" x2="60.5" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stopColor="#31A329"/><stop offset="1" stopColor="#2E8128"/></linearGradient><linearGradient id="r-4" x1="86.023" x2="86.023" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stopColor="#31A329"/><stop offset="1" stopColor="#2E8128"/></linearGradient><linearGradient id="r-5" x1="111.547" x2="111.547" y1="0" y2="18.085" gradientUnits="userSpaceOnUse"><stop stopColor="#31A329"/><stop offset="1" stopColor="#2E8128"/></linearGradient></defs></svg>
              </div>
              <span dangerouslySetInnerHTML={{__html: section.text}} />
            </div>
            <div className="c-work-testimonial__info">
              <div className='c-work-testimonial__logo' dangerouslySetInnerHTML={{__html: section.logo}} />
              <div className='c-work-testimonial-info__details'>
                {section.name && (
                  <div className="c-work-testimonial__name">{section.name}</div>
                )}
                {section.position && (
                  <div className="c-work-testimonial__position">{section.position}</div>
                )}
              </div>
            </div>
            <PatternBg pattern="testimonialLeft" className='is-testimonial-left' />
            <PatternBg pattern="testimonialRight" className='is-testimonial-right' />
          </div>
        </ContainerBox>
      )
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_Clients':
      return (
        <ContainerBox key={index} className="c-section--client is-work-page">
          <div className="c-client">
            <div className='c-section'>
              {section.title && (
                <div className="c-section__title">{section.title}</div>
              )}
              {section.description && (
                <h2 className="c-section__desc" dangerouslySetInnerHTML={{__html:section.description}} style={{maxWidth: 750}} />
              )}
            </div>
            {section.showClientLogos && (
              <ClientsLogo />
            )}
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

const WorkPage = ({ data }) => {
  const workContent = data.wpPage.template.pageBuilder.pageBuilder;
  return (
    <Layout>
      {workContent && (
        workContent.map((section, index) => (
          renderSection(section, index)
        ))
      )}
    </Layout>
  );
};

export default WorkPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} featuredImage={post.seo.opengraphImage.localFile.url} />
      <body className="workpage" />
    </>
  );
}

export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "work" }) {
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
                fieldGroupName
                title
                cta {
                  target
                  title
                  url
                }
                description
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial {
                fieldGroupName
                logo
                name
                position
                text
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project {
                fieldGroupName
                cta {
                  target
                  title
                  url
                }
                displayMode
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
                  cta {
                    target
                    title
                    url
                  }
                  mediaSettings
                  description
                  fieldGroupName
                  title
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Clients {
                description
                fieldGroupName
                showClientLogos
                title
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
`;
