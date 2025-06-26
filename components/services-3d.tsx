"use client"

import React from "react"

import { useState, useRef } from "react"
import { motion, useInView, AnimatePresence } from "framer-motion"
import { ArrowRight, Activity, Zap, Shield, Target, Brain, Heart, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

const services = [
  {
    icon: Activity,
    title: "Sports Injury Recovery",
    description: "Advanced rehabilitation using 3D movement analysis and biomechanical assessment.",
    features: ["3D Gait Analysis", "Performance Optimization", "Injury Prevention", "Return-to-Sport Protocol"],
    duration: "4-8 weeks",
    price: "From ₹2,500",
    color: "from-red-500 to-orange-500",
    bgPattern: "radial-gradient(circle at 30% 20%, rgba(255,0,0,0.1) 0%, transparent 50%)",
  },
  {
    icon: Zap,
    title: "Pain Management",
    description: "Revolutionary pain relief using electrotherapy, laser therapy, and manual techniques.",
    features: ["Laser Therapy", "TENS Treatment", "Dry Needling", "Manual Therapy"],
    duration: "2-6 weeks",
    price: "From ₹1,800",
    color: "from-yellow-500 to-orange-500",
    bgPattern: "radial-gradient(circle at 70% 30%, rgba(255,255,0,0.1) 0%, transparent 50%)",
  },
  {
    icon: Shield,
    title: "Orthopedic Care",
    description: "Comprehensive musculoskeletal treatment with advanced diagnostic techniques.",
    features: ["Joint Mobilization", "Strength Training", "Postural Correction", "Movement Re-education"],
    duration: "3-8 weeks",
    price: "From ₹2,000",
    color: "from-blue-500 to-cyan-500",
    bgPattern: "radial-gradient(circle at 50% 50%, rgba(0,0,255,0.1) 0%, transparent 50%)",
  },
  {
    icon: Target,
    title: "Rehabilitation Therapy",
    description: "Complete post-surgical and injury rehabilitation with personalized protocols.",
    features: ["Post-Surgery Care", "Functional Training", "Balance Training", "Strength Building"],
    duration: "6-12 weeks",
    price: "From ₹3,000",
    color: "from-green-500 to-emerald-500",
    bgPattern: "radial-gradient(circle at 20% 80%, rgba(0,255,0,0.1) 0%, transparent 50%)",
  },
  {
    icon: Brain,
    title: "Neurological Rehabilitation",
    description: "Specialized neuro-physiotherapy for stroke, spinal cord, and brain injuries.",
    features: ["Motor Re-learning", "Cognitive Training", "Balance Therapy", "Gait Training"],
    duration: "8-16 weeks",
    price: "From ₹4,000",
    color: "from-purple-500 to-pink-500",
    bgPattern: "radial-gradient(circle at 80% 20%, rgba(128,0,128,0.1) 0%, transparent 50%)",
  },
  {
    icon: Heart,
    title: "Cardiac Rehabilitation",
    description: "Heart-healthy exercise programs with continuous monitoring and support.",
    features: ["Exercise Training", "Heart Monitoring", "Lifestyle Coaching", "Risk Assessment"],
    duration: "8-12 weeks",
    price: "From ₹3,500",
    color: "from-pink-500 to-red-500",
    bgPattern: "radial-gradient(circle at 40% 60%, rgba(255,20,147,0.1) 0%, transparent 50%)",
  },
]

export function Services3D() {
  const [selectedService, setSelectedService] = useState<number | null>(null)
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true })

  return (
    <section
      ref={containerRef}
      className="py-32 bg-gradient-to-br from-background via-muted/30 to-background relative overflow-hidden"
    >
      {/* Animated Background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            background: [
              "radial-gradient(circle at 20% 50%, rgba(0,173,181,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, rgba(44,110,73,0.1) 0%, transparent 50%)",
              "radial-gradient(circle at 40% 80%, rgba(0,173,181,0.1) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-heading font-black mb-6"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Revolutionary <span className="gradient-text">Services</span>
          </motion.h2>
          <motion.p
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Experience the future of physiotherapy with our advanced treatment modalities and personalized care
            approaches
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50, rotateX: -15 }}
              animate={isInView ? { opacity: 1, y: 0, rotateX: 0 } : {}}
              transition={{
                duration: 0.8,
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="group cursor-pointer"
              onClick={() => setSelectedService(index)}
            >
              <Card className="h-full card-3d overflow-hidden border-2 hover:border-primary/30 transition-all duration-500">
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: service.bgPattern }}
                />

                <CardContent className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <motion.div
                    className="w-20 h-20 mb-6 relative"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-2xl blur-lg opacity-50 group-hover:opacity-70 transition-opacity`}
                    />
                    <div className="relative w-full h-full bg-gradient-to-br from-white to-gray-100 rounded-2xl flex items-center justify-center shadow-lg">
                      <service.icon className="w-10 h-10 text-gray-700" />
                    </div>
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-heading font-bold mb-4 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-muted-foreground mb-6 flex-grow leading-relaxed">{service.description}</p>

                  {/* Features Preview */}
                  <div className="mb-6">
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="text-xs px-3 py-1 bg-primary/10 text-primary rounded-full">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 2 && (
                        <span className="text-xs px-3 py-1 bg-muted text-muted-foreground rounded-full">
                          +{service.features.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Pricing & Duration */}
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <div className="text-sm text-muted-foreground">{service.duration}</div>
                      <div className="text-lg font-bold text-primary">{service.price}</div>
                    </div>
                    <motion.div
                      className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </div>

                  {/* Hover Effect Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"
                    initial={false}
                  />
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center"
        >
          <Button size="lg" className="btn-3d pulse-glow-3d" asChild>
            <Link href="/services">
              Explore All Services
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
          </Button>
        </motion.div>
      </div>

      {/* Service Detail Modal */}
      <AnimatePresence>
        {selectedService !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedService(null)}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, rotateX: -15 }}
              animate={{ scale: 1, opacity: 1, rotateX: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateX: 15 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="bg-white dark:bg-gray-900 rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto glass-card"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Service Details */}
              {selectedService !== null && (
                <div>
                  <div className="flex items-center mb-6">
                    <div
                      className={`w-16 h-16 bg-gradient-to-br ${services[selectedService].color} rounded-2xl flex items-center justify-center mr-4`}
                    >
                      {React.createElement(services[selectedService].icon, { className: "w-8 h-8 text-white" })}
                    </div>
                    <div>
                      <h3 className="text-3xl font-heading font-bold">{services[selectedService].title}</h3>
                      <p className="text-muted-foreground">
                        {services[selectedService].duration} • {services[selectedService].price}
                      </p>
                    </div>
                  </div>

                  <p className="text-lg mb-8 leading-relaxed">{services[selectedService].description}</p>

                  <div className="mb-8">
                    <h4 className="text-xl font-semibold mb-4">What's Included:</h4>
                    <div className="grid grid-cols-2 gap-3">
                      {services[selectedService].features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <div className="w-2 h-2 bg-primary rounded-full mr-3" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <Button className="flex-1 btn-3d" asChild>
                      <Link href="/book-appointment">Book Consultation</Link>
                    </Button>
                    <Button variant="outline" className="flex-1" asChild>
                      <Link href="/contact">Learn More</Link>
                    </Button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
