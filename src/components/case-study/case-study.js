import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import ContainerBox from '../container-box/container-box';

const CaseStudyPosts = ({ caseStudies }) => (
  <ContainerBox className="c-section--project">
    <div className="c-projects_cs">
      <div className="c-project__items">
          {caseStudies && caseStudies.map((node, index) => (
          <div className="c-project__item" key={index}>
            {node.cta.target === '_blank' ? 
            <a href={node.cta.url} className="c-project__img" target='_blank' rel="nofollow, noreferrer" >
              <GatsbyImage image={node.cover.localFile.childImageSharp.gatsbyImageData} alt={node.cover.altText} />
            </a>
            : 
            <Link to={node.cta.url} className="c-project__img">
              <GatsbyImage image={node.cover.localFile.childImageSharp.gatsbyImageData} alt={node.cover.altText} />
            </Link>
            }
            <h5 className="c-project__title">
              {node.title}
            </h5>
            <div className="c-project__text"> 
              {node.description}
            </div>
            {node.cta.target === '_blank' ? 
            <a href={node.cta.url} target='_blank' rel="nofollow, noreferrer" className="c-btn--secondary">
              {node.cta.title}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#59CC51"/><path fill="#fff" d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"/></svg>
            </a>
            : 
            <Link to={node.cta.url} className="c-btn--secondary">
              {node.cta.title}
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#59CC51"/><path fill="#fff" d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"/></svg>
            </Link>
            }
          </div>
        ))}
      </div>
    </div>
  </ContainerBox>
);

export default CaseStudyPosts;