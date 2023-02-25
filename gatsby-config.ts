/* eslint-disable @typescript-eslint/no-var-requires */
import type { GatsbyConfig } from "gatsby"

require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
})

const strapiConfig = {
  apiURL: process.env.STRAPI_API_URL,
  accessToken: process.env.STRAPI_TOKEN,
  singleTypes: [],
  collectionTypes: [
    {
      singularName: process.env.STRAPI_API_PAGES,
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
    {
      singularName: process.env.STRAPI_API_ASSETS,
      pluginOptions: {
        i18n: {
          locale: "all",
        },
      },
    },
  ],
  queryLimit: 1000,
}

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Izycoins`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-google-gtag",
    "gatsby-plugin-tsconfig-paths",
    "gatsby-transformer-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-source-strapi`,
      options: strapiConfig,
    },
  ],
}

export default config
