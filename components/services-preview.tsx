"use client"

import { motion } from "framer-motion"
import { ArrowRight, Activity, Zap, Shield, Target } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

const services = [
  {
    icon: Activity,
    title: "Sports Injury Recovery",
    description:
      "Specialized treatment for athletes and sports-related injuries with advanced rehabilitation techniques.",
    features: ["Injury Assessment", "Recovery Planning", "Performance Enhancement"],
  },
  {
    icon: Zap,
    title: "Pain Management",
    description: "Comprehensive pain relief solutions using modern physiotherapy methods and equipment.",
    features: ["Chronic Pain Relief", "Acute Pain Treatment", "Preventive Care"],
  },
  {
    icon: Shield,
    title: "Orthopedic Care",
    description: "Expert care for bone, joint, and muscle conditions with personalized treatment plans.",
    features: ["Joint Mobility", "Muscle Strengthening", "Posture Correction"],
  },
  {
    icon: Target,
    title: "Rehabilitation Therapy",
    description: "Complete rehabilitation programs for post-surgery recovery and mobility restoration.",
    features: ["Post-Surgery Care", "Mobility Training", "Strength Building"],
  },
]

export function ServicesPreview() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">
            Our <span className="gradient-text">Expert Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive physiotherapy services tailored to your specific needs with the latest treatment methods
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 group cursor-pointer border-2 hover:border-primary/20">
                <CardHeader className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="mb-4">{service.description}</CardDescription>
                  <ul className="space-y-2 text-sm">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button size="lg" asChild>
            <Link href="/services">
              View All Services
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
