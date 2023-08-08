const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect, createPage } = actions
  createRedirect({ fromPath: '/wp-admin/', toPath: 'https://refact.wpengine.com/wp-admin', isPermanent: true })

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
            terms {
              nodes {
                name
                link
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
      categoryList: allWpCategory(filter: {count: {gt: 0}}) {
        nodes {
          link
          name
          id
        }
      }
      careersPage: wpPage(slug: {eq: "careers"}) {
        id
        content
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Careers {
                  fieldGroupName
                  noResult
                  careerCategories {
                    name
                    taxonomyName
                    careers {
                      nodes {
                        title
                        uri
                        slug
                        careers {
                          experience
                          location
                        }
                      }
                    }
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                  fieldGroupName
                  fullWidth
                  text
                  title
                  subtitle
                }
              }
            }
          }
        }
      }
      careerPost: allWpCareer {
        edges {
          node {
            id
            title
            careers {
              applyFormDescription
              applyFormTitle
              fieldGroupName
              location
              experience
              type
            }
            content
            id
            slug
            link
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
      servicesPage: wpPage(slug: {eq: "services"}) {
        id
        content
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              fieldGroupName
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                  fieldGroupName
                  fullWidth
                  subtitle
                  text
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services {
                  fieldGroupName
                  services {
                    desc
                    fieldGroupName
                    subList {
                      fieldGroupName
                      title
                    }
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  `)
  
  result.data.allWpPost.edges.forEach((node) => {
    createPage({
      path: `/insights/`,
      component: path.resolve(`./src/templates/insights.js`),
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

  const catItems = result.data.categoryList.nodes;
  catItems.forEach((cat) => {
    createPage({
      path: `${cat.link}`,
      component: path.resolve('./src/templates/category.js'),
      context: {
        catId: cat.id,
      },
    });
  });

  const careers = result.data.careersPage.template.pageBuilder.pageBuilder;
  careers.forEach(({ node }) => {
    createPage({
      path: `/careers/`,
      component: path.resolve(`./src/templates/careers.js`),
    });
  });

  const careerPosts = result.data.careerPost.edges;
  careerPosts.forEach(({ node }) => {
    createPage({
      path: `/careers/${node.slug}/`,
      component: path.resolve('./src/templates/careers-post.js'),
      context: {
        id: node.id,
        title: node.title,
        content: node.content,
      },
    });
  });

  const services = result.data.careersPage.template.pageBuilder.pageBuilder;
  services.forEach(({ node }) => {
    createPage({
      path: `/services/`,
      component: path.resolve(`./src/templates/services.js`),
    });
  });
}