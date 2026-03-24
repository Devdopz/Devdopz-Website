import type { Metadata } from "next";

const fallbackSiteUrl = "https://www.devdopz.com";

function normalizeSiteUrl(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export const siteName = "Devdopz";
export const siteUrl = normalizeSiteUrl(
  process.env.NEXT_PUBLIC_SITE_URL || fallbackSiteUrl,
);
export const defaultTitle = "Devdopz";
export const defaultDescription =
  "Devdopz is a Kerala-based open source developer organization focused on collaboration, real projects, contributor growth, and hire-ready developer profiles.";
export const defaultKeywords = [
  "Devdopz",
  "Kerala open source organization",
  "open source developer organization in Kerala",
  "Kerala developer community",
  "developer organization Kerala",
  "open source community India",
  "hire developers from Kerala",
  "Devdopz projects",
  "GitHub contributors Kerala",
  "builder community Kerala",
];

type CreatePageMetadataOptions = {
  description: string;
  keywords?: string[];
  noIndex?: boolean;
  path?: string;
  title?: string;
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

function buildTitle(title?: string) {
  return title ? `${title} | ${siteName}` : defaultTitle;
}

export function createPageMetadata({
  description,
  keywords = [],
  noIndex = false,
  path = "/",
  title,
}: CreatePageMetadataOptions): Metadata {
  const fullTitle = buildTitle(title);
  const canonicalUrl = absoluteUrl(path);
  const imageUrl = absoluteUrl("/Logo.jpg");

  return {
    title,
    description,
    keywords: [...defaultKeywords, ...keywords],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1200,
          alt: `${siteName} logo`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
          googleBot: {
            index: false,
            follow: false,
          },
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
          },
        },
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": absoluteUrl("/#organization"),
      name: siteName,
      url: siteUrl,
      logo: absoluteUrl("/Logo.jpg"),
      description: defaultDescription,
      foundingDate: "2024",
      foundingLocation: {
        "@type": "Place",
        name: "Kerala, India",
      },
      areaServed: "Kerala, India",
      sameAs: ["https://github.com/Devdopz", "https://t.me/devdopz"],
      knowsAbout: [
        "Open source collaboration",
        "Developer communities",
        "Software projects",
        "Contributor growth",
        "Hire-ready developer profiles",
      ],
    },
    {
      "@type": "WebSite",
      "@id": absoluteUrl("/#website"),
      url: siteUrl,
      name: siteName,
      description: defaultDescription,
      publisher: {
        "@id": absoluteUrl("/#organization"),
      },
      inLanguage: "en",
    },
  ],
};
