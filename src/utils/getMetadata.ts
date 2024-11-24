import { META } from "@/constants/meta";
import { Metadata } from "next";

interface generateMetadataProps {
  title?: string;
  description?: string;
  asPath?: string;
  ogImage?: string;
}

export const getMetadata = (metadataProps?: generateMetadataProps) => {
  const { title, description, asPath, ogImage } = metadataProps || {};

  const TITLE = title ? `${title} | GIVEN's LOG` : META.title;
  const DESCRIPTION = description || META.description;
  const PAGE_URL = asPath ? asPath : "";
  const OG_IMAGE = ogImage || META.ogImage;

  const metadata: Metadata = {
    metadataBase: new URL(META.url),
    alternates: {
      canonical: "/",
    },
    title: TITLE,
    description: DESCRIPTION,
    keywords: [...META.keyword],
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      siteName: META.siteName,
      locale: "ko_KR",
      type: "website",
      url: PAGE_URL,
    },
    verification: {
      google: META.googleVerification,
      other: {
        "naver-site-verification": META.naverVerification,
      },
    },
    twitter: {
      title: TITLE,
      description: DESCRIPTION,
      images: {
        url: OG_IMAGE,
      },
    },
    icons: {
      icon: { rel: "icon", url: "/favicon.ico", sizes: "48x48" },
      apple: [
        { rel: "", url: `/meta/apple-icon.png` },
        {
          url: `/meta/apple-icon-57x57.png`,
          sizes: "57x57",
          type: "image/png",
        },
        {
          url: `/meta/apple-icon-60x60.png`,
          sizes: "60x60",
          type: "image/png",
        },
        {
          url: `/meta/apple-icon-76x76.png`,
          sizes: "76x76",
          type: "image/png",
        },
        {
          url: `/meta/apple-icon-114x114.png`,
          sizes: "114x114",
          type: "image/png",
        },
        {
          url: `/meta/apple-icon-120x120.png`,
          sizes: "120x120",
          type: "image/png",
        },
        {
          url: `/meta/apple-icon-144x144.png`,
          sizes: "144x144",
          type: "image/png",
        },
        {
          url: `/meta/apple-icon-152x152.png`,
          sizes: "152x152",
          type: "image/png",
        },
        {
          url: `/meta/apple-icon-180x180.png`,
          sizes: "180x180",
          type: "image/png",
        },
      ],
      other: [
        {
          rel: "apple-touch-icon-precomposed",
          url: `/meta/apple-icon-precomposed.png`,
          type: "image/png",
        },
      ],
    },
  };

  return metadata;
};
