import React, { useState, useEffect } from 'react';
import { Link, graphql, useStaticQuery } from 'gatsby';
import ContainerBox from '../container-box/container-box';
import { GatsbyImage } from 'gatsby-plugin-image';
import Button , { BgMode, BtnType } from '../button/button';

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
                  mimeType
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
                alt={relatedWork.caseStudies.primaryVideo.altText}
                width={relatedWork.caseStudies.primaryVideo.width}
                height={relatedWork.caseStudies.primaryVideo.height}
                autoPlay
                muted
                loop
                playsInline
                >
                  <source src={relatedWork.caseStudies.primaryVideo.localFile.url} type={relatedWork.caseStudies.primaryVideo.mimeType} />
                  Your browser does not support the video tag.
                </video>
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
            <Button 
              url={relatedWork.uri} 
              text="Case Study"
              type={BtnType.SECONDARY} 
              bgMode={BgMode.LIGHT}
            />
          </div>
        </div>
      </div>
    </ContainerBox>
  );
};

export default RelatedWorks;
