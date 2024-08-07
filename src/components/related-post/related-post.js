import React from 'react';
import { Link } from 'gatsby';
import ContainerBox from '../container-box/container-box';

const RelatedPostsSection = ({ relatedPosts }) => (
  <ContainerBox className="c-section--related">
    <div className="c-related">
      <div className="c-blog__list">
        {relatedPosts.map(({ node }) => (
          <div className="c-blog__item" key={node.id}>
            <div className="c-blog-post__category">
              {node.tags.nodes.map((tag) => (
                <Link to={tag.link} className="c-link c-link--category" key={tag.id}>{tag.name}</Link>
              ))}
            </div>
            <h3 className="c-blog-post__title">
              <Link to={node.uri} className="c-link c-link--blog">{node.title}</Link>
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
              <Link to={node.uri} className="c-btn--secondary">
                Read More
                <svg xmlns="http://www.w3.org/2000/svg" width="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="12" fill="#59CC51"/><path fill="#fff" d="M17.53 12.53a.75.75 0 0 0 0-1.06l-4.773-4.773a.75.75 0 0 0-1.06 1.06L15.939 12l-4.242 4.243a.75.75 0 0 0 1.06 1.06l4.773-4.773ZM6 12.75h11v-1.5H6v1.5Z"/></svg>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  </ContainerBox>
);

export default RelatedPostsSection;
