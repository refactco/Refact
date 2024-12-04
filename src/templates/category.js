import { AnimatePresence, motion } from 'framer-motion';
import { Link, graphql, navigate } from 'gatsby';
import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import ArticleCard from '../components/article-card/article-card';
import PatternBg from '../components/patterns/pattern-bg';

const CategoryPage = (props) => {
  const { data, pageContext } = props;
  const { name, link } = data.wpCategory;
  const { page, totalPages } = pageContext;
  const posts = data.posts.nodes;

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
              </div>
              <h1 className="c-headline__title">{name}</h1>
            </div>
          </ContainerBox>
          <PatternBg pattern="insightHighlight" className='is-insight-highlight' />
          <ContainerBox className="c-section--blog is-tag-archive">
            <div className="c-blog-posts">
              <div className="c-blog__list">
                {posts.map((node) => (
                  <ArticleCard
                    key={node.id}
                    id={node.id}
                    uri={node.uri}
                    title={node.title}
                    excerpt={node.excerpt}
                    featuredImage={node.featuredImage.node}
                    tags={node.tags.nodes}
                  />
                ))}
              </div>
              <div className={totalPages <= 1 ? 'c-blog-posts__pagination is-hidden' : 'c-blog-posts__pagination'}>
                <ResponsivePagination
                  current={page}
                  total={totalPages}
                  maxWidth={200}
                  onPageChange={(changedPage) => {
                    const navigatePath = changedPage === 1 ? link : `${link}page/${changedPage}`;
                    navigate(navigatePath, {
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

export default CategoryPage;

export function Head({ data }) {
  const cat = data.wpCategory;
  return (
    <>
      <Seo
        title={'Category: ' + cat.name + ' | Refact'}
        description={cat.seo.metaDesc}
      />
      <body className="is-insight-page" />
    </>
  );
}

export const pageQuery = graphql`
  query ($catId: String!, $limit: Int!, $skip: Int!) {
    posts: allWpPost(
      limit: $limit
      skip: $skip
      sort: { date: DESC }
      filter: { categories: { nodes: { elemMatch: { id: { eq: $catId } } } } }
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
    wpCategory(id: { eq: $catId }) {
      id
      name
      link
      description
      seo {
        title
        metaDesc
      }
    }
  }
`;
