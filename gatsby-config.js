const { config } = require('dotenv');

config();

const siteUrl = process.env.URL || `https://refact.co`;

module.exports = {
  siteMetadata: {
    title: `Refact | Creative & Digital Product Design Studio for News & Media`,
    siteUrl: `http://refact.co`,
    description: `We work with independent media and news organizations to design, build and scale publishing platforms and digital experiences.`,
    image: `/opengragh.jpg`,
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-env-variables',
      options: {
        allowList: ['WPGRAPHQL_URL'],
      },
    },
    {
      resolve: 'gatsby-plugin-google-tagmanager',
      options: {
        id: 'GTM-T2WVS9L',
        includeInDevelopment: false,
      },
    },
    {
      resolve: 'gatsby-plugin-sitemap',
      options: {
        query: `
      {
        allSitePage {
          nodes {
            path
          }
        }
        allWpContentNode(filter: {nodeType: {in: ["Post", "Page"]}}) {
          nodes {
            ... on WpPost {
              uri
              modifiedGmt
            }
            ... on WpPage {
              uri
              modifiedGmt
            }
          }
        }
      }
    `,
        resolveSiteUrl: () => siteUrl,
        resolvePages: ({
          allSitePage: { nodes: allPages },
          allWpContentNode: { nodes: allWpNodes },
        }) => {
          const wpNodeMap = allWpNodes.reduce((acc, node) => {
            const { uri } = node;
            acc[uri] = node;

            return acc;
          }, {});

          return allPages.map((page) => {
            return { ...page, ...wpNodeMap[page.path] };
          });
        },
        serialize: ({ path, modifiedGmt }) => {
          return {
            url: path,
            lastmod: modifiedGmt,
          };
        },
      },
    },
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        url: process.env.WPGRAPHQL_URL || 'https://refact.wpengine.com/graphql',
      },
    },
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://refact.co`,
        stripQueryString: true,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-prismjs',
            options: {
              classPrefix: 'language-', // adjust to match your WordPress class
              inlineCodeMarker: null,
              showLineNumbers: false,
              noInlineHighlight: false,
            },
          },
        ],
      },
    },
    'gatsby-plugin-image',
    {
      resolve: `gatsby-plugin-sharp`,
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 90,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    'gatsby-transformer-sharp',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        icon: 'src/images/icon.png',
      },
    },
    'gatsby-plugin-mdx',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'images',
        path: './src/images/',
      },
      __key: 'images',
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: './src/pages/',
      },
      __key: 'pages',
    },
  ],
};
