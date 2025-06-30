"use client"

import { Hero3D } from "@/components/hero-3d"
import { Stats3D } from "@/components/stats-3d"
import { Services3D } from "@/components/services-3d"
import { TestimonialsPreview } from "@/components/testimonials-preview"
import { CTASection } from "@/components/cta-section"
import { ParticleBackground } from "@/components/particle-background"

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
