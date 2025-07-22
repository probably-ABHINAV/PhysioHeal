"use client"

import { motion } from "framer-motion"
import { Shield, Award, Users, Clock, Heart, Target, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "We put our patients at the heart of everything we do, ensuring personalized treatment plans."
    },
    {
      icon: Shield,
      title: "Evidence-Based Treatment",
      description: "Our treatments are backed by the latest research and proven methodologies."
    },
    {
      icon: Users,
      title: "Collaborative Approach",
      description: "We work closely with patients and their families to achieve the best outcomes."
    },
    {
      icon: Award,
      title: "Excellence in Care",
      description: "Committed to delivering the highest quality physiotherapy services."
    }
  ]

  const team = [
    {
      name: "Dr. Priya Sharma",
      role: "Head Physiotherapist",
      experience: "12+ years",
      specialization: "Orthopedic & Sports Rehabilitation"
    },
    {
      name: "Dr. Rajesh Kumar",
      role: "Senior Physiotherapist",
      experience: "8+ years",
      specialization: "Neurological Rehabilitation"
    },
    {
      name: "Dr. Anita Singh",
      role: "Physiotherapist",
      experience: "6+ years",
      specialization: "Women's Health & Pediatrics"
    }
  ]

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-background via-muted/30 to-primary/5">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-secondary/10" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold font-heading text-foreground mb-6">
              About <span className="text-primary">PhysioHeal</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              India's trusted physiotherapy clinic dedicated to helping you achieve optimal health and wellness through expert care and personalized treatment.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-primary/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Target className="w-8 h-8 text-primary mr-3" />
                    <h3 className="text-2xl font-bold font-heading">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To provide world-class physiotherapy services that empower individuals to overcome physical challenges, 
                    restore mobility, and achieve their health goals through compassionate, evidence-based care.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-secondary/20 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className="flex items-center mb-4">
                    <Eye className="w-8 h-8 text-secondary mr-3" />
                    <h3 className="text-2xl font-bold font-heading">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To be India's leading physiotherapy clinic, recognized for innovation, excellence, and transforming 
                    lives through comprehensive rehabilitation and preventive care services.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
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
              Our Core Values
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at PhysioHeal
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full text-center hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-6">
                    <value.icon className="w-12 h-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold font-heading mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm">{value.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
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
              Meet Our Expert Team
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our certified physiotherapists bring years of experience and specialized expertise
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center hover:shadow-lg transition-all hover:-translate-y-1">
                  <CardContent className="p-8">
                    <div className="w-24 h-24 bg-gradient-to-br from-primary to-secondary rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <h3 className="text-xl font-bold font-heading mb-2">{member.name}</h3>
                    <p className="text-primary font-semibold mb-2">{member.role}</p>
                    <p className="text-muted-foreground text-sm mb-2">{member.experience}</p>
                    <p className="text-muted-foreground text-sm">{member.specialization}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-primary text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: "10+", label: "Years Experience" },
              { number: "50,000+", label: "Patients Treated" },
              { number: "15+", label: "Specialized Services" },
              { number: "95%", label: "Success Rate" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="text-4xl font-bold font-heading mb-2">{stat.number}</div>
                <div className="text-primary-foreground/80">{stat.label}</div>
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
              Ready to Start Your Healing Journey?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Take the first step towards better health. Book your consultation today and experience the PhysioHeal difference.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
                <Link href="/book-appointment">Book Appointment</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}