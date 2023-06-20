const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allWpPost(sort: {date: DESC}) {
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
                  url
                }
                altText
              }
            }
            author {
              node {
                id
                avatar {
                  height
                  url
                  width
                }
                firstName
                lastName
              }
            }
          }
        }
      }
    }
  `)
  
  result.data.allWpPost.edges.forEach((node) => {
    createPage({
      path: `/insight/`,
      component: path.resolve(`./src/templates/insight.js`),
      ownerNodeId: node.id,
      context: {
        id: node.id,
      },
    })
  })

  const posts = result.data.allWpPost.edges;
  posts.forEach(({ node }) => {
    createPage({
      path: `/${node.slug}/`,
      component: path.resolve('./src/templates/blog-post.js'),
      context: {
        id: node.id,
        title: node.title,
        content: node.content,
      },
    });
  });
}