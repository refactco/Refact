/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Refact | Digital Partner for Creators & Audience-first Media`,
    siteUrl: `https://refact.co`,
    description: `We work with independent media and news organizations to design, build and scale publishing platforms and digital experiences.`,
    image: `/opengragh.jpg`,
  },
  plugins: [{
    resolve: 'gatsby-source-wordpress',
    options: {
      url: process.env.WPGRAPHQL_URL ||  "https://refact.co/graphql",
    }
  },
  {
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: "GTM-T2WVS9L",
      includeInDevelopment: false,
    },
  }, 
  {
    resolve: `gatsby-plugin-canonical-urls`,
    options: {
      siteUrl: `https://refact.co`,
    },
  }, "gatsby-plugin-image", 
  {
    resolve: `gatsby-plugin-sharp`,
    options: {
      defaults: {
        formats: [`auto`, `webp`],
        placeholder: `dominantColor`,
        quality: 50,
        breakpoints: [750, 1080, 1366, 1920],
        backgroundColor: `transparent`,
        tracedSVGOptions: {},
        blurredOptions: {},
        jpgOptions: {},
        pngOptions: {},
        webpOptions: {},
        avifOptions: {},
      }
    }
  },
  "gatsby-transformer-sharp", "gatsby-plugin-sass", "gatsby-plugin-sitemap", {
    resolve: 'gatsby-plugin-manifest',
    options: {
      "icon": "src/images/icon.png"
    }
  }, "gatsby-plugin-mdx", {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "images",
      "path": "./src/images/"
    },
    __key: "images"
  }, {
    resolve: 'gatsby-source-filesystem',
    options: {
      "name": "pages",
      "path": "./src/pages/"
    },
    __key: "pages"
  }]
};