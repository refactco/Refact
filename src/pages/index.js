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
                  projectList {
                    cover {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    description
                    fieldGroupName
                    title
                    cta {
                      target
                      title
                      url
                    }
                  }
                  cta {
                    target
                    title
                    url
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial {
                  fieldGroupName
                  logo
                  name
                  position
                  text
                }
              }
            }
          }
        }
      }
    }
  `);
  const pageBuilder = data.homePage.template.pageBuilder.pageBuilder;
  const heroSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Hero');
  const capabilitiesSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites');
  const projectsSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Project');
  const testimonials = pageBuilder.filter(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial');

  return (
    <Layout>
      {heroSection && (
        <ContainerBox className='c-section--hero'>
          <div className="c-hero">
            {/* {heroSection.title && (
              <h1 className="c-hero__title" style={{maxWidth: 850}}>{heroSection.title}</h1>
            )} */}
            {heroSection.text && (
              <h1 className="c-hero__text">{heroSection.text}</h1>
            )}
            <Link to="/services" className='c-btn'>What we do</Link>
          </div>
        </ContainerBox>
      )}
      <ContainerBox className='c-section--company-logo'>
        <div className="c-hero-logo__wrapper" style={{overflow: 'hidden'}}>
          <CompanyLogo />
          <CompanyLogoReverse />
        </div>
      </ContainerBox>
      {capabilitiesSection && (
        <ContainerBox className='c-section--capabilites pb-small'>
          <div className="c-capabilites">
            {capabilitiesSection.title && (
              <h3 className="c-section__title">{capabilitiesSection.title}</h3>
            )}
            {capabilitiesSection.description && (
              <div className="c-capabilites__description">{capabilitiesSection.description}</div>
            )}
            {capabilitiesSection.items && (
              <div className="row c-capabilites__items">
                {capabilitiesSection.items.map((item, index) => (
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
      )}
      {testimonials.map((testimonial, index) => (
       <React.Fragment key={index}>
        <ContainerBox className={`c-section--featured-testimonial is-testimonial-${index}`}>
          <div className="c-work__testimonial">
            <div className="c-work-testimonial__text">
              <div className="c-work-testimonial__quote">
                <svg xmlns="http://www.w3.org/2000/svg" width="64" fill="none" viewBox="0 0 64 48"><path fill="#C6F0C2" d="m20 8 4-8h-8C7.16 0 0 11.16 0 20v28h28V20H12c0-12 8-12 8-12Zm28 12c0-12 8-12 8-12l4-8h-8c-8.84 0-16 11.16-16 20v28h28V20H48Z" opacity=".4"/></svg>
              </div>
              <span>{testimonial.text}</span>
            </div>
            <div className="c-work-testimonial__info">
              {testimonial.logo && (
                <div className="c-work-testimonial__logo" dangerouslySetInnerHTML={{__html: testimonial.logo}}></div>
              )}
              {testimonial.name && (
                <div className="c-work-testimonial__name">{testimonial.name}</div>
              )}
              {testimonial.position && (
                <div className="c-work-testimonial__position">{testimonial.position}</div>
              )}
            </div>
          </div>
        </ContainerBox>
        {index === 0 && projectsSection && (
          <ContainerBox className='c-section--project'>
            <div className="c-project">
              {projectsSection.projectList && (
                <div className="c-project__items">
                  {projectsSection.projectList.map((project, index) => {
                    let imgClasses = "c-project__imgs media media--hover-effect";

                    // Add specific classes based on index
                    if (index === 0 || index === 4) {
                      imgClasses += " media--square";
                    } else if (index === 2) {
                      imgClasses += " media--landscape";
                    } else {
                      imgClasses += " media--box";
                    }
                    return(
                      <div className={`c-project__item c-project__item-${index}`} key={index}>
                        {project.cta.target === '_blank' ?
                          <a href={project.cta.url} target={project.cta.target} rel="noopener noreferrer" className={imgClasses}>
                            <GatsbyImage image={project.cover.localFile.childImageSharp.gatsbyImageData} alt={project.cover.altText} />
                          </a>
                          :
                          <Link to={project.cta.url} className={imgClasses}>
                            <GatsbyImage image={project.cover.localFile.childImageSharp.gatsbyImageData} alt={project.cover.altText} />
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
        )}
       </React.Fragment>
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
