import React from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo/seo"
import Layout from "../components/layout/layout"
import ContainerBox from "../components/container-box/container-box"

const BlogPostTemplate = ({ data }) => {
  const post = data.singlePost;
  return (
    <Layout>
       <ContainerBox className="o-section c-section--page-careers">
        <header className="c-career__header">
            <div className="c-career__header-wrapper">
              <div className="c-page-header">
                <div className="c-page-header__sub-title">Careers</div>
                <h1 className="c-page-header__title">{post.title}</h1>
                <div className="c-career__meta">
                  {post.careers.experience && (
                    <div className="c-career__meta-item">
                      <span className="c-career__meta-label">Experience</span>
                      <span className="c-career__meta-value">{post.careers.experience[1]}</span>
                    </div>
                  )}
                  {post.careers.location && (
                  <div className="c-career__meta-item">
                    <span className="c-career__meta-label">Location</span>
                    <span className="c-career__meta-value">{post.careers.location}</span>
                  </div>
                  )}
                  {post.careers.type && (
                  <div className="c-career__meta-item">
                    <span className="c-career__meta-label">Type</span>
                    <span className="c-career__meta-value">{post.careers.type[1]}</span>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </header>
      </ContainerBox>
      <ContainerBox className="c-section--career-single">
        <article className="c-career">
          <div className="c-career__content js-career-main">
            <div className="c-career__content-wrapper s-content js-career-content" dangerouslySetInnerHTML={{__html:post.content}}></div>
            <div className="c-career__sidebar js-career-sidebar">
              <div className="c-career__sidebar-wrapper">
              {post.careers.url ? (
                <a 
                  href={post.careers.url.url} 
                  target={post.careers.url.target === '_blank' ? '_blank' : '_self'} 
                  rel={post.careers.url.target === '_blank' ? 'noreferrer' : ''}
                  className="js-career-change c-btn c-btn--primary c-btn--green"
                >
                  Apply Now
                </a>
              ) : (
                <a 
                  href={`mailto:hr@refact.co?subject=${post.title}`} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="js-career-change c-btn c-btn--primary c-btn--green"
                >
                  Apply Now
                </a>
              )}
              </div>
            </div>
          </div>
        </article>
      </ContainerBox>
    </Layout>
  )
}

export default BlogPostTemplate

export function Head({ data }) {
  const post = data.singlePost;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} />
    </>
  )
}

export const pageQuery = graphql`
  query($id: String!) {
    singlePost: wpCareer(id: {eq: $id}) {
      title
      careers {
        applyFormDescription
        applyFormTitle
        fieldGroupName
        location
        experience
        type
        url {
          target
          url
        }
      }
      content
      seo {
        title
        metaDesc
      }
      id
      slug
      link
      date(formatString: "MMMM DD, YYYY")
    }
  }
`