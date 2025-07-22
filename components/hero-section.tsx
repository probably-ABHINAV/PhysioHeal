"use client"

import { motion } from "framer-motion"
import { ArrowRight, Award, Calendar, Phone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden hero-bg">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-primary/5 to-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Experience Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 mb-6"
            >
              <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
                <Award className="w-4 h-4 mr-2" />
                Professional Care
              </Badge>
              <Badge variant="outline" className="px-3 py-2 text-sm">
                Licensed Physiotherapist
              </Badge>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight mb-6"
            >
              <span className="gradient-text">Healing</span>
              <br />
              <span className="text-foreground">Through Expert</span>
              <br />
              <span className="gradient-text">Physiotherapy</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl"
            >
              Experience personalized physiotherapy care with cutting-edge techniques and compassionate treatment. Your
              journey to recovery starts here.
            </motion.p>

            {/* Rating - Hidden until real reviews are collected */}
            {/* 
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center lg:justify-start space-x-2 mb-8"
            >
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.9/5 from 200+ patients</span>
            </motion.div>
            */}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button size="lg" className="group" asChild>
                <Link href="/book-appointment">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="tel:+911234567890">
                  <Phone className="w-5 h-5 mr-2" />
                  Call Now
                </Link>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right Content - 3D Illustration */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-[500px] lg:h-[600px]">
              {/* 3D-like illustration using CSS transforms and gradients */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-80 h-80 lg:w-96 lg:h-96">
                  {/* Main circle */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-secondary/20 blur-sm"
                  />

                  {/* Inner elements */}
                  <motion.div
                    animate={{ y: [-10, 10, -10] }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 lg:w-80 lg:h-80 rounded-full bg-gradient-to-br from-white to-primary/10 shadow-2xl flex items-center justify-center"
                  >
                    <div className="text-6xl lg:text-8xl">🏥</div>
                  </motion.div>

                  {/* Floating elements with fixed positions */}
                  <motion.div
                    animate={{ rotate: 360, scale: [1, 1.1, 1] }}
                    transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                    className="absolute top-4 right-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-2xl">💪</span>
                  </motion.div>

                  <motion.div
                    animate={{ rotate: -360, scale: [1, 1.2, 1] }}
                    transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-4 left-4 w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-2xl">🦴</span>
                  </motion.div>

                  <motion.div
                    animate={{ y: [-5, 5, -5], x: [-5, 5, -5] }}
                    transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
                    className="absolute top-16 left-8 w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg"
                  >
                    <span className="text-white text-lg">⚡</span>
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
