"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { 
  Activity, 
  Zap, 
  Heart, 
  Brain, 
  Baby, 
  Dumbbell,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react"

export default function ServicesPage() {
  const services = [
    {
      icon: Activity,
      title: "Orthopedic Physiotherapy",
      duration: "45-60 mins",
      price: "₹800-1200",
      description: "Specialized treatment for bone, joint, and muscle injuries including fractures, arthritis, and post-surgical rehabilitation.",
      benefits: [
        "Pain reduction and management",
        "Improved mobility and flexibility",
        "Faster recovery from injuries",
        "Prevention of future complications"
      ],
      conditions: ["Fractures", "Arthritis", "Joint replacement recovery", "Sports injuries"]
    },
    {
      icon: Brain,
      title: "Neurological Rehabilitation",
      duration: "60-90 mins",
      price: "₹1000-1500",
      description: "Comprehensive treatment for neurological conditions to improve motor function, balance, and coordination.",
      benefits: [
        "Improved motor control",
        "Enhanced balance and coordination",
        "Better quality of life",
        "Increased independence"
      ],
      conditions: ["Stroke recovery", "Parkinson's disease", "Multiple sclerosis", "Spinal cord injuries"]
    },
    {
      icon: Heart,
      title: "Cardiopulmonary Rehab",
      duration: "30-45 mins",
      price: "₹600-900",
      description: "Specialized therapy for heart and lung conditions to improve cardiovascular health and breathing capacity.",
      benefits: [
        "Improved heart health",
        "Better breathing capacity",
        "Increased endurance",
        "Risk factor management"
      ],
      conditions: ["Post-cardiac surgery", "COPD", "Asthma", "Heart failure"]
    },
    {
      icon: Dumbbell,
      title: "Sports Injury Rehabilitation",
      duration: "45-75 mins",
      price: "₹900-1400",
      description: "Specialized treatment for athletes and active individuals to recover from sports-related injuries.",
      benefits: [
        "Faster return to sport",
        "Improved performance",
        "Injury prevention",
        "Sport-specific training"
      ],
      conditions: ["ACL injuries", "Tennis elbow", "Shoulder impingement", "Runner's knee"]
    },
    {
      icon: Baby,
      title: "Pediatric Physiotherapy",
      duration: "30-45 mins",
      price: "₹700-1000",
      description: "Specialized care for children with developmental delays, genetic disorders, and injuries.",
      benefits: [
        "Improved motor development",
        "Enhanced coordination",
        "Better posture",
        "Increased confidence"
      ],
      conditions: ["Cerebral palsy", "Developmental delays", "Muscular dystrophy", "Autism spectrum disorders"]
    },
    {
      icon: Zap,
      title: "Pain Management",
      duration: "30-45 mins",
      price: "₹500-800",
      description: "Advanced techniques including TENS, ultrasound, and manual therapy for chronic pain relief.",
      benefits: [
        "Reduced pain levels",
        "Improved sleep quality",
        "Better daily function",
        "Medication reduction"
      ],
      conditions: ["Chronic back pain", "Fibromyalgia", "Migraine", "Arthritis pain"]
    }
  ]

  const specialTreatments = [
    {
      name: "Dry Needling",
      description: "Targeted trigger point therapy for muscle tension release",
      duration: "30 mins",
      price: "₹600"
    },
    {
      name: "Cupping Therapy",
      description: "Traditional therapy for improved blood circulation and pain relief",
      duration: "20 mins",
      price: "₹500"
    },
    {
      name: "Kinesio Taping",
      description: "Therapeutic taping for support and injury prevention",
      duration: "15 mins",
      price: "₹300"
    },
    {
      name: "Aquatic Therapy",
      description: "Water-based exercises for low-impact rehabilitation",
      duration: "45 mins",
      price: "₹1200"
    }
  ]

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-6">
              Our <span className="text-primary">Services</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Comprehensive physiotherapy services designed to address your specific needs and help you achieve optimal health and wellness.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Core Treatment Services
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Evidence-based treatments delivered by certified physiotherapists
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-xl transition-all hover:-translate-y-1 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-center">
                        <service.icon className="w-8 h-8 text-primary mr-3" />
                        <div>
                          <CardTitle className="text-xl font-heading">{service.title}</CardTitle>
                          <div className="flex items-center mt-2 space-x-4">
                            <Badge variant="secondary" className="text-xs">
                              <Clock className="w-3 h-3 mr-1" />
                              {service.duration}
                            </Badge>
                            <Badge variant="outline" className="text-xs text-primary border-primary">
                              {service.price}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{service.description}</p>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-foreground">Key Benefits:</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                        {service.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-sm text-muted-foreground">
                            <CheckCircle className="w-3 h-3 text-primary mr-2 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2 text-foreground">Treats:</h4>
                      <div className="flex flex-wrap gap-1">
                        {service.conditions.map((condition, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {condition}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <Button className="w-full mt-4" asChild>
                      <Link href="/book-appointment">
                        Book Session <ArrowRight className="w-4 h-4 ml-2" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Treatments */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Specialized Treatments
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced therapeutic techniques for enhanced healing and recovery
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {specialTreatments.map((treatment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold font-heading mb-2">{treatment.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{treatment.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <Badge variant="secondary">{treatment.duration}</Badge>
                      <Badge variant="outline" className="text-primary border-primary">
                        {treatment.price}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Our Treatment Process
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A systematic approach to ensure the best possible outcomes
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: "01", title: "Assessment", description: "Comprehensive evaluation of your condition and medical history" },
              { step: "02", title: "Diagnosis", description: "Accurate identification of the problem and contributing factors" },
              { step: "03", title: "Treatment Plan", description: "Customized therapy plan tailored to your specific needs" },
              { step: "04", title: "Recovery", description: "Ongoing support and monitoring until complete recovery" }
            ].map((process, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-lg">
                  {process.step}
                </div>
                <h3 className="text-lg font-bold font-heading mb-2">{process.title}</h3>
                <p className="text-muted-foreground text-sm">{process.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
              Ready to Begin Your Recovery?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Don't let pain or mobility issues hold you back. Book your consultation today and take the first step towards better health.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/book-appointment">Book Consultation</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Ask Questions</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}