import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { Toaster } from "@/components/ui/toaster"
import { JsonLd } from "react-schemaorg"
import { organizationSchema, localBusinessSchema, medicalOrganizationSchema } from "@/lib/schemas"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
  preload: true,
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#00ADB5" },
    { media: "(prefers-color-scheme: dark)", color: "#00ADB5" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL("https://physioheal.com"),
  title: {
    default: "PhysioHeal Clinic | Expert Physiotherapy Care | BPT MPT Ortho",
    template: "%s | PhysioHeal Clinic",
  },
  description:
    "Trusted physiotherapy clinic with 5+ years experience in orthopedic care. Expert treatment for sports injuries, back pain, and rehabilitation. Book your appointment today!",
  keywords: [
    "physiotherapy",
    "orthopedic care",
    "sports injury",
    "back pain",
    "rehabilitation",
    "BPT",
    "MPT",
    "physiotherapist",
    "physical therapy",
    "pain management",
    "sports medicine",
    "orthopedic rehabilitation",
    "manual therapy",
    "exercise therapy",
    "post-surgery rehabilitation",
    "Gurgaon physiotherapy",
    "Palam Vihar clinic",
  ],
  authors: [{ name: "PhysioHeal Clinic" }],
  creator: "PhysioHeal Clinic",
  publisher: "PhysioHeal Clinic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://physioheal.com",
    siteName: "PhysioHeal Clinic",
    title: "PhysioHeal Clinic | Expert Physiotherapy Care",
    description: "Healing through technology and expert care. 5+ years of trusted physiotherapy services.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "PhysioHeal Clinic - Modern Physiotherapy Care",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "PhysioHeal Clinic | Expert Physiotherapy Care",
    description: "Trusted physiotherapy clinic with 5+ years experience",
    images: ["/og-image.jpg"],
    creator: "@physioheal",
    site: "@physioheal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#00ADB5" }],
  },
  manifest: "/site.webmanifest",
  alternates: {
    canonical: "https://physioheal.com",
  },
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  category: "healthcare",
  classification: "Medical Services",
  other: {
    "geo.region": "IN-HR",
    "geo.placename": "Gurgaon, Haryana",
    "geo.position": "28.5021;77.046",
    ICBM: "28.5021, 77.046",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "PhysioHeal",
    "application-name": "PhysioHeal",
    "msapplication-TileColor": "#00ADB5",
    "msapplication-config": "/browserconfig.xml",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <JsonLd item={organizationSchema} />
        <JsonLd item={localBusinessSchema} />
        <JsonLd item={medicalOrganizationSchema} />
        <link rel="preload" href="/hero-bg.webp" as="image" type="image/webp" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="dns-prefetch" href="//api.whatsapp.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <div className="relative min-h-screen">
            <Navbar />
            <main className="min-h-screen">{children}</main>
            <WhatsAppFloat />
            <Toaster />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
