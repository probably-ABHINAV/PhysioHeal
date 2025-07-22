
"use client"

import { motion } from "framer-motion"
import { Calendar, Stethoscope, Activity, ThumbsUp, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

const steps = [
  {
    icon: Calendar,
    title: "Book Consultation",
    description: "Schedule your appointment online or call us directly",
    details: ["Free initial consultation", "Flexible timing", "Home visits available"]
  },
  {
    icon: Stethoscope,
    title: "Assessment & Diagnosis",
    description: "Comprehensive evaluation of your condition",
    details: ["Detailed health history", "Physical examination", "Movement analysis"]
  },
  {
    icon: Activity,
    title: "Personalized Treatment",
    description: "Customized therapy plan based on your needs",
    details: ["Manual therapy", "Exercise prescription", "Pain management"]
  },
  {
    icon: ThumbsUp,
    title: "Recovery & Wellness",
    description: "Achieve your health goals with ongoing support",
    details: ["Progress monitoring", "Lifestyle advice", "Prevention strategies"]
  }
]

export function ProcessSteps() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Your Journey to Recovery
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Our proven 4-step process ensures you receive the best possible care for your recovery
          </p>
        </motion.div>

        <div className="relative">
          {/* Progress Line */}
          <div className="hidden lg:block absolute top-1/2 left-8 right-8 h-0.5 bg-gradient-to-r from-primary to-secondary transform -translate-y-1/2" />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                {/* Step Number */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                  {index + 1}
                </div>

                <Card className="h-full group hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20 pt-8">
                  <CardContent className="text-center p-6">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                      <step.icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-heading font-bold mb-3 group-hover:text-primary transition-colors">
                      {step.title}
                    </h3>

                    {/* Description */}
                    <p className="text-muted-foreground mb-4">
                      {step.description}
                    </p>

                    {/* Details */}
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center justify-center text-sm">
                          <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-primary">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
