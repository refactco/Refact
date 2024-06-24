import { graphql } from 'gatsby';
import React from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import { GatsbyImage } from 'gatsby-plugin-image';
import RelatedWorks from '../components/related-work/related-work';

const renderSection = (section, index) => {
  // console.log('Section:', section)
  switch (section.fieldGroupName) {
    case 'Work_Casestudies_CaseStudyFields_ImageSection':
      return (
        <div key={index} className={`o-section-work c-media c-media-display-${section.displaySettings} ${section.reverseImages ? 'is-media-reverse' : ''}`}>
            {section.mediaType === true && section.video ? (
              <div className='c-media__items is-video'>
                <video
                  alt={section.video.altText}
                  width={section.video.width}
                  height={section.video.height}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                  <source src={section.video.localFile.url} type={section.video.mimeType} />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className='c-media__items is-image'>
                <GatsbyImage
                  image={section.image.localFile.childImageSharp.gatsbyImageData}
                  alt={section.image.altText}
                />
              </div>
            )}
          { (section.displaySettings === 'split' || section.displaySettings === 'equal') && (
              <>
              {section.mediaTypeSecondary === true && section.secondayVideo ? (
                <div className='c-media__items is-video'>
                <video
                  alt={section.secondayVideo.altText}
                  width={section.secondayVideo.width}
                  height={section.secondayVideo.height}
                  autoPlay
                  muted
                  loop
                  playsInline
                  >
                  <source src={section.secondayVideo.localFile.url} type={section.secondayVideo.mimeType} />
                  Your browser does not support the video tag.
                </video>
                </div>
              ) : (
                <div className='c-media__items is-image'>
                <GatsbyImage
                  image={section.secondaryImage.localFile.childImageSharp.gatsbyImageData}
                  alt={section.secondaryImage.altText}
                />
                </div>
              )}
              </>
          ) }
        </div>
      )
    case 'Work_Casestudies_CaseStudyFields_Content':
      return (
        <div className='o-section-work c-section--works-content' key={index}>
          <h2 className='c-works-content__title'>{section.title}</h2>
          <div className="c-works-content__text s-content" dangerouslySetInnerHTML={{__html:section.text}}></div>
        </div>
      )
    case 'Work_Casestudies_CaseStudyFields_Testimonial':
      return (
        <div className={`o-section-work c-section--works-testimonial ${section.video || section.image ? 'has-media' : ''}`} key={index}>
          <div className='c-works-testimonial'>
            <div className='c-works-testimonial__col'>
              <div className='c-works-testimonial__quote'>
                <div className='c-works-testimonial__quote-icon'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" fill="none" viewBox="0 0 64 48"><path fill="#C6F0C2" d="m20 8 4-8h-8C7.16 0 0 11.16 0 20v28h28V20H12c0-12 8-12 8-12Zm28 12c0-12 8-12 8-12l4-8h-8c-8.84 0-16 11.16-16 20v28h28V20H48Z" opacity=".4"/></svg>
                </div>
                <p>{section.text}</p>
                <cite>{section.author}</cite>
              </div>
            </div>
            {section.mediaType === true && section.video ? (
              <div className='c-works-testimonial__col'>
                <video
                  alt={section.video.altText}
                  width={section.video.width}
                  height={section.video.height}
                  autoPlay
                  muted
                  loop
                  playsInline
                >
                 <source src={section.video.localFile.url} type={section.video.mimeType} />
                 Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <>
              {section.image && (
              <div className='c-works-testimonial__col'>
                <GatsbyImage
                  image={section.image.localFile.childImageSharp.gatsbyImageData}
                  alt={section.image.altText}
                />
              </div>
              )}
              </>
            )}
          </div>
        </div>
      )
    // case 'Work_Casestudies_CaseStudyFields_CtaSection':
    //   return (
    //     <div className='o-section-work' key={index}>
    //       <h2>{section.title}</h2>
    //       <p>{section.description}</p>
    //       <a href={section.button.url} target={section.button.target}>
    //         {section.button.title}
    //       </a>
    //     </div>
    //   )
    default:
      return null
  }
}

const WorkPostTemplate = ({ data }) => {
  const post = data.singleWork;
  const caseStudies = post.caseStudies;
  return (
    <Layout>
      <ContainerBox className="c-section--single-work">
        <h1 className='c-works__title'>{post.title}</h1>
        <div className='c-works__head'>
          <div className='c-works-head__col'>
            <div className='c-works-head__info'>
              <p>{caseStudies.description}</p>
            </div>
          </div>
          <div className='c-works-head__col'>
            {caseStudies.keyWork && (
              <ul className='c-works-head__keywork'>
                {caseStudies.keyWork.map((key, index) => (
                  <li key={index}>{key.text}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        {post.caseStudies && post.caseStudies.caseStudyFields && (
          post.caseStudies.caseStudyFields.map((section, index) => (
            renderSection(section, index)
          ))
        )}
      </ContainerBox>
      {/* <ContainerBox className="c-section--talk">
        <div className='c-talk'>
          <div className='c-talk__wrapper'>
            <h4 className='c-talk__title'>Let's Create!</h4>
            <p className='c-talk__text'>Curious to know how we can help and support you with your project? Learn more about the services we offer news and media organizations.</p>
            <Link to='/services' className='c-btn'>Our Services</Link>
          </div>
        </div>
      </ContainerBox> */}
      <RelatedWorks currentPostId={post.databaseId} />
    </Layout>
  );
};

export default WorkPostTemplate;

export function Head({ data }) {
  const post = data.singleWork;
  return (
    <>
      <Seo
        title={post.seo.title}
        description={post.seo.metaDesc}
        featuredImage={post.caseStudies.primaryCover.localFile.url}
      />
      <body className="is-work-single-page" />
    </>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    singleWork: wpWork(id: {eq: $id}) {
      title
      uri
      databaseId
      slug
      excerpt
      content
      seo {
        title
        metaDesc
      }
      caseStudies {
        description
        fieldGroupName
        keyWork {
          fieldGroupName
          text
        }
        primaryCover {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
            url
          }
        }
        secondaryCover {
          altText
          localFile {
            childImageSharp {
              gatsbyImageData
            }
          }
        }
        caseStudyFields {
          ... on WpWork_Casestudies_CaseStudyFields_ImageSection {
            displaySettings
            fieldGroupName
            video {
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
            mediaType
            image {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            mediaTypeSecondary
            reverseImages
            secondaryImage {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            secondayVideo {
              altText
              height
              localFile {
                url
                id
              }
              width
              mimeType
            }
          }
          ... on WpWork_Casestudies_CaseStudyFields_Content {
            fieldGroupName
            text
            title
          }
          ... on WpWork_Casestudies_CaseStudyFields_Testimonial {
            author
            fieldGroupName
            image {
              altText
              localFile {
                childImageSharp {
                  gatsbyImageData
                }
              }
            }
            mediaType
            text
            video {
              altText
              height
              localFile {
                id
                url
              }
              width
              mimeType
            }
          }
          ... on WpWork_Casestudies_CaseStudyFields_CtaSection {
            description
            fieldGroupName
            button {
              target
              title
              url
            }
            title
          }
        }
      }
    }
  }
`;
