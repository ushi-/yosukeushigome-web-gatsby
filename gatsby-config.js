module.exports = {
  siteMetadata: {
    title: `Yosuke Ushigome`,
    author: `@ushi_`,
    headerTitle: `I’m Yosuke Ushigome, a creative technologist based in London.`,
    headerSubtitle: `I demystify emerging technology through prototyping.`,
  },
  plugins: [
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'pages',
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 888,
              linkImagesToOriginal: false,
              quality: 90,
            },
          },
          {
            resolve: 'gatsby-remark-responsive-iframe',
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-plugin-sharp',
    `gatsby-plugin-sass`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-105176629-1`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-twitter`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-glamor`,
  ],
}
