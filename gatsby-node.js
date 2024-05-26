const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect, createPage } = actions;
  createRedirect({
    fromPath: '/wp-admin/',
    toPath: 'https://refact.wpengine.com/wp-admin',
    isPermanent: true,
  });

  const result = await graphql(`
    query {
      allInsights: allWpPost(
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
            coAuthors {
              nodes {
                id
                displayName
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
      allWpPost(sort: { date: DESC }) {
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
            coAuthors {
              nodes {
                id
                displayName
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
      authorPosts: allWpUser {
        nodes {
          name
          id
          userMeta {
            profileImage {
              localFile {
                url
              }
            }
          }
        }
      }
      categoryList: allWpCategory(filter: { count: { gt: 0 } }) {
        nodes {
          link
          name
          id
          posts {
            nodes {
              id
            }
          }
        }
      }
      topicList: allWpTag(filter: { count: { gt: 0 } }) {
        nodes {
          name
          link
          id
          posts {
            nodes {
              id
            }
          }
        }
      }
      careersPage: wpPage(slug: { eq: "careers" }) {
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
              url {
                target
                url
              }
            }
            content
            id
            slug
            link
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
      servicesPage: wpPage(slug: { eq: "services" }) {
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
      surveyPage: wpPage(slug: { eq: "survey" }) {
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
      beehiivPage: wpPage(slug: { eq: "re-beehiiv" }) {
        id
        content
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              fieldGroupName
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Hero {
                  fieldGroupName
                  svgLogo
                  title
                  text
                  image {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  githubUrl {
                    target
                    title
                    url
                  }
                  cta {
                    target
                    title
                    url
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                  description
                  fieldGroupName
                  images {
                    altText
                    localFile {
                      childrenImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  moreFeatures
                  subHeading
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeatureSlides {
                  fieldGroupName
                  list {
                    description
                    fieldGroupName
                    image {
                      altText
                      localFile {
                        childrenImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    subHeading
                    title
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                  fieldGroupName
                  list {
                    answer
                    fieldGroupName
                    question
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
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials {
                  fieldGroupName
                  title
                  testimonialsList {
                    fieldGroupName
                    logo
                    name
                    text
                    position
                  }
                }
              }
            }
          }
        }
      }
      workPage: wpPage(slug: { eq: "work" }) {
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
      contact: wpPage(slug: { eq: "contact" }) {
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
                  subtitle
                  text
                  title
                }
              }
            }
          }
        }
      }
      toolsPage: wpPage(slug: { eq: "toolkit" }) {
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
                    github
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
      urlBuilderPage: wpPage(slug: { eq: "campaign-url-builder" }) {
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
  `);

  const insights = result.data.allInsights.edges;
  const postsPerPage = 4;
  const totalPages = Math.ceil(insights.length / postsPerPage);

  createPage({
    path: `/insights/`,
    component: path.resolve(`./src/templates/insights.js`),
    context: {
      page: 1,
      limit: postsPerPage,
      skip: 0,
      totalPages: totalPages,
    },
    // ownerNodeId: node.id,
    // context: {
    //   id: node.id,
    // },
  });

  for (let i = 1; i <= totalPages; i++) {
    createPage({
      path: `/insights/page/${i}`,
      component: path.resolve(`./src/templates/insights.js`),
      context: {
        page: i,
        limit: postsPerPage,
        skip: (i - 1) * postsPerPage + 1,
        totalPages: totalPages,
      },
    });
  }

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
    const categoryPosts = cat.posts.nodes;
    const categoryPostsPerPage = 4;
    const totalCategoryPages = Math.ceil(
      categoryPosts.length / categoryPostsPerPage
    );

    createPage({
      path: `${cat.link}`,
      component: path.resolve('./src/templates/category.js'),
      context: {
        catId: cat.id,
        page: 1,
        limit: categoryPostsPerPage,
        skip: 0,
        totalPages: totalCategoryPages,
      },
    });

    if (categoryPosts.length > 0) {
      for (let i = 1; i <= totalCategoryPages; i++) {
        console.log({ id: cat.id, i });

        createPage({
          path: `${cat.link}page/${i}`,
          component: path.resolve('./src/templates/category.js'),
          context: {
            catId: cat.id,
            page: i,
            limit: categoryPostsPerPage,
            skip: (i - 1) * categoryPostsPerPage + 1,
            totalPages: totalCategoryPages,
          },
        });
      }
    }
  });

  const tagItems = result.data.topicList.nodes;

  tagItems.forEach((tag) => {
    const tagPosts = tag.posts.nodes;
    const tagPostsPerPage = 4;
    const totalTagPages = Math.ceil(tagPosts.length / tagPostsPerPage);

    createPage({
      path: `${tag.link}`,
      component: path.resolve('./src/templates/tags.js'),
      context: {
        tagId: tag.id,
        page: 1,
        limit: tagPostsPerPage,
        skip: 0,
        totalPages: totalTagPages,
      },
    });

    if (tagPosts.length > 0) {
      for (let i = 1; i <= totalTagPages; i++) {
        console.log({ id: tag.id, i });

        createPage({
          path: `${tag.link}page/${i}`,
          component: path.resolve('./src/templates/tags.js'),
          context: {
            tagId: tag.id,
            page: i,
            limit: tagPostsPerPage,
            skip: (i - 1) * tagPostsPerPage + 1,
            totalPages: totalTagPages,
          },
        });
      }
    }
  });

  const careers =
    result.data.careersPage.template.pageBuilder.pageBuilder ||
    result.data.careerPost.edges;
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
  const beehiiv = result.data.beehiivPage.template.pageBuilder.pageBuilder;
  beehiiv.forEach(({ node }) => {
    createPage({
      path: `/re-beehiiv/`,
      component: path.resolve(`./src/templates/re-beehiiv.js`),
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
  const urlBuilder =
    result.data.urlBuilderPage.template.pageBuilder.pageBuilder;
  urlBuilder.forEach(({ node }) => {
    createPage({
      path: `/campaign-url-builder/`,
      component: path.resolve(`./src/templates/url-builder.js`),
    });
  });
  const contactPage = result.data.contact.template.pageBuilder.pageBuilder;
  contactPage.forEach(({ node }) => {
    createPage({
      path: `/contact/`,
      component: path.resolve(`./src/templates/contact.js`),
    });
  });
};
