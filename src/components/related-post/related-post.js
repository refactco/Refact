import React from 'react';
import { Link } from 'gatsby';
import ContainerBox from '../container-box/container-box';
import Button, {BgMode, BtnType} from '../button/button';

const RelatedPostsSection = ({ relatedPosts }) => (
  <ContainerBox className="c-section--related">
    <div className="c-related">
      <div className="c-blog__list">
        {relatedPosts.map(({ node }) => (
          <div className="c-blog__item" key={node.id}>
            {node.tags && (
            <div className="c-blog-post__category">
              {node.tags.nodes.map((tag) => (
                <Link to={tag.link} className="c-link c-link--category" key={tag.id}>{tag.name}</Link>
              ))}
            </div>
            )}
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
    </div>
  </ContainerBox>
);

export default RelatedPostsSection;
