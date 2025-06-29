
import { Hero3D } from "@/components/hero-3d"
import { Services3D } from "@/components/services-3d"
import { Stats3D } from "@/components/stats-3d"
import { TestimonialsPreview } from "@/components/testimonials-preview"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Hero3D />
      <Services3D />
      <Stats3D />
      <TestimonialsPreview />
      <CTASection />
      <Footer />
      <WhatsAppFloat />
    </main>
  )
}
