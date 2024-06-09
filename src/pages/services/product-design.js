import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import ContainerBox from '../../components/container-box/container-box';
import Seo from '../../components/seo/seo';
import ServiceHero from '../../components/service-hero/service-hero';
import ServiceLayout from '../../components/service-layout/service-layout';
import ServiceSubItemList from '../../components/service-sub-item-list/service-sub-item-list';

const renderSection = (section, index) => {
  // console.log('Section:', section)
  switch (section.fieldGroupName) {
    case 'Template_PageBuilder_Pagebuilder_PageBuilder_FeaturedPost':
      return (
        <ContainerBox key={index} className='c-section--project is-featured'>
          <div className="c-project">
            <div className="row c-work__featured">
              <div className={`col-md-7 c-work-featured__col is-media-${section.mediaSettings}`}>
                {section.cta.target === '_blank' ?
                  <a href={section.cta.url} target={section.cta.target} rel="noopener noreferrer" className="c-project__img media media--hover-effect media--landscape">
                    {(section.mediaSettings === 'image' || section.mediaSettings === 'both') && (
                      <GatsbyImage image={section.cover.localFile.childImageSharp.gatsbyImageData} alt={section.cover.altText} />
                    )}
                    {(section.mediaSettings === 'video' || section.mediaSettings === 'both') && (
                      <video
                        src={section.video.localFile.url}
                        alt={section.video.altText}
                        width={section.video.width}
                        height={section.video.height}
                        autoPlay
                        muted
                        loop
                      />
                    )}
                  </a>
                  :
                  <Link to={section.cta.url} className="c-project__img media media--hover-effect media--landscape">
                    {(section.mediaSettings === 'image' || section.mediaSettings === 'both') && (
                      <GatsbyImage image={section.cover.localFile.childImageSharp.gatsbyImageData} alt={section.cover.altText} />
                    )}
                    {(section.mediaSettings === 'video' || section.mediaSettings === 'both') && (
                      <video
                        src={section.video.localFile.url}
                        alt={section.video.altText}
                        width={section.video.width}
                        height={section.video.height}
                        autoPlay
                        muted
                        loop
                      />
                    )}
                  </Link>
                }
              </div>
              <div className="col-md-5 c-work-featured__col">
                <div className="c-work-featured__info">
                  <h5 className="c-project__title">
                    {section.title}
                  </h5>
                  <div className="c-project__text">
                    {section.description}
                  </div>
                  {section.cta.target === '_blank' ? (
                    <a
                      href={section.cta.url}
                      target={section.cta.target}
                      rel="nofollow, noreferrer"
                      className="c-btn--secondary"
                    >
                      {section.cta.title}
                      <svg
                        width="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#59CC51" />
                        <path
                          d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                          fill="white"
                        />
                      </svg>
                    </a>
                  ) : (
                    <Link
                      to={section.cta.url}
                      className="c-btn--secondary"
                    >
                      {section.cta.title}
                      <svg
                        width="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <circle cx="12" cy="12" r="12" fill="#59CC51" />
                        <path
                          d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                          fill="white"
                        />
                      </svg>
                    </Link>
                  )}
                </div>
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
                              src={project.video.localFile.url}
                              alt={project.video.altText}
                              width={project.video.width}
                              height={project.video.height}
                              autoPlay
                              muted
                              loop
                            />
                          )}
                        </a>
                        :
                        <Link to={project.cta.url} className={imgClasses}>
                          {(project.mediaSettings === 'image' || project.mediaSettings === 'both') && (
                            <GatsbyImage image={project.cover.localFile.childImageSharp.gatsbyImageData} alt={project.cover.altText} />
                          )}
                          {(project.mediaSettings === 'video' || project.mediaSettings === 'both') && (
                            <video
                              src={project.video.localFile.url}
                              alt={project.video.altText}
                              width={project.video.width}
                              height={project.video.height}
                              autoPlay
                              muted
                              loop
                            />
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
const ServiceProductDesignPage = ({ data }) => {
  const serviceContent = data.wpPage.template.pageBuilder.pageBuilder;
  const workContent = data.workContent.template.pageBuilder.pageBuilder;
  const serviceTemplate = serviceContent.find(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_Services'
  );

  // console.log({ serviceTemplate });
  const currentService = serviceTemplate.services.find(
    (service) =>
      service.slug === 'product-design' || service.title === 'Product Design'
  );

  return (
    <ServiceLayout>
      <ServiceHero
        title={currentService.title}
        description={currentService.desc}
      />
      <ServiceSubItemList subList={currentService.subList} />
      {workContent && (
        workContent.slice(0, 4).map((section, index) => (
          renderSection(section, index)
        ))
      )}
      <section class="o-section c-section--spacer c-section--spacer-1"><div class="o-section__wrapper"><div class="c-spacer"></div></div></section>
    </ServiceLayout>
  );
};

export default ServiceProductDesignPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} />
      <body className="workpage" />
    </>
  );
}

export const pageQuery = graphql`
  query {
    wpPage(slug: { eq: "services" }) {
      seo {
        title
        metaDesc
      }
      template {
        ... on WpTemplate_PageBuilder {
          pageBuilder {
            fieldGroupName
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services {
                fieldGroupName
                services {
                  desc
                  fieldGroupName
                  title
                  slug
                  subList {
                    ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services_services_SubList_Item {
                      activateSubitem
                      fieldGroupName
                      subItem {
                        fieldGroupName
                        title
                      }
                      title
                      description
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
    workContent: wpPage(slug: { eq: "work" }) {
      id
      content
      seo {
        title
        metaDesc
      }
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            fieldGroupName
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeaturedPost {
                description
                fieldGroupName
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
                }
                cta {
                  target
                  title
                  url
                }
                title
                mediaSettings
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
