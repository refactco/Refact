import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import AboutLogo from '../components/about-logo/about-logo';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

const WorkPage = ({ data }) => {
  const workContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = workContent.find(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader'
  );
  const clientSection = workContent.find(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_Clients'
  );
  const textButton = workContent.find(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_TextButton'
  );

  // function scrollToSection(sectionId) {
  //   const section = document.getElementById(sectionId);

  //   if (section) {
  //     section.scrollIntoView({
  //       behavior: 'smooth',
  //     });
  //   }
  // }
  return (
    <Layout>
      {heroSection && (
        <ContainerBox className="o-section c-section--page-header is-work">
          <div className="c-page-header is-full">
            {heroSection.subtitle && (
              <div className="c-page-header__sub-title">
                {heroSection.subtitle}
              </div>
            )}
            <h1 className="c-page-header__title" style={{ maxWidth: 742 }}>
              {heroSection.title}
            </h1>
            <div
              className="c-page-header__text"
              dangerouslySetInnerHTML={{ __html: heroSection.text }}
              style={{ maxWidth: 796 }}
            ></div>
            {heroSection.cta && (
              <div className="c-page-header__cta">
                {heroSection.cta.target === '_blank' ? (
                  <a
                    href={heroSection.cta.url}
                    target="_blank"
                    rel="nofollow, noreferrer"
                    className="c-btn"
                  >
                    {heroSection.cta.title}
                  </a>
                ) : (
                  <Link to={heroSection.cta.url} className="c-btn">
                    {heroSection.cta.title}
                  </Link>
                )}
              </div>
            )}
            {/* <button
              className="c-page-header__scroll"
              onClick={() => scrollToSection('work-section')}
            >
              Explore Our Case Studies
              <div className="c-cta__arrow">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  viewBox="0 0 14 13"
                  fill="none"
                >
                  <path
                    d="M6.42146 12.5785C6.74098 12.8981 7.25902 12.8981 7.57854 12.5785L12.7854 7.37166C13.1049 7.05214 13.1049 6.5341 12.7854 6.21458C12.4659 5.89506 11.9479 5.89506 11.6283 6.21458L7 10.8429L2.37166 6.21458C2.05214 5.89506 1.5341 5.89506 1.21458 6.21458C0.89506 6.5341 0.89506 7.05214 1.21458 7.37166L6.42146 12.5785ZM6.18182 -3.57639e-08L6.18182 12L7.81818 12L7.81818 3.57639e-08L6.18182 -3.57639e-08Z"
                    fill="white"
                  />
                </svg>
              </div>
            </button> */}
          </div>
        </ContainerBox>
      )}
      <ContainerBox className="o-section c-section--works" id="work-section">
        <div className="c-work-page">
          {workContent.map((section) => {
            switch (section.fieldGroupName) {
              case 'Template_PageBuilder_Pagebuilder_PageBuilder_FeaturedPost':
                const featuredPost = section;

                return (
                  <div key={section.id} className="row c-work__featured">
                    <div className="col-md-7 c-work-featured__col">
                      {featuredPost.cta.target === '_blank' ? (
                        <a
                          href={featuredPost.cta.url}
                          target={featuredPost.cta.target}
                          rel="noopener noreferrer"
                          className="c-project__img"
                        >
                          <GatsbyImage
                            image={
                              featuredPost.cover.localFile.childImageSharp
                                .gatsbyImageData
                            }
                            alt={featuredPost.cover.altText}
                          />
                        </a>
                      ) : (
                        <Link
                          to={featuredPost.cta.url}
                          className="c-project__img"
                        >
                          <GatsbyImage
                            image={
                              featuredPost.cover.localFile.childImageSharp
                                .gatsbyImageData
                            }
                            alt={featuredPost.cover.altText}
                          />
                        </Link>
                      )}
                    </div>
                    <div className="col-md-5 c-work-featured__col">
                      <div className="c-work-featured__info">
                        <h5 className="c-project__title">
                          {featuredPost.title}
                        </h5>
                        <div className="c-project__text">
                          {featuredPost.description}
                        </div>
                        {featuredPost.cta.target === '_blank' ? (
                          <a
                            href={featuredPost.cta.url}
                            target={featuredPost.cta.target}
                            rel="nofollow, noreferrer"
                            className="c-btn--secondary"
                          >
                            {featuredPost.cta.title}
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
                            to={featuredPost.cta.url}
                            className="c-btn--secondary"
                          >
                            {featuredPost.cta.title}
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
                );
              case 'Template_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial':
                const featuredTestimonial = section;

                return (
                  <div key={section.id} className="c-work__testimonial">
                    <div className="c-work-testimonial__text">
                      <div className="c-work-testimonial__quote">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="80"
                          fill="none"
                          viewBox="0 0 80 60"
                        >
                          <path
                            fill="#C6F0C2"
                            d="m25 10 5-10H20C8.95 0 0 13.95 0 25v35h35V25H15c0-15 10-15 10-15Zm35 15c0-15 10-15 10-15l5-10H65C53.95 0 45 13.95 45 25v35h35V25H60Z"
                          />
                        </svg>
                      </div>
                      <span>{featuredTestimonial.text}</span>
                    </div>
                    <div className="c-work-testimonial__info">
                      {featuredTestimonial.logo && (
                        <div
                          className="c-work-testimonial__logo"
                          dangerouslySetInnerHTML={{
                            __html: featuredTestimonial.logo,
                          }}
                        ></div>
                      )}
                      {featuredTestimonial.name && (
                        <div className="c-work-testimonial__name">
                          {featuredTestimonial.name}
                        </div>
                      )}
                      {featuredTestimonial.position && (
                        <div className="c-work-testimonial__position">
                          {featuredTestimonial.position}
                        </div>
                      )}
                    </div>
                  </div>
                );
              case 'Template_PageBuilder_Pagebuilder_PageBuilder_Project':
                const projectSection = section;

                return (
                  <div key={section.id} className="c-project">
                    {projectSection.projectList && (
                      <div className="c-project__items">
                        {projectSection.projectList.map((project, index) => (
                          <div className="c-project__item" key={index}>
                            {project.cta.target === '_blank' ? (
                              <a
                                href={project.cta.url}
                                target={project.cta.target}
                                rel="noopener noreferrer"
                                className="c-project__img"
                              >
                                <GatsbyImage
                                  image={
                                    project.cover.localFile.childImageSharp
                                      .gatsbyImageData
                                  }
                                  alt={project.cover.altText}
                                />
                              </a>
                            ) : (
                              <Link
                                to={project.cta.url}
                                className="c-project__img"
                              >
                                <GatsbyImage
                                  image={
                                    project.cover.localFile.childImageSharp
                                      .gatsbyImageData
                                  }
                                  alt={project.cover.altText}
                                />
                              </Link>
                            )}
                            <h5 className="c-project__title">
                              {project.title}
                            </h5>
                            <div className="c-project__text">
                              {project.description}
                            </div>
                            {project.cta.target === '_blank' ? (
                              <a
                                href={project.cta.url}
                                target={project.cta.target}
                                rel="nofollow, noreferrer"
                                className="c-btn--secondary"
                              >
                                {project.cta.title}
                                <svg
                                  width="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="12"
                                    fill="#59CC51"
                                  />
                                  <path
                                    d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                                    fill="white"
                                  />
                                </svg>
                              </a>
                            ) : (
                              <Link
                                to={project.cta.url}
                                className="c-btn--secondary"
                              >
                                {project.cta.title}
                                <svg
                                  width="24"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle
                                    cx="12"
                                    cy="12"
                                    r="12"
                                    fill="#59CC51"
                                  />
                                  <path
                                    d="M17.5303 12.5303C17.8232 12.2374 17.8232 11.7626 17.5303 11.4697L12.7574 6.6967C12.4645 6.40381 11.9896 6.40381 11.6967 6.6967C11.4038 6.98959 11.4038 7.46447 11.6967 7.75736L15.9393 12L11.6967 16.2426C11.4038 16.5355 11.4038 17.0104 11.6967 17.3033C11.9896 17.5962 12.4645 17.5962 12.7574 17.3033L17.5303 12.5303ZM6 12.75L17 12.75V11.25L6 11.25V12.75Z"
                                    fill="white"
                                  />
                                </svg>
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      </ContainerBox>
      {clientSection && (
        <ContainerBox className="c-section--client is-work">
          <div className="c-client">
            {clientSection.title && (
              <h3 className="c-section__title">{clientSection.title}</h3>
            )}
            {clientSection.description && (
              <div
                className="c-client__text"
                dangerouslySetInnerHTML={{ __html: clientSection.description }}
              ></div>
            )}
            {clientSection.showClientLogos && <AboutLogo />}
          </div>
        </ContainerBox>
      )}
      {textButton && (
        <ContainerBox className="c-section--textbutton is-work">
          <div className="c-team">
            {textButton.title && (
              <h3 className="c-section__title">{textButton.title}</h3>
            )}
            {textButton.description && (
              <div
                className="c-team__description"
                dangerouslySetInnerHTML={{ __html: textButton.description }}
              ></div>
            )}
            {textButton.cta && (
              <div className="c-textbutton__cta">
                {textButton.cta.target === '_blank' ? (
                  <a
                    href={textButton.cta.url}
                    target="_blank"
                    rel="nofollow, noreferrer"
                    className="c-btn"
                  >
                    {textButton.cta.title}
                  </a>
                ) : (
                  <Link to={textButton.cta.url} className="c-btn">
                    {textButton.cta.title}
                  </Link>
                )}
              </div>
            )}
          </div>
        </ContainerBox>
      )}
    </Layout>
  );
};

export default WorkPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} />
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
                cta {
                  target
                  title
                  url
                }
                title
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
                projectList {
                  cover {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  cta {
                    target
                    title
                    url
                  }
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
            }
          }
        }
      }
    }
  }
`;
