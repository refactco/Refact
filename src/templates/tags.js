import { AnimatePresence, motion } from 'framer-motion';
import { Link, graphql, navigate } from 'gatsby';
import { GatsbyImage } from 'gatsby-plugin-image';
import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';

const TagPage = (props) => {
  const { data, pageContext } = props;
  const { name, link } = data.wpTag;
  const { page, totalPages } = pageContext;
  const posts = data.posts.nodes;
  const topicItems = data.topicList.nodes;

  return (
    <Layout>
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <ContainerBox className="c-section--headline">
            <div className="c-headline">
              <h1 className="c-headline__title">{name}</h1>
              <div className="c-blog-nav">
                <div className="c-blog-nav__title">Topics</div>
                <div className="c-blog-nav__wrap">
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
            </div>
          </ContainerBox>
          <ContainerBox className="c-section--blog is-tag-archive">
            <div className="c-blog-posts">
              <div className="c-blog__list">
                {posts.map((node) => (
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
                    navigate(`${link}page/${changedPage}`, {
                      state: {
                        pageChange: true,
                      },
                    });
                  }}
                />
              </div>
              {/* <div className="c-blog__cta">
            <LoadMoreButton onClick={handleLoadMore} disabled={!hasMorePosts} />
          </div> */}
            </div>
          </ContainerBox>
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
};

export default TagPage;

export function Head({ data }) {
  const tag = data.wpTag;
  return (
    <>
      <Seo
        title={'Topic: ' + tag.name + ' | Refact'}
        description={tag.seo.metaDesc}
      />
    </>
  );
}

export const pageQuery = graphql`
  query ($tagId: String!, $limit: Int!, $skip: Int!) {
    posts: allWpPost(
      limit: $limit
      skip: $skip
      sort: { date: DESC }
      filter: { tags: { nodes: { elemMatch: { id: { eq: $tagId } } } } }
    ) {
      nodes {
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
    wpTag(id: { eq: $tagId }) {
      id
      name
      description
      link
      seo {
        title
        metaDesc
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
