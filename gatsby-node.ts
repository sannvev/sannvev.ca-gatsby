import type { GatsbyNode } from "gatsby";

export const createSchemaCustomization: GatsbyNode["createSchemaCustomization"] = ({
  actions,
}) => {
  actions.createTypes(`
    type SiteSiteMetadata {
      title: String!
      titleTemplate: String!
      description: String!
      siteUrl: String!
      legalName: String!
      locale: String!
    }
  `);
};
