"use client"

import { motion } from "framer-motion"
import { Activity, Zap, Shield, Target, Heart, Brain, Bone, Stethoscope } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const services = [
  {
    icon: Activity,
    title: "Sports Injury Recovery",
    description:
      "Specialized treatment for athletes and sports-related injuries with advanced rehabilitation techniques.",
    features: ["Injury Assessment", "Recovery Planning", "Performance Enhancement", "Biomechanical Analysis"],
    duration: "4-8 weeks",
    price: "From ₹2,500",
  },
  {
    icon: Zap,
    title: "Pain Management",
    description: "Comprehensive pain relief solutions using modern physiotherapy methods and equipment.",
    features: ["Chronic Pain Relief", "Acute Pain Treatment", "Preventive Care", "TENS Therapy"],
    duration: "2-6 weeks",
    price: "From ₹1,800",
  },
  {
    icon: Shield,
    title: "Orthopedic Care",
    description: "Expert care for bone, joint, and muscle conditions with personalized treatment plans.",
    features: ["Joint Mobility", "Muscle Strengthening", "Posture Correction", "Manual Therapy"],
    duration: "3-8 weeks",
    price: "From ₹2,000",
  },
  {
    icon: Target,
    title: "Rehabilitation Therapy",
    description: "Complete rehabilitation programs for post-surgery recovery and mobility restoration.",
    features: ["Post-Surgery Care", "Mobility Training", "Strength Building", "Functional Training"],
    duration: "6-12 weeks",
    price: "From ₹3,000",
  },
  {
    icon: Heart,
    title: "Cardiac Rehabilitation",
    description: "Specialized cardiac rehab programs to improve heart health and overall fitness.",
    features: ["Exercise Training", "Heart Rate Monitoring", "Lifestyle Counseling", "Risk Assessment"],
    duration: "8-12 weeks",
    price: "From ₹3,500",
  },
  {
    icon: Brain,
    title: "Neurological Rehabilitation",
    description: "Treatment for neurological conditions including stroke, spinal cord injuries, and more.",
    features: ["Motor Skills Training", "Balance Training", "Cognitive Therapy", "Gait Training"],
    duration: "8-16 weeks",
    price: "From ₹4,000",
  },
  {
    icon: Bone,
    title: "Geriatric Physiotherapy",
    description: "Specialized care for elderly patients focusing on mobility, balance, and independence.",
    features: ["Fall Prevention", "Balance Training", "Strength Maintenance", "Pain Management"],
    duration: "4-8 weeks",
    price: "From ₹2,200",
  },
  {
    icon: Stethoscope,
    title: "Respiratory Therapy",
    description: "Breathing exercises and techniques to improve lung function and respiratory health.",
    features: ["Breathing Exercises", "Chest Physiotherapy", "Airway Clearance", "Pulmonary Rehab"],
    duration: "3-6 weeks",
    price: "From ₹2,800",
  },
]

export default function ServicesPage() {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-6">
              Our <span className="gradient-text">Expert Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Comprehensive physiotherapy services designed to help you recover, strengthen, and maintain optimal health
              with personalized care plans.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all duration-300 group border-2 hover:border-primary/20">
                  <CardHeader>
                    <div className="w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <service.icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl font-heading group-hover:text-primary transition-colors">
                      {service.title}
                    </CardTitle>
                    <CardDescription className="text-base">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">What's Included:</h4>
                        <ul className="space-y-1">
                          {service.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t">
                        <div>
                          <Badge variant="secondary" className="mb-1">
                            {service.duration}
                          </Badge>
                          <div className="text-lg font-semibold text-primary">{service.price}</div>
                        </div>
                        <Button size="sm" asChild>
                          <Link href="/book-appointment">Book Now</Link>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-heading font-bold mb-6">Not Sure Which Service You Need?</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Our expert physiotherapists will assess your condition and recommend the best treatment plan for your
              specific needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link href="/book-appointment">Book Consultation</Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
