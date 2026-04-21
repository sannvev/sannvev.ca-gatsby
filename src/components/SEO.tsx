import * as React from "react";
import { useStaticQuery, graphql } from "gatsby";

interface SEOProps {
  title?: string;
  description?: string;
  pathname?: string;
  children?: React.ReactNode;
}

interface SiteMetadataQuery {
  site: {
    siteMetadata: {
      title: string;
      titleTemplate: string;
      description: string;
      siteUrl: string;
      legalName: string;
      locale: string;
    };
  };
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  pathname,
  children,
}) => {
  const data = useStaticQuery<SiteMetadataQuery>(graphql`
    query {
      site {
        siteMetadata {
          title
          titleTemplate
          description
          siteUrl
          legalName
          locale
        }
      }
    }
  `);

  const meta = data.site.siteMetadata;
  const fullTitle = title
    ? meta.titleTemplate.replace("%s", title)
    : meta.title;
  const metaDescription = description || meta.description;
  const canonical = `${meta.siteUrl}${pathname || "/"}`;

  return (
    <>
      <html lang="en-CA" />
      <title>{fullTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:locale" content={meta.locale} />
      <meta property="og:site_name" content={meta.legalName} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="theme-color" content="#2E6B40" />
      {children}
    </>
  );
};

export default SEO;
