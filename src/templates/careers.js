import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"
import CareerCategory from "../components/careers-item/careers-item"

const CareerPage = ({data}) => {
  const careerContent = data.wpPage.template.pageBuilder.pageBuilder;
  const heroSection = careerContent.find(section => section.fieldGroupName === 'Template_PageBuilder_Pagebuilder_PageBuilder_PageHeader');
  const careersPost = data.careerPost.nodes;

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
      {careersPost && (
        <ContainerBox className="o-section c-section--careers">
          <div className="c-careers">
            <CareerCategory categorySlug="product" categoryName="Product" careersPost={careersPost} />
            <CareerCategory categorySlug="design" categoryName="Design" careersPost={careersPost} />
            <CareerCategory categorySlug="technology" categoryName="Technology" careersPost={careersPost} />
            <CareerCategory categorySlug="sales-marketing" categoryName="Sales & Marketing" careersPost={careersPost} />
            <CareerCategory categorySlug="others" categoryName="Others" careersPost={careersPost} />
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
      <Seo title={post.seo.title} description={post.seo.metaDesc} featuredImage={post.seo.opengraphImage.localFile.url} />
    </>
  )
}

export const pageQuery = graphql`
  query {
    wpPage(slug: {eq: "careers"}) {
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
            pageBuilder {
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
    careerPost: allWpCareer {
      nodes {
        id
        title
        uri
        slug
        careerCategories {
          nodes {
            id
            slug
            name
          }
        }
        careers {
          experience
          location
        }
      }
    }
  }
`