import { AnimatePresence, motion } from 'framer-motion';
import { Link, graphql, navigate } from 'gatsby';
import React from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import Button, {BgMode, BtnType} from '../components/button/button';

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
              <div className='c-headline__btn'>
                <Button 
                  url="/insights" 
                  text="Back to Insights" 
                  type={BtnType.SECONDARY} 
                  bgMode={BgMode.LIGHT} 
                  icon="arrowleft"  
                />
              </div>
              <h1 className="c-headline__title">{name}</h1>
            </div>
          </ContainerBox>
          <ContainerBox className="c-section--blog is-tag-archive">
            <div className="c-blog-posts">
              <div className="c-blog__list">
                {posts.map((node) => (
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
              <div className={totalPages <= 1 ? 'c-blog-posts__pagination is-hidden' : 'c-blog-posts__pagination'}>
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
