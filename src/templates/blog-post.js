import { Link, graphql } from 'gatsby';
import React from 'react';
import CaseStudyPosts from '../components/case-study/case-study';
import ContainerBox from '../components/container-box/container-box';
import CtaPost from '../components/cta-post/cta-post';
import EmailSubscriber from '../components/email-subscriber/email-subscriber';
import Layout from '../components/layout/layout';
import RelatedPostsSection from '../components/related-post/related-post';
import Seo from '../components/seo/seo';
import ShareButton from '../components/share-btn/share-btn';
import TableOfContents from '../components/table-of-content/table-of-content';
import Button, {BgMode, BtnType} from '../components/button/button';
import { GatsbyImage } from 'gatsby-plugin-image';

const BlogPostTemplate = ({ data }) => {
  const post = data.singlePost;
  const recentPosts = data.recentPosts.edges;
  const authorPosts = data.authorPosts.nodes;
  const caseStudy = data.singlePost.caseStudyPosts.project;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <Layout>
      <ContainerBox className="c-section--article">
        <article className="c-article">
        <div className="c-article__left-side">
            <div className="c-article__toc-wrapper">
              <TableOfContents
                selector=".c-article__content"
                footer={
                  <div className="c-article__share">
                    <p className="c-article__share-title">Share</p>
                    <ShareButton
                      postUrl={currentUrl}
                      postTitle={post.title}
                    />
                  </div>
                }
              />
            </div>
          </div>
          <div className='c-article__main'>
            <div className="c-article__content c-article__content--insight">
              <div className='c-article__header'>
                <div className='c-article-header__links'>
                  <div className='c-article-header__btn'>
                    <Link
                      to="/insights"
                      className="c-link c-link--category"
                    >
                      all insights
                    </Link>
                    <span>/</span>
                  </div>
                  {post.primaryTag.selectPrimaryTag && (
                      <div className="c-article__category">
                        <span
                          className="c-link--category"
                        >
                          {post.primaryTag.selectPrimaryTag[1]}
                        </span>
                      </div>
                  )}
                </div>
                <h1 className="c-article__title">{post.title}</h1>
                <div className="c-article__author">
                  <div className="c-article-author__wrapper">
                    {authorPosts.map((author) => (
                      <div className="c-article-author__img" key={author.id}>
                        {author.userMeta.profileImage && (
                          <img
                            src={author.userMeta.profileImage.localFile.url}
                            alt={author.name}
                            width="48"
                            height="48"
                            loading="lazy"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className='c-article-author__wrap'>
                    <div className="c-article-author__name">
                      {post.coAuthors.nodes.map((author, index) => (
                        <span key={author.id}>
                          {author.displayName}
                          {index < post.coAuthors.nodes.length - 2
                            ? ', '
                            : index === post.coAuthors.nodes.length - 2
                            ? ' & '
                            : ''}
                        </span>
                      ))}
                    </div>
                    <span className='c-article-author__date'>{post.date}</span>
                  </div>
                </div>
                <div className='c-article__featured-image'>
                  <GatsbyImage image={post.featuredImage.node.localFile.childImageSharp.gatsbyImageData} alt={post.featuredImage.node.altText} />
                </div>
              </div>
              <div
                className="c-article__content-wrapper s-content"
                dangerouslySetInnerHTML={{ __html: post.content }}
              ></div>
            </div>
            <div className='c-article__tags'>
              {post.tags.nodes.map((tag) => (
                <Button
                  url={tag.link}
                  text={tag.name}
                  type={BtnType.PRIMARY}
                  bgMode={BgMode.LIGHT}
                  className='is-btn-tag'
                  key={tag.id}
                />
              ))}
            </div>
            <CtaPost />
          </div>
        </article>
        {/* {post.categories?.nodes[0].slug === 'case-studies' ? (
        ''
      ) : (
        <EmailSubscriber />
      )} */}
      </ContainerBox>
      {post.categories?.nodes[0].slug === 'case-studies' ? (
        <CaseStudyPosts caseStudies={caseStudy} />
      ) : (
        <RelatedPostsSection relatedPosts={recentPosts} />
      )}
    </Layout>
  );
};

export default BlogPostTemplate;

export function Head({ data }) {
  const post = data.singlePost;
  return (
    <>
      <Seo
        title={post.seo.title}
        description={post.seo.metaDesc}
        featuredImage={post.featuredImage.node.localFile.url}
      />
      <body className="single" />
    </>
  );
}

export const pageQuery = graphql`
  query ($id: String!) {
    singlePost: wpPost(id: { eq: $id }) {
      databaseId
      title
      uri
      id
      slug
      date(formatString: "MMMM DD, YYYY")
      content
      excerpt
      seo {
        title
        metaDesc
      }
      featuredImage {
        node {
          localFile {
            childImageSharp {
              gatsbyImageData
            }
            url
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
      coAuthors {
        nodes {
          id
          displayName
        }
      }
      categories {
        nodes {
          slug
        }
      }
      primaryTag {
        selectPrimaryTag
        fieldGroupName
      }
      caseStudyPosts {
        fieldGroupName
        project {
          cover {
            altText
            localFile {
              childImageSharp {
                gatsbyImageData
              }
            }
          }
          cta {
            target
            title
            url
          }
          description
          fieldGroupName
          title
        }
      }
    }
    authorPosts: allWpUser(
      filter: { posts: { nodes: { elemMatch: { id: { eq: $id } } } } }
    ) {
      nodes {
        name
        id
        userMeta {
          profileImage {
            localFile {
              url
            }
          }
        }
      }
    }
    recentPosts: allWpPost(
      limit: 3
      filter: {
        id: { ne: $id }
        terms: { nodes: { elemMatch: { slug: { ne: "case-studies" } } } }
      }
    ) {
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
`;
