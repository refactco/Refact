import React from "react";
import ContainerBox from "../container-box/container-box";
import { useLatestBlogPost } from "../../hooks/useLatestBlogPost";
const LatestBlogPost = () => {
  const data = useLatestBlogPost();
  console.log(data);
  return (
    <ContainerBox className="c-section--blog">
      <div className="c-blog-posts">
        {data.allWpPost.edges.map((post) => () => {
          return (
            <div className="c-blog-posts__item">
              <div className="c-blog-posts__image">
                {post.title}
              </div>
            </div>
          )
        })}  
      </div>
    </ContainerBox>
  );
};

export default LatestBlogPost;
