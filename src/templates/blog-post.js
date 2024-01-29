import { Link, graphql } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import CaseStudyPosts from '../components/case-study/case-study';
import ContainerBox from '../components/container-box/container-box';
import CtaPost from '../components/cta-post/cta-post';
import EmailSubscriber from '../components/email-subscriber/email-subscriber';
import Layout from '../components/layout/layout';
import RelatedPostsSection from '../components/related-post/related-post';
import Seo from '../components/seo/seo';
import ShareButton from '../components/share-btn/share-btn';

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
          <header className="c-article__header">
            <div className="c-article__header-wrapper">
              <div className="c-article__meta">
                <div className="c-article__category">
                  {post.tags.nodes.map((tag) => (
                    <Link
                      to={tag.link}
                      className="c-link c-link--category"
                      key={tag.id}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
                <h1 className="c-article__title">{post.title}</h1>
                <div className="c-article__author-date">{post.date}</div>
                <div className="c-article__author">
                  <div className='c-article-author__wrapper'>
                  {authorPosts.map((author) => (
                      <div className='c-article-author__img' key={author.id}>
                        {author.userMeta.profileImage && (
                        <img
                          src={author.userMeta.profileImage.localFile.url}
                          alt={author.name}
                          width="32"
                          height="32"
                          loading='lazy'
                        />
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="c-article-author__name">
                    {post.coAuthors.nodes.map((author, index) => (
                      <span key={author.id}>
                        {author.displayName}
                        {index < post.coAuthors.nodes.length - 2 ? ", " : index === post.coAuthors.nodes.length - 2 ? " & " : ""}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="c-article__image">
                {post.featuredImage ? (
                  <GatsbyImage
                    image={
                      post.featuredImage.node.localFile.childImageSharp
                        .gatsbyImageData
                    }
                    alt={post.featuredImage.node.altText}
                  />
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="711"
                    height="447"
                    fill="none"
                    viewBox="0 0 711 447"
                  >
                    <path fill="#E5F7E3" d="M0 0h711v447H0z" />
                  </svg>
                )}
              </div>
            </div>
          </header>
          <div className="c-article__content">
            <div
              className="c-article__content-wrapper s-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            <div className="c-article__share">
              <ShareButton postUrl={currentUrl} postTitle={post.title} />
            </div>
          </div>
          <CtaPost />
        </article>
        <EmailSubscriber />
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
    authorPosts: allWpUser(filter: {posts: {nodes: {elemMatch: {id: {eq: $id}}}}}) {
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
      limit: 2
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
