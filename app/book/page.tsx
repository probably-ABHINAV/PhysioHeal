import { ConsultationForm } from "@/components/consultation-form";
import React from "react";
import { motion } from "framer-motion";
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Book Appointment | PhysioHeal",
  description: "Book your physiotherapy consultation appointment with our expert team.",
}

export default function BookPage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container-mobile py-8 md:py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto text-center mb-8 md:mb-12"
        >
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-4 md:mb-6">
            Book Your <span className="gradient-text">Consultation</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Schedule your personalized physiotherapy consultation with our expert team.
            We'll help you on your journey to recovery and optimal health.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          {/* Consultation Form */}
          <ConsultationForm />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-6 md:mt-8 space-y-4"
        >
          <p className="text-sm text-muted-foreground">
            Need immediate assistance? Call us directly:
          </p>
          <a
            href="tel:+917979855427"
            className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors btn-3d"
          >
            📞 Call: +91 7979855427
          </a>
        </motion.div>
      </div>
    </div>
  );
}