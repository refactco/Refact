const path = require(`path`);

exports.createPages = async ({ graphql, actions }) => {
  const { createRedirect, createPage } = actions;
  createRedirect({
    fromPath: '/wp-admin/',
    toPath: 'https://refact.wpengine.com/wp-admin',
    isPermanent: true,
  });
  createRedirect({
    fromPath: '/resources/',
    toPath: 'https://refact.co/toolkit',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/tools-resources/',
    toPath: 'https://refact.co/toolkit',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/career/sales-marketing/',
    toPath: 'https://refact.co/careers',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/career/design/',
    toPath: 'https://refact.co/careers',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/career/experienced-technology/',
    toPath: 'https://refact.co/careers',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/career/technology/',
    toPath: 'https://refact.co/careers',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/re-beehiiv/',
    toPath: 'https://refact.co/integration-toolkit-for-beehiiv/',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/empowering-workweek-creators-with-scalable-microsites-2/',
    toPath: 'https://refact.co/empowering-workweek-creators-scalable-microsites/',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/insight/',
    toPath: 'https://refact.co/insights/',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/boosting-cre-dailys-digital-presence/',
    toPath: 'https://refact.co/work/cre-daily/',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/elevating-stacked-marketers-digital-presence-and-efficiency-2/',
    toPath: 'https://refact.co/work/stacked-marketer/',
    statusCode: 301,
  });
  createRedirect({
    fromPath: '/state-affairs-struggling-startup-to-success-in-4-months/',
    toPath: 'https://refact.co/work/state-affairs/',
    statusCode: 301,
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
            primaryTag {
              selectPrimaryTag
              fieldGroupName
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
                  }
                  altText
                }
              }
              primaryTag {
                selectPrimaryTag
                fieldGroupName
              }
              tags {
                nodes {
                  name
                  link
                  id
                }
              }
              categories {
                nodes {
                  name
                  slug
                }
              }
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
      servicesPage: wpPage(slug: {eq: "services"}) {
        id
        seo {
          title
          metaDesc
          opengraphImage {
            localFile {
              url
            }
          }
        }
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                  fieldGroupName
                  subtitle
                  text
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                  description
                  fieldGroupName
                  images {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  title
                  subHeading
                  moreFeatures
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                  desktop
                  fieldGroupName
                  mobile
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                  description
                  fieldGroupName
                  title
                  cta {
                    url
                    title
                    target
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials {
                  fieldGroupName
                  title
                  testimonialsList {
                    text
                    name
                    position
                    logo
                    fieldGroupName
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CapabilitiesList {
                  fieldGroupName
                  list {
                    title
                    text
                    fieldGroupName
                    cta {
                      url
                      title
                      target
                    }
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_ToolsResources {
                  description
                  fieldGroupName
                  title
                  list {
                    title
                    description
                    svg
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                  fieldGroupName
                  list {
                    answer
                    question
                    fieldGroupName
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CtaSection {
                  fieldGroupName
                  title
                  button {
                    target
                    title
                    url
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
                  description
                  fieldGroupName
                  items {
                    fieldGroupName
                    title
                    text
                  }
                  title
                }
              }
            }
          }
        }
      }
      brandingDesign:  wpPage(slug: {eq: "branding-and-design"}) {
        id
        seo {
          title
          metaDesc
          opengraphImage {
            localFile {
              url
            }
          }
        }
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                  fieldGroupName
                  subtitle
                  text
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                  description
                  fieldGroupName
                  images {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  title
                  subHeading
                  moreFeatures
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_ToolsResources {
                  description
                  fieldGroupName
                  title
                  list {
                    title
                    description
                    svg
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Contact {
                  title
                  text
                  fieldGroupName
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project {
                  fieldGroupName
                  cta {
                    target
                    title
                    url
                  }
                  displayMode
                  projectList {
                    cover {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    video{
                      altText
                      filename
                      localFile {
                        url
                        id
                      }
                      height
                      width
                      mimeType
                    }
                    cta {
                      target
                      title
                      url
                    }
                    mediaSettings
                    description
                    fieldGroupName
                    title
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                  fieldGroupName
                  list {
                    answer
                    question
                    fieldGroupName
                  }
                }
              }
            }
          }
        }
      }
      websiteDevelopmentPage: wpPage(slug: {eq: "website-development"}) {
        id
        seo {
          title
          metaDesc
          opengraphImage {
            localFile {
              url
            }
          }
        }
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                  fieldGroupName
                  subtitle
                  text
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                  description
                  fieldGroupName
                  images {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  title
                  subHeading
                  moreFeatures
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Contact {
                  title
                  text
                  fieldGroupName
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project {
                  fieldGroupName
                  cta {
                    target
                    title
                    url
                  }
                  displayMode
                  projectList {
                    cover {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    video{
                      altText
                      filename
                      localFile {
                        url
                        id
                      }
                      height
                      width
                      mimeType
                    }
                    cta {
                      target
                      title
                      url
                    }
                    mediaSettings
                    description
                    fieldGroupName
                    title
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
                  description
                  fieldGroupName
                  items {
                    fieldGroupName
                    title
                    text
                  }
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                  fieldGroupName
                  list {
                    answer
                    question
                    fieldGroupName
                  }
                }
              }
            }
          }
        }
      }
      optimizationPage: wpPage(slug: {eq: "optimization"}) {
        id
        seo {
          title
          metaDesc
          opengraphImage {
            localFile {
              url
            }
          }
        }
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                  fieldGroupName
                  subtitle
                  text
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                  description
                  fieldGroupName
                  images {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  title
                  subHeading
                  moreFeatures
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Contact {
                  title
                  text
                  fieldGroupName
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Project {
                  fieldGroupName
                  cta {
                    target
                    title
                    url
                  }
                  displayMode
                  projectList {
                    cover {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    video{
                      altText
                      filename
                      localFile {
                        url
                        id
                      }
                      height
                      width
                      mimeType
                    }
                    cta {
                      target
                      title
                      url
                    }
                    mediaSettings
                    description
                    fieldGroupName
                    title
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
                  description
                  fieldGroupName
                  items {
                    fieldGroupName
                    title
                    text
                  }
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                  fieldGroupName
                  list {
                    answer
                    question
                    fieldGroupName
                  }
                }
              }
            }
          }
        }
      }
      beehiivPage: wpPage(slug: { eq: "integration-toolkit-for-beehiiv" }) {
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
      aboutPage: wpPage(slug: {eq: "about"}) {
        id
        seo {
          title
          metaDesc
          opengraphImage {
            localFile {
              url
            }
          }
        }
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                  fieldGroupName
                  subtitle
                  text
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
                  description
                  fieldGroupName
                  items {
                    fieldGroupName
                    text
                    title
                  }
                  title
                  cta {
                    target
                    title
                    url
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Team {
                  description
                  fieldGroupName
                  title
                  team {
                    fieldGroupName
                    name
                    photo {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    position
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Clients {
                  description
                  fieldGroupName
                  showClientLogos
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_RefactInNumbers {
                  fieldGroupName
                  headline
                  list {
                    fieldGroupName
                    text
                    title
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                  description
                  fieldGroupName
                  images {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  title
                  subHeading
                  moreFeatures
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Testimonials {
                  fieldGroupName
                  title
                  cta {
                    target
                    title
                    url
                  }
                  testimonialsList {
                    coverPhoto {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    fieldGroupName
                    name
                    position
                    text
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_FeaturedTestimonial {
                  fieldGroupName
                  name
                  position
                  text
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Faqs {
                  fieldGroupName
                  list {
                    question
                    fieldGroupName
                    answer
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                  desktop
                  fieldGroupName
                  mobile
                }
              }
            }
          }
        }
      }
      workPost: allWpWork {
        edges {
          node {
            id
            title
            uri
            databaseId
            slug
            excerpt
            content
            seo {
              title
              metaDesc
            }
            caseStudies {
              description
              fieldGroupName
              keyWork {
                fieldGroupName
                text
              }
              primaryCover {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                  url
                }
              }
              secondaryCover {
                altText
                localFile {
                  childImageSharp {
                    gatsbyImageData
                  }
                }
              }
              caseStudyFields {
                ... on WpWork_Casestudies_CaseStudyFields_ImageSection {
                  displaySettings
                  fieldGroupName
                  video {
                    altText
                    filename
                    localFile {
                      url
                      id
                    }
                    height
                    width
                  }
                  mediaType
                  image {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  mediaTypeSecondary
                  reverseImages
                  secondaryImage {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  secondayVideo {
                    altText
                    height
                    localFile {
                      url
                      id
                    }
                    width
                  }
                }
                ... on WpWork_Casestudies_CaseStudyFields_Content {
                  fieldGroupName
                  text
                  title
                }
                ... on WpWork_Casestudies_CaseStudyFields_Testimonial {
                  author
                  fieldGroupName
                  image {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  mediaType
                  text
                  video {
                    altText
                    height
                    localFile {
                      id
                      url
                    }
                    width
                  }
                }
                ... on WpWork_Casestudies_CaseStudyFields_CtaSection {
                  description
                  fieldGroupName
                  button {
                    target
                    title
                    url
                  }
                  title
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
                  displayMode
                  projectList {
                    cover {
                      altText
                      localFile {
                        childImageSharp {
                          gatsbyImageData
                        }
                      }
                    }
                    video {
                      altText
                      filename
                      localFile {
                        url
                        id
                      }
                      height
                      width
                    }
                    cta {
                      target
                      title
                      url
                    }
                    mediaSettings
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
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                  desktop
                  fieldGroupName
                  mobile
                }
              }
            }
          }
        }
      }
      partnersPage: wpPage(slug: { eq: "partners" }) {
        id
        content
        seo {
          title
          metaDesc
        }
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                  fieldGroupName
                  subtitle
                  text
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Capabilites {
                  description
                  fieldGroupName
                  items {
                    fieldGroupName
                    text
                    title
                  }
                  title
                  cta {
                    target
                    title
                    url
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                  desktop
                  fieldGroupName
                  mobile
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_ToolsResources {
                  fieldGroupName
                  title
                  list {
                    cta {
                      target
                      title
                      url
                    }
                    customWidth
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
                    svg
                    title
                  }
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
      backToBasics: wpPage(slug: { eq: "publisher-website-solutions" }) {
        id
        content
        template {
          ... on WpTemplate_PageBuilder {
            templateName
            pageBuilder {
              pageBuilder {
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_PageHeader {
                  fieldGroupName
                  subtitle
                  text
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextSection {
                  description
                  fieldGroupName
                  images {
                    altText
                    localFile {
                      childImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                  title
                  subHeading
                  moreFeatures
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                  desktop
                  fieldGroupName
                  mobile
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Hero {
                  fieldGroupName
                  text
                  title
                  image {
                    altText
                    localFile {
                      childrenImageSharp {
                        gatsbyImageData
                      }
                    }
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_TextButton {
                  description
                  fieldGroupName
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
                    comingSoonMode
                    wordpress
                  }
                }
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
                  description
                  fieldGroupName
                  cta {
                    title
                    target
                    url
                  }
                  title
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_CtaSection {
                  fieldGroupName
                  title
                  button {
                    target
                    title
                    url
                  }
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_LogoSection {
                  fieldGroupName
                }
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Spacer {
                  desktop
                  fieldGroupName
                  mobile
                }
              }
            }
          }
        }
      }
      calendarEvents: wpPage(slug: { eq: "calendar" }) {
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
                ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Calendar {
                  fieldGroupName
                  eventList {
                    ... on WpTemplate_PageBuilder_Pagebuilder_PageBuilder_Calendar_EventList_Event {
                      location
                      description
                      endDate
                      fieldGroupName
                      fullDay
                      image {
                        altText
                        localFile {
                          childrenImageSharp {
                            gatsbyImageData
                          }
                        }
                      }
                      link {
                        target
                        title
                        url
                      }
                      startDate
                      timeZone
                      title
                      type
                    }
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
  const postsPerPage = 35;
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

  for (let i = 2; i <= totalPages; i++) {
    createPage({
      path: `/insights/page/${i}`,
      component: path.resolve(`./src/templates/insights.js`),
      context: {
        page: i,
        limit: postsPerPage,
        skip: (i - 1) * postsPerPage,
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
    const categoryPostsPerPage = 9;
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
    // Filter posts for the current tag
    const filteredTagPosts = tag.posts.nodes.filter((post) => {
      const primaryTags = post.primaryTag?.selectPrimaryTag || [];
      const normalizedPrimaryTags = primaryTags.map((tag) => tag.toLowerCase());
      const isCaseStudy = post.categories.nodes.some(
        (category) => category.slug === 'case-studies'
      );
  
      return normalizedPrimaryTags.includes(tag.name.toLowerCase()) && !isCaseStudy;
    });
  
    console.log(`Filtered posts for tag ${tag.name}:`, filteredTagPosts.length);
  
    const tagPostsPerPage = 9; // Number of posts per page
    const totalPages = Math.ceil(filteredTagPosts.length / tagPostsPerPage);
  
    // Create the first page
    if (filteredTagPosts.length > 0) {
      createPage({
        path: `${tag.link}`,
        component: path.resolve('./src/templates/tags.js'),
        context: {
          tagId: tag.id,
          tagName: tag.name,
          tagSlug: tag.slug,
          page: 1,
          limit: tagPostsPerPage,
          skip: 0,
          totalPages,
          filteredPosts: filteredTagPosts, // Pass the filtered posts to context
        },
      });
  
      // Create paginated pages
      for (let i = 2; i <= totalPages; i++) {
        createPage({
          path: `${tag.link}page/${i}`,
          component: path.resolve('./src/templates/tags.js'),
          context: {
            tagId: tag.id,
            tagName: tag.name,
            tagSlug: tag.slug,
            page: i,
            limit: tagPostsPerPage,
            skip: (i - 1) * tagPostsPerPage,
            totalPages,
            filteredPosts: filteredTagPosts, // Pass the filtered posts to context
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

  const workPosts = result.data.workPost.edges;
  workPosts.forEach(({ node }) => {
    createPage({
      path: `/work/${node.slug}/`,
      component: path.resolve('./src/templates/work-post.js'),
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

  const brandingDeisgn = result.data.brandingDesign.template.pageBuilder.pageBuilder;
  brandingDeisgn.forEach(({ node }) => {
    createPage({
      path: `/services/branding-and-design/`,
      component: path.resolve(`./src/templates/branding-design.js`),
    });
  });

  const websiteDevelopment = result.data.websiteDevelopmentPage.template.pageBuilder.pageBuilder;
  websiteDevelopment.forEach(({ node }) => {
    createPage({
      path: `/services/website-development/`,
      component: path.resolve(`./src/templates/website-development.js`),
    });
  });

  const optimizationPages = result.data.optimizationPage.template.pageBuilder.pageBuilder;
  optimizationPages.forEach(({ node }) => {
    createPage({
      path: `/services/optimization/`,
      component: path.resolve(`./src/templates/optimization.js`),
    });
  });

  const beehiiv = result.data.beehiivPage.template.pageBuilder.pageBuilder;
  beehiiv.forEach(({ node }) => {
    createPage({
      path: `/integration-toolkit-for-beehiiv/`,
      component: path.resolve(
        `./src/templates/integration-toolkit-for-beehiiv.js`
      ),
    });
  });
  const ourWork = result.data.workPage.template.pageBuilder.pageBuilder;
  ourWork.forEach(({ node }) => {
    createPage({
      path: `/work/`,
      component: path.resolve(`./src/templates/work.js`),
    });
  });
  const partnersPage =
    result.data.partnersPage.template.pageBuilder.pageBuilder;
  partnersPage.forEach(({ node }) => {
    createPage({
      path: `/partners/`,
      component: path.resolve(`./src/templates/partners.js`),
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
  const aboutPage = result.data.aboutPage.template.pageBuilder.pageBuilder;
  aboutPage.forEach(({ node }) => {
    createPage({
      path: `/about/`,
      component: path.resolve(`./src/templates/about.js`),
    });
  });
  const backToBasics = result.data.backToBasics.template.pageBuilder.pageBuilder;
  backToBasics.forEach(({ node }) => {
    createPage({
      path: `/publisher-website-solutions/`,
      component: path.resolve(`./src/templates/backtobasics.js`),
    });
  });
  const calendarPage = result.data.calendarEvents.template.pageBuilder.pageBuilder;
  calendarPage.forEach(({ node }) => {
    createPage({
      path: `/calendar/`,
      component: path.resolve(`./src/templates/calendar.js`),
    });
  });
};

