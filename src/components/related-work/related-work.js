import React, { useState, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import ContainerBox from '../container-box/container-box';
import { GatsbyImage } from 'gatsby-plugin-image';

const RelatedWorks = ({ currentPostId }) => {
  const data = useStaticQuery(graphql`
    query {
      allWpWork {
          totalCount
          edges {
            node {
              title
              uri
              databaseId
              slug
              content
              excerpt
              caseStudies {
                description
                fieldGroupName
                primaryCover {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                primaryVideo{
                  altText
                  filename
                  localFile {
                    url
                    id
                  }
                  height
                  width
                }
                mediaSettings
              }
            }
          }
        }
    }
  `);

  const [relatedWork, setRelatedWork] = useState(null);

  useEffect(() => {
    const posts = data.allWpWork.edges.filter(
      edge => edge.node.databaseId !== currentPostId
    );

    const totalCount = posts.length;
    const randomIndex = Math.floor(Math.random() * totalCount);
    const post = posts[randomIndex]?.node;
    setRelatedWork(post);
  }, [data, currentPostId]);

  if (!relatedWork) {
    return '';
  }

  return (
    <ContainerBox className="c-section--related-work">
      <div className='c-related-work'>
        <div className={`c-related-work__col is-media-${relatedWork.caseStudies.mediaSettings}`}>
        {relatedWork.caseStudies.primaryCover && (
          <Link to={relatedWork.uri} title={relatedWork.title} className="c-project__img media media--hover-effect media--landscape">
            {(relatedWork.caseStudies.mediaSettings === 'image' || relatedWork.caseStudies.mediaSettings === 'both') && (
              <GatsbyImage image={relatedWork.caseStudies.primaryCover.localFile.childImageSharp.gatsbyImageData} alt={relatedWork.caseStudies.primaryCover.altText} />
            )}
            {(relatedWork.caseStudies.mediaSettings === 'video' || relatedWork.caseStudies.mediaSettings === 'both') && (
              <video
                src={relatedWork.caseStudies.primaryVideo.localFile.url}
                alt={relatedWork.caseStudies.primaryVideo.altText}
                width={relatedWork.caseStudies.primaryVideo.width}
                height={relatedWork.caseStudies.primaryVideo.height}
                autoPlay
                muted
                loop
              />
            )}
          </Link>
        )}
        </div>
        <div className='c-related-work__col'>
          <div className='c-related-work__info'>
            <h4 className="c-project__title">
              <Link to={relatedWork.uri} className="c-link c-link--blog">
              {relatedWork.title}
              </Link>
            </h4>
            <div className="c-project__text">
              {relatedWork.caseStudies.description}
            </div>
            <Link to={relatedWork.uri} className="c-btn--secondary">
              Case Study
              <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#59CC51"/><path fill="#fff" d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"/></svg>
            </Link>
          </div>
        </div>
      </div>
    </ContainerBox>
  );
};

export default RelatedWorks;
