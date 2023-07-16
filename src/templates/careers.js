import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"

const CareerPage = ({data}) => {
  const careerContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = careerContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader');
  const careersContent = careerContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_Careers');
  return (
    <Layout>
      {heroSection && (
        <ContainerBox className="o-section c-section--page-header">
        <div className="c-page-header">
          <div className="c-page-header__sub-title">
            {heroSection.subtitle}
          </div>
          <h1 className="c-page-header__title">
            {heroSection.title}
          </h1>
          <div className="c-page-header__text" dangerouslySetInnerHTML={{__html:heroSection.text}}></div>
        </div>
      </ContainerBox>
      )}
      {careersContent && (
        <ContainerBox className="o-section c-section--careers">
          <div className="c-careers">
            {careersContent.careerCategories.map((category, index) => (
              <div className="c-careers__category" key={index}>
                <div className="c-careers__category-headline">
                  <h3>{category.name}</h3>
                </div>
                <div className="c-careers__list">
                  {category.careers.nodes.map((career) => (
                    <div className="c-careers__item" key={career.slug}>
                      <div className="c-careers__item-wrap">
                        <div className="c-careers__item-name">
                          <Link to={career.uri} className="c-link c-link--career">
                            {career.title}
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#59CC51"></circle><path fill="#fff" d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"></path></svg>
                          </Link>
                        </div>
                        {career.careers.experience && (
                          <div className="c-careers__item-meta">
                            <div className="c-careers__meta">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><path fill="#31A329" d="M14.25 10.5a.75.75 0 0 1-.75.75h-3a.75.75 0 1 1 0-1.5h3a.75.75 0 0 1 .75.75Zm7.5-3.75v12a1.5 1.5 0 0 1-1.5 1.5H3.75a1.5 1.5 0 0 1-1.5-1.5v-12a1.5 1.5 0 0 1 1.5-1.5H7.5V4.5a2.25 2.25 0 0 1 2.25-2.25h4.5A2.25 2.25 0 0 1 16.5 4.5v.75h3.75a1.5 1.5 0 0 1 1.5 1.5ZM9 5.25h6V4.5a.75.75 0 0 0-.75-.75h-4.5A.75.75 0 0 0 9 4.5v.75Zm11.25 5.4v-3.9H3.75v3.9a17.25 17.25 0 0 0 8.25 2.1 17.25 17.25 0 0 0 8.25-2.1Z"/></svg>
                              {career.careers.experience[1]}
                            </div>
                          </div>
                        )}
                        {career.careers.location && (
                          <div className="c-careers__item-meta">
                            <div className="c-careers__meta">
                              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><path fill="#31A329" d="M12 1.5a8.26 8.26 0 0 0-8.25 8.25c0 7.06 7.5 12.39 7.82 12.614a.75.75 0 0 0 .86 0c.32-.223 7.82-5.555 7.82-12.614A8.26 8.26 0 0 0 12 1.5Zm0 5.25a3 3 0 1 1 0 6 3 3 0 0 1 0-6Z"/></svg>
                              {career.careers.location}
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="c-careers__item-cta">
                        <Link to={career.uri} className="c-btn--secondary">
                          View Detail
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#59CC51"></circle><path fill="#fff" d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"></path></svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                  {category.careers.nodes.length === 0 && (
                    <div className="c-careers__no-result">
                      <p>{careersContent.noResult}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </ContainerBox>
      )}
    </Layout>
  )
}

export default CareerPage


export function Head({data}) {
  const post = data.wpPage;
  return (
    <>
      <Seo title="Careers | Refact" description={post.content} />
    </>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "careers"}) {
      id
      content
      template {
        ... on WpTemplate_PageBuilder {
          templateName
          pageBuilder {
            pageBuilder {
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Careers {
                fieldGroupName
                noResult
                careerCategories {
                  name
                  taxonomyName
                  careers {
                    nodes {
                      title
                      uri
                      slug
                      careers {
                        experience
                        location
                      }
                    }
                  }
                }
              }
              ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                fieldGroupName
                fullWidth
                text
                title
                subtitle
              }
            }
          }
        }
      }
    }
  }
`