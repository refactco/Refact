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
            categories {
              nodes {
                slug
              }
            }
            caseStudyPosts {
              fieldGroupName
              project {
                cover {
                  altText
                  localFile {
                    childImageSharp {
                      gatsbyImageData
                    }
                  }
                }
                cta {
                  target
                  title
                  url
                }
                description
                fieldGroupName
                title
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
      topicList: allWpTag(filter: {count: {gt: 0}}) {
        nodes {
          name
          link
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
                    title
                    subList {
                      ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Services_services_SubList_Item {
                        activateSubitem
                        fieldGroupName
                        subItem {
                          fieldGroupName
                          title
                        }
                        title
                        description
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      surveyPage: wpPage(slug: {eq: "survey"}) {
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
                  cta {
                    target
                    title
                    url
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                  description
                  fieldGroupName
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                  fieldGroupName
                  title
                  cta {
                    target
                    title
                    url
                  }
                }
              }
            }
          }
        }
      }
      workPage: wpPage(slug: {eq: "work"}) {
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
                  cta {
                    target
                    title
                    url
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                  fieldGroupName
                  title
                  cta {
                    target
                    title
                    url
                  }
                  description
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeaturedPost {
                  description
                  fieldGroupName
                  cover {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  cta {
                    target
                    title
                    url
                  }
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial {
                  fieldGroupName
                  logo
                  name
                  position
                  text
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project {
                  fieldGroupName
                  cta {
                    target
                    title
                    url
                  }
                  projectList {
                    cover {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    cta {
                      target
                      title
                      url
                    }
                    description
                    fieldGroupName
                    title
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Clients {
                  description
                  fieldGroupName
                  showClientLogos
                  title
                }
              }
            }
          }
        }
      }
      toolsPage : wpPage(slug: {eq: "toolkit"}) {
        id
        content
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              fieldGroupName
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_ToolsResources {
                  description
                  fieldGroupName
                  title
                  list {
                    badge
                    cta {
                      target
                      title
                      url
                    }
                    description
                    fieldGroupName
                    image {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    title
                  }
                }
              }
            }
          }
        }
      }
      urlBuilderPage : wpPage(slug: {eq: "campaign-url-builder"}) {
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
                  title
                  text
                  subtitle
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                  description
                  fieldGroupName
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                  fieldGroupName
                  list {
                    answer
                    fieldGroupName
                    question
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Table {
                  description
                  fieldGroupName
                  title
                  tableContent {
                    description
                    example
                    fieldGroupName
                    parameter
                    required
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

  const tagItems = result.data.topicList.nodes;
  tagItems.forEach((tag) => {
    createPage({
      path: `${tag.link}`,
      component: path.resolve('./src/templates/tags.js'),
      context: {
        tagId: tag.id,
      },
    });
  });

  const careers = result.data.careersPage.template.pageBuilder.pageBuilder || result.data.careerPost.edges;
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

  const services = result.data.servicesPage.template.pageBuilder.pageBuilder;
  services.forEach(({ node }) => {
    createPage({
      path: `/services/`,
      component: path.resolve(`./src/templates/services.js`),
    });
  });

  const survey = result.data.surveyPage.template.pageBuilder.pageBuilder;
  survey.forEach(({ node }) => {
    createPage({
      path: `/survey/`,
      component: path.resolve(`./src/templates/survey.js`),
    });
  });
  const ourWork = result.data.workPage.template.pageBuilder.pageBuilder;
  ourWork.forEach(({ node }) => {
    createPage({
      path: `/work/`,
      component: path.resolve(`./src/templates/work.js`),
    });
  });
  const toolsResources = result.data.toolsPage.template.pageBuilder.pageBuilder;
  toolsResources.forEach(({ node }) => {
    createPage({
      path: `/toolkit/`,
      component: path.resolve(`./src/templates/toolkit.js`),
    });
  });
  const urlBuilder = result.data.urlBuilderPage.template.pageBuilder.pageBuilder;
  urlBuilder.forEach(({ node }) => {
    createPage({
      path: `/campaign-url-builder/`,
      component: path.resolve(`./src/templates/url-builder.js`),
    });
  });
}