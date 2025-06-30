
import { Metadata } from "next"
import { ConsultationForm } from "@/components/consultation-form"

export const metadata: Metadata = {
  title: "Book Appointment | PhysioHeal",
  description: "Book your physiotherapy consultation appointment with our expert team.",
}

export default function BookAppointmentPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
            Book Your <span className="gradient-text">Consultation</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Schedule your personalized physiotherapy consultation with our expert team. 
            We'll help you on your journey to recovery and optimal health.
          </p>
        </div>
        
        <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl p-8">
          <ConsultationForm />
        </div>
        
        <div className="text-center mt-8 space-y-4">
          <p className="text-sm text-muted-foreground">
            Need immediate assistance? Call us directly:
          </p>
          <a
            href="tel:+917979855427"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            📞 Call: +91 7979855427
          </a>
        </div>
      </div>
    </div>
  )
}
