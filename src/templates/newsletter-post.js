import { graphql } from 'gatsby';
import React from 'react';
import ContainerBox from '../components/container-box/container-box';
import CtaPost from '../components/cta-post/cta-post';
import EmailSubscriber from '../components/email-subscriber/email-subscriber';
import Layout from '../components/layout/layout';
import RelatedPostsSection from '../components/related-post/related-post';
import Seo from '../components/seo/seo';
import ShareButton from '../components/share-btn/share-btn';
import TableOfContents from '../components/table-of-content/table-of-content';
import PatternBg from '../components/patterns/pattern-bg';
import Button, {BgMode, BtnType} from '../components/button/button';

const NewsletterTemplate = ({ data }) => {
  const post = data.singlePost;
  const recentPosts = data.recentPosts.edges;
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';
  return (
    <Layout>
      <ContainerBox className="c-section--work c-section--article-header">
        <div className="c-article__header">
          <div className='c-article-header__links'>
            <div className='c-article-header__btn'>
              <Button
                url="/newsletters"
                text="all Media Tech Reports"
                type={BtnType.SECONDARY} 
                bgMode={BgMode.DARK}
                icon='arrowleft'
              />
            </div>
          </div>
          <h1 className="c-article__title">{post.title}</h1>
          <div className="c-article__author">
            <div className="c-article-author__wrapper">
              <div className="c-article-author__img">
                <img 
                  src={post.author.node.avatar.url} 
                  alt={post.author.node.name} 
                  width={post.author.node.avatar.width} 
                  height={post.author.node.avatar.height}
                  loading='lazy' 
                />
              </div>
            </div>
            <div className='c-article-author__wrap'>
              <span className='c-article-author__date'>{post.date}</span>
              <div className="c-article-author__name">
                <span>
                  {post.author.node.name}
                </span>
              </div>
            </div>
          </div>
        </div>
        <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
        <PatternBg pattern="pagePattern" className='is-page-pattern' />
      </ContainerBox>
      <ContainerBox className="c-section--article">
        <article className="c-article">
          <div className="c-article__content c-article__content--insight">
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
            <div
              className="c-article__content-wrapper s-content"
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
          </div>
          <CtaPost />
        </article>
      </ContainerBox>
      <EmailSubscriber />
      <RelatedPostsSection relatedPosts={recentPosts} />
    </Layout>
  );
};

export default NewsletterTemplate;

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
    singlePost: wpNewsletter(id: { eq: $id }) {
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
      author {
        node {
          id
          avatar {
            height
            size
            url
            width
          }
          name
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
    recentPosts: allWpNewsletter(
      limit: 2
      filter: {
        id: { ne: $id }
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
        }
      }
    }
  }
`;
