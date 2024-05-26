import { useLocation } from '@reach/router';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, graphql, navigate } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React, { useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

const InsightPage = (props) => {
  const { data, pageContext } = props;
  const { page, totalPages } = pageContext;
  const posts = data.allWpPost.edges;
  const [firstPost] = data.firstPost.edges;
  const topicItems = data.topicList.nodes;
  const { state } = useLocation();

  function smoothScrollToElement(elementId, offset = 0) {
    const element = document.getElementById(elementId);
    const elementPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });

    setTimeout(() => {
      const htmlElement = document.querySelector('html');

      if (!htmlElement.className.includes('has-sticky-header')) {
        window.scrollTo({
          top: offsetPosition - 88,
          behavior: 'smooth',
        });
      }
    }, 200);
  }

  useEffect(() => {
    if (state?.pageChange) {
      smoothScrollToElement('blog-nav-id', 88);
    }
  }, []);

  return (
    <Layout>
      <AnimatePresence>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
        >
          <ContainerBox className="c-section--blog">
            <div className="c-blog-featured">
              <div className="c-blog-featured__wrap">
                <div className="c-blog-post__badge">Featured post</div>
                <div className="c-blog-post__category">
                  {firstPost.node.tags.nodes.map((tag) => (
                    <Link
                      to={tag.link}
                      className="c-link c-link--category"
                      key={tag.id}
                    >
                      {tag.name}
                    </Link>
                  ))}
                </div>
                <h2 className="c-blog-featured__title">
                  <Link to={firstPost.node.uri} className="c-link c-link--blog">
                    {firstPost.node.title}
                  </Link>
                </h2>
                {firstPost.node.excerpt && (
                  <div
                    className="c-blog-featured__excerpt"
                    dangerouslySetInnerHTML={{
                      __html: data.allWpPost.edges[0].node.excerpt,
                    }}
                  ></div>
                )}
                <div className="c-blog-featured__cta">
                  <Link to={firstPost.node.uri} className="c-btn--secondary">
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <circle cx="12" cy="12" r="12" fill="#59CC51" />
                      <path
                        fill="#fff"
                        d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
              <div className="c-blog-featured__image c-blog-post__image">
                <Link to={firstPost.node.uri} className="c-link">
                  {firstPost.node.featuredImage ? (
                    <GatsbyImage
                      image={
                        firstPost.node.featuredImage.node.localFile
                          .childImageSharp.gatsbyImageData
                      }
                      alt={firstPost.node.featuredImage.node.altText}
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
                </Link>
              </div>
            </div>
            <div className="c-blog-nav" id="blog-nav-id">
              <div className="c-blog-nav__title">Topics</div>
              <div className="c-blog-nav__wrap is-insight">
                <swiper-container
                  space-between={8}
                  slides-per-view={'auto'}
                  css-mode={false}
                  navigation={false}
                  allow-touch-move={true}
                >
                  {topicItems.map((topic) => (
                    <swiper-slide key={topic.id}>
                      <div className="item">
                        <Link to={topic.link}>{topic.name}</Link>
                      </div>
                    </swiper-slide>
                  ))}
                </swiper-container>
              </div>
            </div>
            <div className="c-blog-posts">
              <div className="c-blog__list">
                {posts.map(({ node }) => (
                  <div className="c-blog__item" key={node.id}>
                    <div className="c-blog-post__image">
                      <Link to={node.uri} className="c-link">
                        <GatsbyImage
                          image={
                            node.featuredImage.node.localFile.childImageSharp
                              .gatsbyImageData
                          }
                          alt={node.featuredImage.node.altText}
                        />
                      </Link>
                    </div>
                    <div className="c-blog-post__category">
                      {node.tags.nodes.map((tag) => (
                        <Link
                          to={tag.link}
                          className="c-link c-link--category"
                          key={tag.id}
                        >
                          {tag.name}
                        </Link>
                      ))}
                    </div>
                    <h3 className="c-blog-post__title">
                      <Link to={node.uri} className="c-link c-link--blog">
                        {node.title}
                      </Link>
                    </h3>
                    <div className="c-blog-post__cta">
                      <Link to={node.uri} className="c-btn--secondary">
                        Read More
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          viewBox="0 0 24 24"
                          fill="none"
                        >
                          <circle cx="12" cy="12" r="12" fill="#59CC51" />
                          <path
                            fill="#fff"
                            d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"
                          />
                        </svg>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
              <div className="c-blog-posts__pagination">
                <ResponsivePagination
                  current={page}
                  total={totalPages}
                  maxWidth={200}
                  onPageChange={(changedPage) => {
                    navigate(`/insights/page/${changedPage}`, {
                      state: {
                        pageChange: true,
                      },
                    });
                  }}
                />
              </div>
            </div>
          </ContainerBox>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default InsightPage;

export function Head() {
  return (
    <>
      <Seo
        title="Insights | Refact"
        description="Dive into Refact's Insights: product updates, case studies, and expert advice for news & media operators navigating the digital landscape."
      />
    </>
  );
}

export const pageQuery = graphql`
  query ($limit: Int!, $skip: Int!) {
    firstPost: allWpPost(
      limit: 1
      sort: { date: DESC }
      filter: {
        categories: { nodes: { elemMatch: { slug: { ne: "case-studies" } } } }
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
    allWpPost(
      limit: $limit
      skip: $skip
      sort: { date: DESC }
      filter: {
        categories: { nodes: { elemMatch: { slug: { ne: "case-studies" } } } }
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
    topicList: allWpTag(filter: { count: { gt: 0 } }) {
      nodes {
        name
        link
        id
      }
    }
  }
`;
