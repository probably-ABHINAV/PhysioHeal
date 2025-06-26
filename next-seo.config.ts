import type { DefaultSeoProps } from "next-seo"

const config: DefaultSeoProps = {
  titleTemplate: "%s | PhysioHeal Clinic",
  defaultTitle: "PhysioHeal Clinic | Expert Physiotherapy Care | BPT MPT Ortho",
  description:
    "Trusted physiotherapy clinic with 5+ years experience in orthopedic care. Expert treatment for sports injuries, back pain, and rehabilitation. Book your appointment today!",
  canonical: "https://physioheal.com",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://physioheal.com",
    siteName: "PhysioHeal Clinic",
    title: "PhysioHeal Clinic | Expert Physiotherapy Care",
    description: "Healing through technology and expert care. 5+ years of trusted physiotherapy services.",
    images: [
      {
        url: "https://physioheal.com/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PhysioHeal Clinic - Modern Physiotherapy Care",
        type: "image/jpeg",
      },
      {
        url: "https://physioheal.com/og-image-square.jpg",
        width: 1080,
        height: 1080,
        alt: "PhysioHeal Clinic Logo",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    handle: "@physioheal",
    site: "@physioheal",
    cardType: "summary_large_image",
  },
  additionalMetaTags: [
    {
      name: "viewport",
      content: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
    },
    {
      name: "keywords",
      content:
        "physiotherapy, orthopedic care, sports injury, back pain, rehabilitation, BPT, MPT, physiotherapist, physical therapy, pain management, sports medicine, orthopedic rehabilitation, manual therapy, exercise therapy, post-surgery rehabilitation",
    },
    {
      name: "author",
      content: "PhysioHeal Clinic",
    },
    {
      name: "robots",
      content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    },
    {
      name: "googlebot",
      content: "index, follow",
    },
    {
      name: "bingbot",
      content: "index, follow",
    },
    {
      name: "theme-color",
      content: "#00ADB5",
    },
    {
      name: "msapplication-TileColor",
      content: "#00ADB5",
    },
    {
      name: "apple-mobile-web-app-capable",
      content: "yes",
    },
    {
      name: "apple-mobile-web-app-status-bar-style",
      content: "default",
    },
    {
      name: "format-detection",
      content: "telephone=yes",
    },
    {
      name: "geo.region",
      content: "IN-HR",
    },
    {
      name: "geo.placename",
      content: "Gurgaon, Haryana",
    },
    {
      name: "geo.position",
      content: "28.5021;77.046",
    },
    {
      name: "ICBM",
      content: "28.5021, 77.046",
    },
  ],
  additionalLinkTags: [
    {
      rel: "icon",
      href: "/favicon.ico",
    },
    {
      rel: "apple-touch-icon",
      href: "/apple-touch-icon.png",
      sizes: "180x180",
    },
    {
      rel: "manifest",
      href: "/site.webmanifest",
    },
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
  ],
}

export default config
