import React from 'react';
import ContainerBox from '../container-box/container-box';
import ArticleCard from '../article-card/article-card';

const RelatedPostsSection = ({ relatedPosts }) => (
  <ContainerBox className="c-section--related">
    <div className="c-related">
      <div className="c-insights-topic__headline">
        <div className="c-insights-topic__title">More Insights</div>
      </div>
      <div className="c-blog__list">
        {relatedPosts.map(({ node }) => (
          <ArticleCard
            key={node.id}
            id={node.id}
            uri={node.uri}
            title={node.title}
            excerpt={node.excerpt}
            featuredImage={node.featuredImage.node}
          />
        ))}
      </div>
    </div>
  </ContainerBox>
);

export default RelatedPostsSection;
