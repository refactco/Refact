import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout/layout"
import Seo from "../components/seo/seo"
import ContainerBox from "../components/container-box/container-box"
import { GatsbyImage } from "gatsby-plugin-image"
import LoadMoreButton from "../components/load-more-button/load-more-button"

const CategoryPage = ({data}) => {
  const { name } = data.wpCategory;
  const [postCount, setPostCount] = useState(4);
  const totalPosts = data.wpCategory.posts.nodes.length;
  const posts = data.wpCategory.posts.nodes.slice(0, postCount);
  const handleLoadMore = () => {
    setPostCount(postCount + 4);
  };
  const hasMorePosts = postCount < totalPosts;
  return (
    <Layout>
      <ContainerBox className="c-section--headline">
        <div className="c-headline">
          <h1 className="c-headline__title">
            {name}
          </h1>
        </div>
      </ContainerBox>
      <ContainerBox className="c-section--blog is-tag-archive">
        <div className="c-blog-posts">
          <div className="c-blog__list">
            {posts.map((node) => (
              <div className="c-blog__item" key={node.id}>
                <div className="c-blog-post__image">
                  <Link to={node.uri} className="c-link">
                    <GatsbyImage image={node.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={node.featuredImage.node.altText} />
                  </Link>
                </div>
                <div className="c-blog-post__category">
                  {node.tags.nodes.map((tag) => (
                    <Link to={tag.link} className="c-link c-link--category" key={tag.id}>{tag.name}</Link>
                  ))}
                </div>
            
                <h3 className="c-blog-post__title">
                  <Link to={node.uri} className="c-link c-link--blog">{node.title}</Link>
                </h3>
            
                <div className="c-blog-post__cta">
                  <Link to={node.uri} className="c-btn--secondary">
                    Read More
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#59CC51"/><path fill="#fff" d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"/></svg>
                  </Link>
                </div>
            </div>
            ))}
          </div>
          <div className="c-blog__cta">
            <LoadMoreButton onClick={handleLoadMore} disabled={!hasMorePosts} />
          </div>
        </div>
      </ContainerBox>
    </Layout>
  )
}

export default CategoryPage

export function Head({ data }) {
  const cat = data.wpCategory;
  return (
    <>
      <Seo title={"Category: " + cat.name + " | Refact"} description={cat.seo.metaDesc} />
    </>
  )
}


export const pageQuery = graphql`
  query($catId: String!) {
    wpCategory(id: { eq: $catId }) {
      id
      name
      description
      seo {
        title
        metaDesc
      }
      posts {
        nodes {
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
          tags {
            nodes {
              name
              link
              id
            }
          }
        }
      }
    }
  }
`