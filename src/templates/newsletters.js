import { useLocation } from '@reach/router';
import { AnimatePresence, motion } from 'framer-motion';
import { Link, graphql, navigate } from 'gatsby';
import React, { useEffect } from 'react';
import ResponsivePagination from 'react-responsive-pagination';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import Button, {BgMode, BtnType} from '../components/button/button';
import PatternBg from '../components/patterns/pattern-bg';
import NewsletterForm from '../components/newsletter/email-subscriber';

const NewsletterPage = (props) => {
  const { data, pageContext } = props;
  const { page, totalNewsletterPages } = pageContext;
  const posts = data.allWpNewsletter.edges; // Exclude the first post by slicing the array

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
      smoothScrollToElement('newsletter-nav-id', 0);
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
          <ContainerBox  className="c-section--work is-newsletter-archive">
            <div className="c-page-header">
              <h1 className="c-page-header__title">Media Tech Reports</h1>
              <div className="c-page-header__text" style={{ maxWidth: 796 }}>
                <p>Become A Smarter Internet Publisher</p>
              </div>
              <NewsletterForm />
            </div>
            <PatternBg pattern="highlightLeft" className='is-hero-highlight' />
            <PatternBg pattern="pagePattern" className='is-page-pattern' />
          </ContainerBox>
          <ContainerBox className="c-section--newsletter" id="newsletter-nav-id">
            <div className="c-blog-posts">
              <div className="c-blog__list">
                {posts.map(({ node }) => (
                  <div className="c-blog__item" key={node.id}>
                    <h3 className="c-blog-post__title">
                      <Link to={node.uri} className="c-link c-link--blog">
                        {node.title}
                      </Link>
                    </h3>
                    <div className="c-blog-post__meta">
                      <span className="c-blog-post__date">{node.date}</span>
                    </div>
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
                  total={totalNewsletterPages}
                  maxWidth={200}
                  onPageChange={(changedPage) => {
                    if (changedPage === 1) {
                      navigate(`/newsletters/`, {
                        state: {
                          pageChange: true,
                        },
                      });
                    } else {
                      navigate(`/newsletters/page/${changedPage}`, {
                        state: {
                          pageChange: true,
                        },
                      });
                    }
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

export default NewsletterPage;

export function Head({ data }) {
  const post = data.wpPage;
  return (
    <>
      <Seo title={post.seo.title} description={post.seo.metaDesc} featuredImage={post.seo.opengraphImage.localFile.url} />
      {/* <body className="is-insight-page" /> */}
    </>
  );
}

export const pageQuery = graphql`
  query ($skip: Int!, $limit: Int!) {
    wpPage(slug: { eq: "newsletters" }) {
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
    allWpNewsletter(
      sort: { date: DESC }
      skip: $skip
      limit: $limit
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
