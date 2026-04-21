import type { GatsbyConfig } from "gatsby";

const siteUrl = process.env.SITE_URL || "https://sannvev.ca";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Sannvev Institute",
    titleTemplate: "%s — Sannvev Institute",
    description:
      "Sannvev Institute is a Canadian non-profit advancing auditable AI and information integrity research.",
    siteUrl,
    legalName: "Sannvev Institute",
    locale: "en_CA",
  },
  graphqlTypegen: true,
  trailingSlash: "always",
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: `${__dirname}/src/pages`,
      },
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-plugin-mdx",
      options: {
        extensions: [".mdx"],
      },
    },
    {
      resolve: "gatsby-plugin-manifest",
      options: {
        name: "Sannvev Institute",
        short_name: "Sannvev",
        start_url: "/",
        background_color: "#0B0B0B",
        theme_color: "#2E6B40",
        display: "standalone",
        icon: "src/images/sannvev-mark.png",
      },
    },
    "gatsby-plugin-sitemap",
    {
      resolve: "gatsby-plugin-robots-txt",
      options: {
        host: siteUrl,
        sitemap: `${siteUrl}/sitemap-index.xml`,
        policy: [{ userAgent: "*", allow: "/" }],
      },
    },
  ],
};

export default config;
