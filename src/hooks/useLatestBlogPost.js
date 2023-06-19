import { graphql, useStaticQuery } from "gatsby";

export const useLatestBlogPost = () => {
  const data = useStaticQuery(graphql`
    query LatestBlogPostQuery {
      allWpPost(sort: {date: DESC}) {
        edges {
          node {
            id
            title
            slug
            uri
            excerpt
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  `);
  return data;

}

