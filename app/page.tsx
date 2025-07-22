"use client"

import { HeroSection } from "@/components/hero-section"
import { ServicesPreview } from "@/components/services-preview"
import { TestimonialsPreview } from "@/components/testimonials-preview"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { StatsSection } from "@/components/stats-section"
import { QuickStats } from "@/components/quick-stats"
import { ProcessSteps } from "@/components/process-steps"
import { CTASection } from "@/components/cta-section"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { EmergencyCTA } from "@/components/emergency-cta"
import { TrustSignals } from "@/components/trust-signals"
import { ConsultationForm } from "@/components/consultation-form"
import { SymptomsChecker } from "@/components/symptoms-checker"

export default function HomePage() {
  return (
    <div className="relative overflow-hidden">
      <HeroSection />
      <TrustSignals />
      <QuickStats />
      <ServicesPreview />
      <ProcessSteps />
      <SymptomsChecker />
      <TestimonialsCarousel />
      <StatsSection />
      <ConsultationForm />
      <CTASection />
      <WhatsAppFloat />
      <EmergencyCTA />
    </div>
  )
}