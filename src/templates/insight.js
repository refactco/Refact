import React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"
import { GatsbyImage } from "gatsby-plugin-image"



const InsightPage = ({data}) => {

  return (
    <Layout>
      <ContainerBox className="c-section--page-header t-light">
        <div className="c-page-header">
          <h1 className="c-page-header__title">
            Insight
          </h1>
        </div>
      </ContainerBox>
      <ContainerBox className="c-section--blog">
        <div className="c-blog-posts">
          {data.allWpPost.edges.map(({ node }) => (
            <div className="c-blog__item">
              <div className="c-blog-post__image">
                <Link to={node.slug} className="c-link">
                <GatsbyImage image={node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={node.featuredImage.node.altText} />
                </Link>
              </div>
              <div className="c-blog-post__category">
                <Link to="/" className="c-link c-link--category">Blog</Link>
              </div>
          
              <h3 className="c-blog-post__title">
                <Link to={node.slug} className="c-link c-link--blog">{node.title}</Link>
              </h3>
          
              <div className="c-blog-post__cta">
                <Link to={node.slug} className="c-btn--secondary">
                  Read More
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#59CC51"/><path fill="#fff" d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"/></svg>
                </Link>
              </div>
          </div>
          ))}
        </div>
      </ContainerBox>
    </Layout>
  )
}

export default InsightPage


export function Head() {
  return (
    <>
      <Seo title="Insight | Refact" />
    </>
  )
}

export const pageQuery = graphql`
  query {
    allWpPost(sort: {date: DESC}) {
      edges {
        node {
          id
          title
          slug
          uri
          excerpt
          date(formatString: "MMMM DD, YYYY")
          featuredImage {
            node {
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
              altText
            }
          }
        }
      }
    }
  }
`