"use client"

import { motion } from "framer-motion"
import { ArrowRight, Award, Calendar, Phone, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50">
      

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.6 }}
              className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full mr-2 animate-pulse"></span>
              Trusted by 500+ Patients
            </motion.div>

            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              Your Path to{" "}
              <span className="gradient-text">Complete Recovery</span>
            </motion.h1>

            <motion.p 
              className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              Professional physiotherapy services designed to get you back to doing what you love. 
              Expert care, personalized treatment plans, and lasting results you can count on.
            </motion.p>

            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-8 py-6 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 group"
                onClick={() => window.location.href = '/book-appointment'}
              >
                Book Free Consultation
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-slate-300 hover:border-blue-500 hover:bg-blue-50 px-8 py-6 text-lg font-semibold transition-all duration-300 group"
                onClick={() => window.location.href = '/services'}
              >
                View Services
                <span className="ml-2 group-hover:scale-110 transition-transform">👆</span>
              </Button>
            </motion.div>

            {/* Emergency Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="mb-8"
            >
              <div className="inline-flex items-center px-4 py-3 bg-red-50 border border-red-200 rounded-lg">
                <Phone className="h-5 w-5 text-red-600 mr-2" />
                <span className="text-sm text-red-800">
                  <strong>Emergency?</strong> Call us: 
                  <a href="tel:+1234567890" className="font-semibold hover:underline ml-1">
                    +1 (234) 567-8900
                  </a>
                </span>
              </div>
            </motion.div>

            {/* Trust indicators */}
            <motion.div 
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <div className="flex items-center space-x-2">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 border-2 border-white flex items-center justify-center text-white text-xs font-bold">
                      {i === 1 ? '😊' : i === 2 ? '💪' : i === 3 ? '🏃' : '✨'}
                    </div>
                  ))}
                </div>
                <span className="text-sm text-muted-foreground font-medium">500+ Recovered Patients</span>
              </div>

              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
                <span className="text-sm text-muted-foreground ml-2 font-medium">4.9/5 ⭐ Rating</span>
              </div>

              <div className="flex items-center space-x-2 px-3 py-1 bg-green-100 rounded-full">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-800 font-medium">Available Today</span>
              </div>
            </motion.div>
          </motion.div>

          {/* 3D Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            
          </motion.div>
        </div>
      </div>
    </section>
  )
}