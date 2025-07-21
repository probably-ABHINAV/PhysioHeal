"use client"

import { Hero3D } from "@/components/hero-3d"
import { Stats3D } from "@/components/stats-3d"
import { Services3D } from "@/components/services-3d"
import { TestimonialsPreview } from "@/components/testimonials-preview"
import { CTASection } from "@/components/cta-section"
import { ParticleBackground } from "@/components/particle-background"
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PhysioHeal - फिजियोथेरेपी डॉक्टर | Home Physiotherapy Services in India',
  description: 'भारत में सबसे अच्छी फिजियोथेरेपी सेवा। घर बैठे इलाज। Expert physiotherapy for back pain, knee pain, neck pain. Book certified physiotherapist. ₹299 onwards.',
  keywords: 'physiotherapy, फिजियोथेरेपी, back pain treatment, knee pain doctor, home physiotherapy, physio near me, BPT doctor, physiotherapy in delhi, mumbai, bangalore, pune, chennai, hyderabad',
  authors: [{ name: 'PhysioHeal Team' }],
  creator: 'PhysioHeal',
  publisher: 'PhysioHeal India',
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
  metadataBase: new URL('https://physio-heal.vercel.app'),
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/en-IN',
      'hi-IN': '/hi-IN',
    },
  },
  openGraph: {
    title: 'PhysioHeal - India\'s Best Home Physiotherapy Services',
    description: 'Certified physiotherapists at your doorstep. Treatment for back pain, knee pain, sports injuries. Insurance accepted. Book now!',
    url: 'https://physio-heal.vercel.app',
    siteName: 'PhysioHeal',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'PhysioHeal - Professional Physiotherapy Services',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PhysioHeal - Expert Physiotherapy at Home',
    description: 'Book certified physiotherapist. Treatment starts at ₹299. Available in 25+ cities.',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <ParticleBackground />
      <Hero3D />
      <Stats3D />
      <Services3D />
      <TestimonialsPreview />
      <CTASection />
    </div>
  )
}