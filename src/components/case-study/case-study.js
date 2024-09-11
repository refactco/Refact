import React from 'react';
import { Link } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import ContainerBox from '../container-box/container-box';
import Button, {BgMode, BtnType} from '../button/button';

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
            <div className='c-project__content'>
              <h5 className="c-project__title">
                {node.title}
              </h5>
              <div className="c-project__text"> 
                {node.description}
              </div>
              <Button 
                target={node.cta.target}
                url={node.cta.url} 
                text={node.cta.title}
                type={BtnType.SECONDARY} 
                bgMode={BgMode.LIGHT}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </ContainerBox>
);

export default CaseStudyPosts;