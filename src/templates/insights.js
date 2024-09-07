import { useLocation } from '@reach/router';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, graphql, navigate } from 'gatsby';
import React, { useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import Button, {BgMode, BtnType} from '../components/button/button';

const InsightPage = (props) => {
  const { data, pageContext } = props;
  const { page, totalPages } = pageContext;
  const posts = data.allWpPost.edges.slice(1); // Exclude the first post by slicing the array

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
          top: offsetPosition - 0,
          behavior: 'smooth',
        });
      }
    }, 200);
  }

  useEffect(() => {
    if (state?.pageChange) {
      smoothScrollToElement('blog-nav-id', 0);
    }
  }, [state]);

  return (
    <Layout>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ContainerBox className="c-section--blog">
            <div className="c-blog-featured">
              <div className="c-blog-featured__wrap">
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
                  <Button 
                    url={firstPost.node.uri}
                    text="Read More"
                    type={BtnType.SECONDARY} 
                    bgMode={BgMode.LIGHT}
                  />
                </div>
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
                    {node.excerpt && (
                      <div
                        className="c-blog-featured__excerpt"
                        dangerouslySetInnerHTML={{
                          __html: node.excerpt,
                        }}
                      ></div>
                    )}
                    <div className="c-blog-post__cta">
                      <Button 
                        url={node.uri}
                        text="Read More"
                        type={BtnType.SECONDARY} 
                        bgMode={BgMode.LIGHT}
                      />
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

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} featuredImage={post.seo.opengraphImage.localFile.url} />
      <body className="is-insight-page" />
    </>
  );
}

export const pageQuery = graphql`
  query ($limit: Int!, $skip: Int!) {
    wpPage(slug: { eq: "insights" }) {
      id
      content
      seo {
        title
        metaDesc
        opengraphImage {
          localFile {
            url
          }
        }
      }
  }
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
