import React from "react"
import { Link, graphql } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Seo from "../components/seo/seo"
import Layout from "../components/layout/layout"
import ShareButton from "../components/share-btn/share-btn"
import CtaPost from "../components/cta-post/cta-post"

const BlogPostTemplate = ({ data }) => {
  const post = data.wpPost;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  console.log(post);
  return (
    <Layout>
      <article className="c-article">
        <header className="c-article__header">
          <div className="c-article__header-wrapper">
            <div className="c-article__meta">
              <div className="c-article__category">
                <Link to="/" className="c-link c-link--category">Blog</Link>
              </div>
              <h1 className="c-article__title">{post.title}</h1>
              <div className="c-article__author">
                <div className="c-article__author-avatar">
                  <img src={post.author.node.avatar.url} alt={post.author.node.firstName} />
                </div>
                <div className="c-article__author-info">
                  <div className="c-article__author-name">
                    {post.author.node.firstName} {post.author.node.lastName}
                  </div>
                  <div className="c-article__author-date">
                    {post.date}
                  </div>
                </div>
              </div>
            </div>
              <div className="c-article__image">
                <GatsbyImage image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={post.featuredImage.node.altText} />
              </div>
          </div>
        </header>

        <div className="c-article__content">
          <div className="c-article__content-wrapper s-content" dangerouslySetInnerHTML={{__html:post.content}}></div>
          <div className="c-article__share">
            <ShareButton postUrl={currentUrl} postTitle={post.title} />
          </div>
        </div>
        <CtaPost />
      </article>
    </Layout>
  )
}

export default BlogPostTemplate

export function Head() {
  return (
    <>
      <Seo  />
    </>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    wpPost(id: {eq: $id}) {
      databaseId
      title
      uri
      id
      slug
      date(formatString: "MMMM DD, YYYY")
      content
      excerpt
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
      author {
        node {
          id
          avatar {
            height
            url
            width
          }
          firstName
          lastName
        }
      }
    }
  }
`