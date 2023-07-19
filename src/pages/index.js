import { useStaticQuery, graphql } from 'gatsby';
import React from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import CompanyLogo from '../components/company-logo/company-logo';
import { PopupButton } from "react-calendly";
import Slider from "react-slick";
import Seo from '../components/seo/seo';
import { GatsbyImage } from 'gatsby-plugin-image';

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
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials {
                  fieldGroupName
                  title
                  testimonialsList {
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
    }
  `);
  const pageBuilder = data.homePage.template.pageBuilder.pageBuilder;
  const heroSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Hero');
  const capabilitiesSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Capabilites');
  const projectsSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Project');
  const testimonialsSection = pageBuilder.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Testimonials');

  const settings = {
    speed: 500,
    infinite: true,
    arrows: false,
    dots: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1
  };
  return (
    <Layout>
      {heroSection && (
        <ContainerBox className='c-section--hero'>
          <div className="c-hero">
            {heroSection.title && (
              <h1 className="c-hero__title">{heroSection.title}</h1>
            )}
            {heroSection.text && (
              <div className="c-hero__text">{heroSection.text}</div>
            )}
            {typeof window !== 'undefined' && (
              <>
              <PopupButton
                url="https://calendly.com/saeedreza/30min"
                rootElement={document.body}
                text="Work with Us"
                className='c-btn'
              />
              </>
            )}
            <CompanyLogo />
          </div>
        </ContainerBox>
      )}
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
      {projectsSection && (
        <ContainerBox className='c-section--project'>
          <div className="c-project">
            {projectsSection.projectList && (
              <div className="c-project__items">
                {projectsSection.projectList.map((project, index) => (
                  <div className='c-project__item' key={index}>
                    <a href={project.cta.url} target={project.cta.target} rel="noopener noreferrer" className="c-project__img">
                      <GatsbyImage image={project.cover.localFile.childImageSharp.gatsbyImageData} alt={project.cover.altText} />
                    </a>
                    <h5 className='c-project__title'>{project.title}</h5>
                    <div className='c-project__text'>{project.description}</div>
                    <a href={project.cta.url} target={project.cta.target} rel="nofollow, noopener" className='c-btn--secondary'>
                      {project.cta.title}
                      <svg width="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="12" fill="#59CC51"/>
                      <path d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z" fill="white"/>
                      </svg>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>
        </ContainerBox>
      )}
      {testimonialsSection && (
          <ContainerBox className='c-section--testimonials'>
            <div className="c-testimonials">
              {testimonialsSection.title && (
                <h3 className="c-section__title">{testimonialsSection.title}</h3>
              )}
              {testimonialsSection.testimonialsList && (
                <Slider {...settings} className="c-testimonials__items">
                  {testimonialsSection.testimonialsList.map((item, index) => (
                    <div className="c-testimonials__item" key={index}>
                      <div className="c-testimonials__text">
                        <svg width="80" viewBox="0 0 80 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="m25 10 5-10H20C8.95 0 0 13.95 0 25v35h35V25H15c0-15 10-15 10-15Zm35 15c0-15 10-15 10-15l5-10H65C53.95 0 45 13.95 45 25v35h35V25H60Z" fill="#C6F0C2"/></svg>
                        <div>{item.text}</div>
                      </div>
                      <div className="c-testimonials__customers">
                        {item.logo && (
                          <div className="c-customers__logo" dangerouslySetInnerHTML={{__html:item.logo}}></div>
                        )}
                        {item.name && (
                          <div className="c-customers__name">
                            {item.name}
                          </div>
                        )}
                        {item.position && (
                          <div className="c-customers__name c-customers__name--position">
                            {item.position}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </Slider>
              )}
            </div>
          </ContainerBox>
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
