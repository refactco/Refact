import {  graphql } from 'gatsby';
import React from 'react';
import ContainerBox from '../components/container-box/container-box';
import Layout from '../components/layout/layout';
import Seo from '../components/seo/seo';
import Button, {BgMode, BtnType} from '../components/button/button';
import ArticleCard from '../components/article-card/article-card';
import PatternBg from '../components/patterns/pattern-bg';

const InsightPage = (props) => {
  const { data } = props;
  // Extract the latest 3 posts for the featured section
  const featuredPosts = data.firstPost.edges.slice(0, 3).map((edge) => edge.node);

  // Exclude featured posts from primary tag grouping
  const posts = data.allWpPost.edges.filter(
    ({ node }) => !featuredPosts.some((featured) => featured.id === node.id)
  );

  const groupedByPrimaryTag = posts.reduce((acc, { node }) => {
    const primaryTag = node.primaryTag?.selectPrimaryTag;
    if (primaryTag && primaryTag.length === 2) {
      let [slug, name] = primaryTag;
      slug = slug.toLowerCase();
      if (!acc[slug]) {
        acc[slug] = { name, posts: [] };
      }
      acc[slug].posts.push(node);
    }
    return acc;
  }, {});

  return (
    <Layout>
      <ContainerBox className="c-section--blog">
        <div className='c-insights'>
          <div className='c-insights__featured'>
            <div className="c-insights-topic__headline">
              <div className="c-insights-topic__title">Featured Insights</div>
            </div>
            <div className='c-insights__featured-list'>
            {featuredPosts.length > 0 && (
              <div className="c-insights-featured-list__col">
                <ArticleCard
                  key={featuredPosts[0].id}
                  id={featuredPosts[0].id}
                  uri={featuredPosts[0].uri}
                  title={featuredPosts[0].title}
                  excerpt={featuredPosts[0].excerpt}
                  tags={featuredPosts[0].tags.nodes}
                  featuredImage={featuredPosts[0].featuredImage.node}
                />
              </div>
            )}
            {featuredPosts.length > 1 && (
              <div className="c-insights-featured-list__col">
                {featuredPosts.slice(1).map((post) => (
                  <ArticleCard
                    key={post.id}
                    id={post.id}
                    uri={post.uri}
                    title={post.title}
                    excerpt={post.excerpt}
                    tags={post.tags.nodes}
                    featuredImage={post.featuredImage.node}
                  />
                ))}
              </div>
            )}
            </div>
          </div>
          <div className='c-insights__list'>
          {Object.entries(groupedByPrimaryTag).map(([slug, { name, posts }]) => {
            const sortedPosts = posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            const lastThreePosts = sortedPosts.slice(0, 3);

            return (
              <section key={slug} className="c-insights__section">
                <div className="c-insights-topic__headline">
                  <div className="c-insights-topic__title">{name}</div>
                  <Button
                    url={`/tag/${slug}`}
                    text="View All"
                    type={BtnType.SECONDARY}
                    bgMode={BgMode.LIGHT}
                  />
                </div>
                <div className="c-insights-topic__list">
                  {lastThreePosts.map((post) => (
                    <ArticleCard
                      key={post.id}
                      id={post.id}
                      uri={post.uri}
                      title={post.title}
                      excerpt={post.excerpt}
                      featuredImage={post.featuredImage.node}
                    />
                  ))}
                </div>
              </section>
            );
          })}
          </div>
        </div>
        <PatternBg pattern="insightHighlight" className='is-insight-highlight' />
      </ContainerBox>
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
  query {
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
          primaryTag {
            selectPrimaryTag
            fieldGroupName
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
          primaryTag {
            selectPrimaryTag
            fieldGroupName
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
