import * as React from "react";

interface OrgJsonLdProps {
  siteUrl: string;
}

const OrgJsonLd: React.FC<OrgJsonLdProps> = ({ siteUrl }) => {
  const data = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: "Sannvev Institute",
    url: siteUrl,
    logo: `${siteUrl}/sannvev-logo.png`,
    description:
      "Canadian non-profit research institute advancing auditable AI and information integrity.",
    foundingLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Winnipeg",
        addressRegion: "MB",
        addressCountry: "CA",
      },
    },
    areaServed: ["CA", "EU"],
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

export default OrgJsonLd;
