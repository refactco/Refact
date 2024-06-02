import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import ContainerBox from '../../components/container-box/container-box';
import Seo from '../../components/seo/seo';
import ServiceHero from '../../components/service-hero/service-hero';
import ServiceLayout from '../../components/service-layout/service-layout';
import ServiceSubItemList from '../../components/service-sub-item-list/service-sub-item-list';

const ServiceProductDesignPage = ({ data }) => {
  const serviceContent = data.wpPage.template.pageBuilder.pageBuilder;
  const workContent = data.workContent.template.pageBuilder.pageBuilder;
  const serviceTemplate = serviceContent.find(
    (section) =>
      section.fieldGroupName ===
      'Template_PageBuilder_Pagebuilder_PageBuilder_Services'
  );

  console.log({ serviceTemplate });
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
      <ContainerBox className="o-section c-section--works" id="work-section">
        <div className="c-work-page">
          {workContent.slice(0, 3).map((section) => {
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
    </ServiceLayout>
  );
};

export default ServiceProductDesignPage;

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
                cta {
                  target
                  title
                  url
                }
                title
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
            }
          }
        }
      }
    }
  }
`;
