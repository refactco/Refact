import React, { useState, useEffect } from "react"
import { graphql } from "gatsby"
import Seo from "../components/seo/seo"
import Layout from "../components/layout/layout"
import ContainerBox from "../components/container-box/container-box"

const BlogPostTemplate = ({ data }) => {
  const post = data.singlePost;
  const [isFormVisible, setFormVisible] = useState(false);

  const handleCareerChangeClick = () => {
    setFormVisible((prevState) => !prevState);
  };

  const handleCareerBackClick = () => {
    setFormVisible(false);
  };
  useEffect(() => {
    if (isFormVisible) {
      // Scroll to the .js-career-main element when form becomes visible
      const mainElement = document.querySelector('.js-career-main');
      const offsetTop = mainElement.offsetTop - 50;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
    else{
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [isFormVisible]);
  return (
    <Layout>
      <ContainerBox className="c-section--article">
        <article className="c-career">
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
                  {post.date && (
                  <div className="c-career__meta-item">
                    <span className="c-career__meta-label">Date Posted</span>
                    <span className="c-career__meta-value">{post.date}</span>
                  </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          <div className="c-career__content js-career-main">
            {isFormVisible ? (
              <>
              <div className="c-career__form js-career-form">
              <button className="c-career__form-back js-career-back" onClick={handleCareerBackClick}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#59CC51" transform="matrix(-1 0 0 1 24 0)"/><path fill="#fff" d="M6.47 12.53a.75.75 0 0 1 0-1.06l4.773-4.773a.75.75 0 0 1 1.06 1.06L8.061 12l4.242 4.243a.75.75 0 0 1-1.06 1.06L6.47 12.53Zm11.53.22H7v-1.5h11v1.5Z"/></svg>
                View Job Description
              </button>
                <div className="c-career__form-header js-career-form-header">
                  <h3 className="c-career__form-title">{post.careers.applyFormTitle}</h3>
                  <div className="c-career__form-description">{post.careers.applyFormDescription}</div>
                </div>
            </div>
              </>
            ) : (
              <>
                <div className="c-career__content-wrapper s-content js-career-content" dangerouslySetInnerHTML={{__html:post.content}}></div>
              </>
            )}
            <div className="c-career__sidebar js-career-sidebar">
              <div className="c-career__sidebar-wrapper">
                <button type="button" className={`js-career-change c-btn ${isFormVisible ? 'c-btn--outline' : 'c-btn--primary'}`} onClick={handleCareerChangeClick}>
                  {isFormVisible ? 'View Job Description' : 'Apply Now'}
                </button>
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
      <Seo title={post.title + " | Refact"} />
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
      }
      content
      id
      slug
      link
      date(formatString: "MMMM DD, YYYY")
    }
  }
`