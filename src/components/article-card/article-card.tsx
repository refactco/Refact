import React from "react";
import { Link } from "gatsby";
import { GatsbyImage, IGatsbyImageData } from "gatsby-plugin-image";
import Button, {BgMode, BtnType} from "../button/button";

interface Tag {
  id: string;
  name: string;
  link: string;
}

interface ArticleCardProps {
  id: string;
  uri: string;
  title: string;
  excerpt?: string;
  tags?: Tag[];
  featuredImage: {
    localFile: {
      childImageSharp: {
        gatsbyImageData: IGatsbyImageData;
      };
    };
    altText: string;
  };
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  id,
  uri,
  title,
  excerpt,
  tags,
  featuredImage,
}) => {
  return (
    <div className="c-article-card" key={id}>
      <div className="c-blog-post__image">
        <Link to={uri}>
          <GatsbyImage
            image={featuredImage.localFile.childImageSharp.gatsbyImageData}
            alt={featuredImage.altText}
          />
        </Link>
      </div>
      <div className="c-blog-post__content">
        {tags && tags.length > 0 && (
          <div className="c-blog-post__category">
            {tags.map((tag, index) => (
              <React.Fragment key={tag.id}>
                <Link to={tag.link} className="c-link c-link--category">
                  {tag.name}
                </Link>
                {index < tags.length - 1 && (
                  <span>,</span>
                )}
              </React.Fragment>
            ))}
          </div>
        )}
        <h2 className="c-blog-post__title">
          <Link to={uri} className="c-link c-link--blog">
            {title}
          </Link>
        </h2>
        {excerpt && (
          <div
            className="c-blog-featured__excerpt"
            dangerouslySetInnerHTML={{ __html: excerpt }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ArticleCard;
